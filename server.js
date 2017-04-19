var express=require('./config/express');
var app=express();
app.listen(3000);
module.exports=app;
console.log('localhost:3000 is running ....');
