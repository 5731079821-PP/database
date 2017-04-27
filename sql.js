var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'databaseproject'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

module.exports=connection;
