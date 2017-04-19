var express=require('express');
module.exports=function(){
  var app=express();
  require('../app/routes/login.routes')(app);
  return app;
}
