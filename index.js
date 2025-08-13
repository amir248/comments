const commentsFn = require('./modules/newComments');
// const commentsFn = require('./modules/oldComments');

const express = require('express');
const app = express();
const port = 3007

const jsonParser = express.json();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const path = require('path');
const fs = require('fs');
const { setFips } = require('crypto');
// app.use('/static', express.static(path.join(__dirname, 'public')))

// ,'https://amir248.github.io','https://github.qucu.ru'
const registerUrl=['https://qucu.ru'];
// const whitelist = ['https://qucu.ru'];
app.use(cors({
  // origin: false , // чтобы не ставить Access-Control-Allow-Origin
  origin:['https://qucu.ru','https://madness.qucu.ru/','https://comments.qucu.ru'],
  // origin: function (origin, callback) {
  //   if (!origin || whitelist.includes(origin)) {
  //     callback(null, origin);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  methods:['POST', 'GET', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization']
}));


// Helmet: безопасные заголовки
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
}));
// app.use(helmet());


app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'", "https://qucu.ru"],
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://github.qucu.ru",
        "https://qucu.ru",
        "https://qucu.ru/landing-page"
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://comments.qucu.ru",
        "https://github.qucu.ru",
        "https://qucu.ru"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://qucu.ru",
        "https://comments.qucu.ru",
        "https://github.qucu.ru"
      ],
      "connect-src": [
        "'self'",
        "https://comments.qucu.ru",
        "https://qucu.ru",
        "https://github.qucu.ru"
      ],
      "frame-ancestors": ["'self'", "https://qucu.ru","https://qucu.ru/landing-page", "https://comments.qucu.ru"],
      "object-src": ["'none'"]
    }
  })
);


app.set('views','public');
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('indexPage', { title: 'My Express App', text: 'Hello from comments from NODE.JS!' });
});
app.get('/onclicker',(request,response)=>{
  response.render('onclicker',{oK: 'onClick'});
});

// app.set('trust proxy', true);
app.set('trust proxy', 1);
// Ограничение частоты запросов
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Слишком много запросов. Попробуйте позже.'
});

app.use('/getIp', limiter);
app.use('/allow-cors', limiter);

// cors(),
app.post("/getIp",jsonParser,(request,response)=>{
  // response.setHeader('Content-Type', 'application/javascript');
  // response.sendFile(path.join(__dirname, 'public', 'json', 'ip.js'));
  console.log("getIP getIp <----------------------------------------------")
  console.log(request.body);
  let writesFile=request.body;
  fs.appendFileSync("public/json/ip.js", `${JSON.stringify(writesFile)}`+"\n");
});

// cors(),
app.post('/allow-cors',jsonParser,(request,response)=>{
    console.log(__dirname + " 121 file index");
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

app.post('/allow-corsar',jsonParser,(request,response)=>{
    console.log(__dirname +" corsar");
    console.log(request.body);
    // console.log(request);
    // console.log(response);
  if (!request.body) return response.sendStatus(400);
  let scriptCommentss=fs.readFileSync('public/script/scriptGPT.js',"utf8",
  (error,data)=>{
    console.log("Async read file script.js");
    if(error) throw error;
    console.log(data);
  });
  response.send(scriptCommentss);
  // console.log(scriptComments);
});// SCRIPT JS
//******************************************************************************************************************
// ----------------------------BOX comments system------------
// *******************************************************************************************************************
app.post('/xxx',jsonParser,(request,response)=>{
  console.log(__dirname + " dirname");
  console.log(request.body);
  console.log("hello world! ");
  let ress=console.log('oK!!!');
  const a111 = '/public/allDiscus/a111';
  fs.mkdir(a111,{recursive:true},(err)=>{
    if(err){
      console.error('eroor between create  folder, err');
    }else{
      console.log('create fodder was excessufull');
    }
  })
  try {
    fs.writeFileSync('/public/allDiscus/111/my_file.json', 'Содержимое файла');
    console.log('Файл создан');
    console.log('oK');
  } catch (err) {
    console.error(err);
  }
  response.send(ress);
});

const importantBag={}
if(importantBag=={}){
  console.log('bag there exists');
}else{

  console.log(importantBag.id);
  console.log('bag empty');
}
const id=['a000','a001','a002','a003','a004','a005','a777','git','nasoberu','test','resume','sweb','blozh','mad','blozhik'];

let x = `${importantBag.id}`;
const comments = commentsFn(app, jsonParser, cors, fs, id, importantBag,path);

for(let i=0; i<id.length;i++){
  comments(i);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
