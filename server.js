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


const express = require('express');
const app = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

app.post('/', jsonParser, function (request, response) {
  // console.log(request.body);
  if (!request.body) return response.sendStatus(400)
  response.json(request.body); // отправляем пришедший ответ обратно
})
// app.get('/', function (request, response) {
//   response.sendFile(__dirname + '/comments.html')
// })
app.listen(3000);

// const http = require('http');
// const url=require('url');
// const { parse }=require('querystring');
// const port=3000;
// http.createServer((request, response)=>{
//   if(request.method=='GET'){
//     console.log(request);
//     response.end('Hello NodeJS!'+'_'+request.url+'^_^');
//     let urlRequest = url.parse(request.url,true);
//     console.log(urlRequest.query);
//     console.log(request.method);
//   }else if(request.method=='POST'){
//     console.log("POST ^_^");
//     console.log(request.method);
//     response.end("Hello method post!");
//     let body='';
//     request.on('data',chunk=>{
//       body+=chunk.toString();
//       console.log(body.key);
//       let params = parse(body);
//       console.log(params);
//       console.log(params.message);
//     });
//   }else{
//     request.on('end',()=>{
//       console.log(body);
//       let params = parse(body);
//       console.log(params);
//       console.log(params.message);
//       response.end('ok');
//     });
//     console.log('ELSE '+request.method);
//     request.on('end',()=>{
//       console.log(body);
//       let params = parse(body);
//       console.log(params);
//       console.log(params.message);
//       response.end('ok');
//     });
//   }
// }).listen(port, '127.0.0.1',()=> {
//     console.log(
//       'Сервер начал прослушивание запросов на порту '+ `${port}`
//     )
//   })
