// const express = require("express");
// const app = express();
// const fs = require('fs');
// console.log('oK');
//
//
// app.use(express.urlencoded({extended: false}));
// app.get("/", (request, response)=> {
//     response.sendFile(__dirname + "/comments.html");
// });
// app.post("/", (request, response)=> {
//   if(!request.body) return response.sendStatus(400);
//   console.log(request.body);
//   response.send(`${request.body.userName}`);
//   console.log(`${request.body.userName}`);
//    // - ${response.body.userAge}
//   // console.log(`${request.body.userName} - ${request.body.userAge}`);
// });
//
// app.listen(3000, ()=>console.log("Сервер запущен..."));

// const http=require('http');
// http.createServer((request,response)=>{
//   console.log('request');
//   response.end('go');
// }),listen(3003);
const http = require('http');
const url=require('url');
const port=3001;
http.createServer((request, response)=>{
  console.log(request);
    response.end('Hello NodeJS!');
    let urlRequest = url.parse(request.url,true);
    console.log(urlRequest.query);
  }).listen(port, '127.0.0.1',()=> {
    console.log(
      'Сервер начал прослушивание запросов на порту '+ `${port}`
    )
  })
