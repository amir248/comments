const commentsFn = require('./modules/comments');

const express = require('express');
const app = express();
const port = 3000

const jsonParser = express.json();
const cors = require('cors');

const path = require('path');
const fs = require('fs');
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views','public');
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('indexPage', { title: 'My Express App', text: 'Hello from comments from NODE.JS!' });
});


const registerUrl=['http://192.168.1.101','https://comments.qucu.ru/','http://192.168.1.104:3700/','https://amir248.github.io','http://localhost'];
app.use(cors({
  origin:'*',
  method:'post',
  optionsSuccessStatus: 200
}));


app.post('/allow-cors',jsonParser,cors(),(request,response)=>{
    console.log(__dirname);
    console.log(request.body);
    // console.log(request);
    // console.log(response);
  if (!request.body) return response.sendStatus(400);
  let scriptComments=fs.readFileSync('public/script/script.js',"utf8",
  (error,data)=>{
    console.log("Async read file script.js");
    if(error) throw error;
    console.log(data);
  });
  response.send(scriptComments);
  // console.log(scriptComments);
});// SCRIPT JS


//******************************************************************************************************************
// ----------------------------BOX comments system------------
// *******************************************************************************************************************


const importantBag={}
if(importantBag=={}){
  console.log('bag there exists');
}else{

  console.log(importantBag.id);
  console.log('bag empty');
}
const id=['a000','a001','a002','a003','a004','a005','a777','git','nasoberu','test','resume','sweb','blozh'];

let x = `${importantBag.id}`;
const comments = commentsFn(app, jsonParser, cors, fs, id, importantBag);

comments(0);
comments(1);
comments(2);
comments(3);
comments(4);
comments(5);
comments(6);
comments(7);
comments(8);
comments(9);
comments(10);
comments(11);
comments(12);
comments(13);
comments(14);
comments(15);
comments(16);
comments(17);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
