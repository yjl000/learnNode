var models = require('./db');//数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('./sqlfun');//sql语句



var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 登录用户接口
router.post('/userLogin', function (req, res) {
// 连接数据库
  var conn = mysql.createConnection(models.mysql);
  conn.connect();

  var sql = $sql.user.login;
  var params = req.body;
  let userError = {
    status: '404', // 404 用户名不存在；200 登录成功； -1 密码错误
    message: '用户名不存在！'
  };
  conn.query(sql, [params.userName], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      //jsonWrite(res, result);
      for(var i = 0; i < result.length; i++){
        if (result[i].password == params.password) {
          userError.status = '200';
          userError.message = 'success';
          userError.data = {
            name: params.userName,
            userID: result[i].userID
          }
          return res.send(JSON.stringify(userError));
        } else {
          userError.status = '-1';
          userError.message = '用户名或密码错误！';
          return res.send(JSON.stringify(userError));
        }
      }
      return res.end(JSON.stringify(userError));
    }
  })
  conn.end()
})

// 增加用户接口
router.post('/addUser', (req, res) => {
  // 连接数据库
  var conn = mysql.createConnection(models.mysql);
  conn.connect();
  var sql = $sql.user.add;
  var search = $sql.user.search;
  var params = req.body;
  params.userID = Math.floor(Math.random () * 900) + 100;
  let addError = {
    status: '200', // 200 注册成功； -200 用户已存在
    message: '注册成功'
  };
  conn.query(search, [params.userName], (err, isSave)  => {
    if (err) {
      console.log(err);
    }
    if (isSave.length > 0) {
      addError.status = '-200';
      addError.message = '用户名已存在！';
      return res.send(JSON.stringify(addError));
    } else {
      conn.query(sql, [params.userName,params.password, params.userID], function(err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          // jsonWrite(res, result);
          console.log(result)
          res.end(JSON.stringify(addError));
        }
      })
    }
  })
  conn.end()
});
module.exports = router;
