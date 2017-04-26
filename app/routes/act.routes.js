module.exports=function(app){
  var act=require('../controllers/act.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',act.home);
  app.get('/registrar',act.regis);
  app.get('/absent',act.absent);
  app.get('/personal',act.personal);
  app.get('/behave',act.behave);
  app.post('/activity',act.search);


};
