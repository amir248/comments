const express = require('express');
const app = express();
const fs =require('fs');
const path=require('path');
// const cors = require("cors");
// const {createProxyMiddleware}=require('http-proxy-middleware');
// app.use(cors());
//
// const API_SERVICE_URL='https:nasobe.ru';
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;
//
// app.use(cors({
//   exponsedHeaders: '*'
// }));
// app.use("/", createProxyMiddleware({
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   ws: true,
//   logLevel: "debug"
// }));

app.use(express.static('public'));
app.use(express.static('json'));
app.use(express.static('images'));
app.use(express.static('comments'));
app.use('/images', express.static(__dirname+'public'));
app.use('/json', express.static(__dirname + 'public'));
console.log(__dirname);
app.set('views','./public');
// var cors = require('cors')
// app.use(cors())
// app.get('/comments/json', function (req, res, next) {
//   res.json({msg: Access-Control-Allow-Origin https://nasobe.ru})
// })
// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })


// создаем парсер для данных в формате json
const jsonParser = express.json();
const port=3000;
const host = '127.0.0.1';

app.post('/comments/', jsonParser, function (request, response) {
  // console.log(request.body);
  if (!request.body) return response.sendStatus(400);
  // console.log(request.body);
  let oki=JSON.stringify(request.body);
  fs.stat('public/json/message.json',(err,stats)=>{
    if(err){
      console.log('fine non');
      fs.writeFileSync('public/json/message.json',`${oki}`);
    }else if(stats){
      console.log('file EST');
      fs.appendFileSync('public/json/message.json',`${oki}`);
    }else{
      console.log('ELSE')
    }
  });
  response.json(request.body); // отправляем пришедший ответ обратно
});
app.set("view engine", "ejs");
// app.get('/comments', function (request, response) {
//   response.sendFile(__dirname + '/comments.html')
// });
app.use("/comments",(request,response)=>{
  response.render("comments",{
    title:"Comments",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  });
});
app.listen(port, host,()=> {
    console.log(
      'Сервер начал прослушивание запросов на порту '+ `${port}`
    )
  });
