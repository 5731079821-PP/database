var express=require('express');
var app=express();
var hell=function(req,res) {
  res.send('fuck');
}
app.use('/',hell);//when request root call hell as callback func
app.listen(3000);
console.log('localhost:3000 is running ....');
module.exports=app;
