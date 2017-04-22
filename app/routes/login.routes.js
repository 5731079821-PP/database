module.exports=function(app){
  var login=require('../controllers/login.controller');//use which controller
  app.get('/login',login.render);//choose which function from those controller
  app.get('/createAccount',login.create);
  app.post('/signin',login.signin);
  app.get('/',login.render);

};
