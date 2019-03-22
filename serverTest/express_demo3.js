var express = require('express');
var app = express();

app.use(express.static('../public'));

app.get('/', function (req, res) {
  res.send('Hello Vue');
})

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

// var express = require('express');
// var app = express();
//
// app.use(express.static('static'));
//
// app.get('/', function (req, res) {
//   res.send('Hello node');
// })
//
// var serverTest = app.listen(8081, function () {
//
//   var host = serverTest.address().address
//   var port = serverTest.address().port
//
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
// })