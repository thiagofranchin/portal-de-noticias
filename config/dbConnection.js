var mysql = require('mysql');

var connMySQL = function(){
  console.log('Conexao com DB estabelicida');
  return mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '1234',
      database : 'portal_noticias'
  });
}
// A conexao já foi criada, agora ela é apenas chamada
module.exports = function () {
  console.log('O autoload carregou o modulo de conexao com db');
  return connMySQL;
}

