module.exports=function(app){
  var regis=require('../controllers/regis.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',regis.home);
  app.get('/personal',regis.personal);
  // app.get('/absent',regis.absent);
  // app.get('/activity',regis.act);
  // app.get('/behave',regis.behave);
  app.get('/record',regis.record);
  app.post('/registrar',regis.search);

};
