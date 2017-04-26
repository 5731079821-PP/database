var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'127.0.0.1',
  port: '3306',
  user:'root',
  password:'12345',
  database:'regchula'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

module.exports=connection;
