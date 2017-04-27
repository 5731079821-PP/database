module.exports=function(app){
  var personal=require('../controllers/personal.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',personal.home);
  app.get('/registrar',personal.regis);
  app.get('/absent',personal.absent);
  app.get('/activity',personal.act);
  app.get('/behave',personal.behave);
  app.get('/allpersonal', personal.rend);
  app.post('/allpersonal',personal.search);
  app.get('/profile',personal.profile);


};
