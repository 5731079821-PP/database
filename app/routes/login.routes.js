module.exports=function(app){
  var login=require('../controllers/login.controller');//use which controller
  app.get('/',login.render);//choose which function from those controller

}
