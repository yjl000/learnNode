var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建application/x-ww-form-urlencoded编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('static'));

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/' + "index.html");
})

app.post('/process_post', urlencodedParser, function (req, res) {

  // 输出JSON格式
  // var response = {
  //   "first_name": req.body.first_name,
  //   "last_name": req.body.last_name
  // };
  var response = {
    "first_name": 'yjl',
    "last_name": 'txy'
  };

  console.log(response);

  res.end(JSON.stringify(response));
})

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
