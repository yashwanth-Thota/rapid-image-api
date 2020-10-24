var express = require("express");
var jsonServer = require("json-server");
var fetch = require("node-fetch");
const { writeFile } = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(writeFile);
// const API="https://rapid-image-api.herokuapp.com"
const API="http://localhost:3000"
var server = express();
server.use("/api", jsonServer.defaults(), jsonServer.router("./db.json"));
server.use(express.static('public'))
server.get("/",(req,response)=>{
  fetch(API+"/api/images")
  .then(res=>res.json()).then(res=>response.send(res))
})
server.get("/:id", (req, response) => {
  fetch(API+"/api/images/" + req.params.id)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.id) {
        return res.target_url;
      } else {
        return fetch("https://picsum.photos/" + req.params.id).then((x) => {
          return fetch(API+"/api/images/", {
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
          var filename = __dirname + "\\public\\" + req.params.id + ".jpg";
          return writeFilePromise(
            filename,
            Buffer.from(x)
          ).then((res) => filename);
        })
        .then((file) => {
          response.sendFile(file);
          return file;
        })
    });
});
server.listen(process.env.PORT || 3000);
