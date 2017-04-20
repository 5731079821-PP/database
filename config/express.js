var express=require('express');
//var bodyParser=require('body-parser');
module.exports=function(){
  var app=express();
  app.set('views','./app/views');
  app.set('view engine','jade');
  require('../app/routes/login.routes')(app);//at runtime
  app.use(express.static('./public')); //order imp
  return app;
}
