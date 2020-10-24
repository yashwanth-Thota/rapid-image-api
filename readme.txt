============================ IMPLEMENTATION DETAILS ===============================================

## Description ##

1. server.js contains all the routes and api implementation logic for rapid-image-api.
2. db.json stores all the details of the images 
3. dependencies express, json-server and node-fetch

## Examples ##

4. images.png shows how all images json is viewed
5. sample-image500.png shows a particular image is viewed   

================================= RUNNING IN LOCAL ========================

1. uncomment line - 5 and comment line -4 in server.js
2. run npm install 
3. after installing packages, now run npm start 
4. now the server is started on port 3000

### ACCESSING ### 

5. Visit URL https://localhost:3000/ then you will be redirected to https://localhost:3000/images
6. On https://localhost:3000/images you will get JSON response of all the images stored.
7. On https://localhost:3000/:id shows a particular image

========================================== INSTRUCTIONS ACCESSING ON HEROKU =================================

1. Deployed URL - https://rapid-image-api.herokuapp.com/
2. Visit URL https://rapid-image-api.herokuapp.com/ then you will be redirected to https://rapid-image-api.herokuapp.com/images
3. On https://rapid-image-api.herokuapp.com/images you will get JSON response of all the images stored.

