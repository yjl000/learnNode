var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '129725',
  port: '3306',
  database: 'text'
});

connection.connect();

var addSql = 'INSERT INTO websites(Id, name, url, alexa, country) VALUES(0, ?, ?, ?, ?)';
var addSqlParams = ['两个人', 'http://www.yjltxy.top', '129725', 'CN'];
// 增
connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }

  console.log('--------------INSERT--------------');
  console.log('INSERT ID:', result);
  console.log('-----------------------------\n\n');
})

connection.end()
