var express = require("express");
var jsonServer = require("json-server");
var fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(writeFile);

var server = express();
server.use("/api", jsonServer.defaults(), jsonServer.router("./db.json"));

server.get("/:id", (req, response) => {
  fetch("http://localhost:3000/api/images/" + req.params.id)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.id) {
        return res.target_url;
      } else {
        return fetch("https://picsum.photos/" + req.params.id).then((x) => {
          return fetch("http://localhost:3000/api/images/", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: req.params.id, target_url: x.url }),
          }).then((res) => {
            console.log("created new image");
            return x.url;
          });
        });
      }
    })
    .then((url) => {
      return fetch(url)
        .then((x) => {
          return x.arrayBuffer();
        })
        .then((x) => {
          var filename = __dirname + "\\" + req.params.id + ".jpg";
          return writeFilePromise(
            "./" + req.params.id + ".jpg",
            Buffer.from(x)
          ).then((res) => filename);
        })
        .then((file) => {
          response.sendFile(file);
          return file;
        })
    });
});

server.listen(3000);
