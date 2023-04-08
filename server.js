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
// app.use(express.static('json'));
// app.use(express.static('images'));
// app.use(express.static('comments'));
// app.use('/images', express.static(__dirname+'public'));
// app.use('/json', express.static(__dirname + 'public'));
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

const putChik='public/json/message.json';

// HOST '/comments/commentson
app.post('/comments', jsonParser, function (request, response) {
  // console.log(request.body);
  // fs.writeFileSync(putChik,'ooK');

  if (!request.body) return response.sendStatus(400);
  // console.log(request.body);
  let oki=JSON.stringify(request.body)+'';
  console.log(__dirname);
  fs.stat(putChik,(err,stats)=>{
    if(err){
      console.log('fine non');
      fs.writeFileSync(putChik,'['+`${oki}`+']');
    }else if(stats){
      console.log('file EST');
      function returnForever(){
        // setTimeout(()=>{
          let newFile=fs.readFileSync(putChik,"utf8",
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                console.log(data);  // выводим считанные данные
              });
              // console.log(newFile);
              let un=+0;
              let prov=JSON.stringify(newFile);
              if(prov.endsWith(']"')){
                console.log(prov+'====================================');
                un=-1;
              }else if(prov.endsWith('\n')){
                console.log("------/n--------");
                un=-2;
              }else{
                console.log(prov+'*********************************');
                un=-2;
              }
          let str=newFile.slice(0,un);
          return str;
        // },10);
      }
      setTimeout(()=>{
        // console.log(str);
        let newOk=fs.writeFileSync(putChik, returnForever()+","+`${oki}`+']','utf8');
        // console.log(newOk);
      },300);
      // fs.appendFileSync('public/json/message.json', ','+`${oki}`+']'+" ");
      // const str1 = "DelftStacks";
      // const str2 = str1.slice(0, -2);
      // console.log(str2);
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
    text: "Самописная система комментариев. Эта система комментариев без записи в базу данных. Сообщения записываются массивом в документ json форматa. После чего отправляются с сервера обратно в документ. С использованием одного только javascript. Как говорится в пословице: \"все гениальное просто\". Рабочую систему комментариев можно скачать по ссылки с моего гитхаба https://github.com/amir248/comments Вот вам пожалуйста рабочая система комментариев в открытом доступе, это не то что условно бесплатная система комментариев как \"дискус\". Сначало она бесплатная, а потом загромаждает все поля видимости жесточайшими ракламными блоками.",
    description: "Самописная система комментариев, для сайта."
  });
});
app.listen(port, host,()=> {
    console.log(
      'Сервер начал прослушивание запросов на порту '+ `${port}`
    )
  });
