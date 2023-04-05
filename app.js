const http = require('http');
const url=require('url');
const { parse }=require('querystring');
const port=3000;
http.createServer((request, response)=>{
  if(request.method=='GET'){
    console.log(request);
    response.end('Hello NodeJS!'+'_'+request.url+'^_^');
    let urlRequest = url.parse(request.url,true);
    console.log(urlRequest.query);
    console.log(request.method);
  }else if(request.method=='POST'){
    console.log("POST ^_^");
    console.log(request.method);
    response.end("Hello method post!");
    let body='';
    request.on('data',chunk=>{
      body+=chunk.toString();
      console.log(body.key);
      let params = parse(body);
      console.log(params);
      console.log(params.message);
    });
  }else{
    request.on('end',()=>{
      console.log(body);
      let params = parse(body);
      console.log(params);
      console.log(params.message);
      response.end('ok');
    });
    console.log('ELSE '+request.method);
    request.on('end',()=>{
      console.log(body);
      let params = parse(body);
      console.log(params);
      console.log(params.message);
      response.end('ok');
    });
  }
}).listen(port, '127.0.0.1',()=> {
    console.log(
      'Сервер начал прослушивание запросов на порту '+ `${port}`
    )
  })
