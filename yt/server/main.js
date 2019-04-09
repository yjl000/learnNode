// node 后端服务器入口
const userApi = require('./api');
// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// app.set('view engine','jade')
// app.use(express.static('../dist'));
//
// app.get('/index.html', function (req, res) {
//   res.sendFile( __dirname + "/" + "index.html" );
// })

//注册api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(9000)
// var server = app.listen(9000);
// server.setTimeout(0)
console.log('success listen at port:9000......');
