// sql语句
var sqlMap = {
  // 用户
  user: {
    login: 'SELECT password FROM book1 WHERE userName = ?;',
    add: 'insert into book1(userName, password) values ( ?, ?);',
    search: 'SELECT userName FROM book1 WHERE userName = ?;'
  }
}

module.exports = sqlMap;
