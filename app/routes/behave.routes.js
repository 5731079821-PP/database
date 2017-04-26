module.exports=function(app){
  var behave=require('../controllers/behave.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',behave.home);
  app.get('/registrar',behave.regis);
  app.get('/absent',behave.absent);
  app.get('/activity',behave.act);
  app.get('/personal',behave.personal);


};
