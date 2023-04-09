const express = require('express');
const app = express();
const fs =require('fs');
const path=require('path');

app.use(express.static('public'));
console.log(__dirname);
app.set('views','public');
// app.set('views','views');

// создаем парсер для данных в формате json
const jsonParser = express.json();
const port=3000;
const host = '127.0.0.1';

const putChik='public/json/message.json';

app.get("/", function(request, response){
      // response.send('oK!!!');
    response.sendFile(__dirname + "/page.html");
});
// HOST '/comments/commentson
app.post('/comments', jsonParser, function (request, response) {
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
      }//returnForever
      setTimeout(()=>{
        let newOk=fs.writeFileSync(putChik, returnForever()+","+`${oki}`+']','utf8');
      },0);
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
app.use("/comments/index",(request,response)=>{
  response.render('index',{
    title:"title",
    text: "text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    description: "description"
  })
});
app.use("/comments",(request,response)=>{
  response.render("comments",{
    title:"Comments",
    text: "Самописная система комментариев. Эта система комментариев без записи в базу данных. Сообщения записываются массивом в документ json форматa. После чего отправляются с сервера обратно в документ. С использованием одного только javascript. Как говорится в пословице: \"все гениальное просто\". Рабочую систему комментариев можно скачать по ссылки с моего гитхаба https://github.com/amir248/comments Вот вам пожалуйста рабочая система комментариев в открытом доступе, это не то что условно бесплатная система комментариев как \"дискус\". Сначало она бесплатная, а потом загромаждает все поля видимости жесточайшими ракламными блоками.",
    warnings: "На сервере файлы кэшируются, поэтому иногда чтобы увидеть отправленное сообщение надо обновить страницу.",
    description: "Самописная система комментариев, для сайта."
  });
});

app.listen(port, host,()=> {
    console.log(
      'Сервер начал прослушивание запросов на порту '+ `${port}`
    )
  });
