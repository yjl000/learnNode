// sql语句
var sqlMap = {
  // 用户
  user: {
    login: 'SELECT password,userID FROM book1 WHERE userName = ?;',
    add: 'insert into book1(userName, password, userID) values ( ?, ?, ?);',
    search: 'SELECT userName FROM book1 WHERE userName = ?;'
  },
  // 笔记
  note: {
    add: 'INSERT INTO noteList (userID, title, label, content) VALUES (?, ?, ?, ?);',
    search: 'SELECT * FROM noteList WHERE userID = ?;'
  }
}

module.exports = sqlMap
