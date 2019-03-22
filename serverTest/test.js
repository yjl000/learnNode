var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '129725',
  port: '3306',
  database: 'text'
});

connection.connect();

var sql = 'SELECT * FROM websites';

connection.query(sql, function (err, result) {
  if (err){
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log('--------------SELECT--------------');
  console.log(result);
  console.log('-----------------------------\n\n');
});

connection.end();