module.exports=function(app){
  var layout=require('../controllers/layout.controller');//use which controller
  app.post('/home',layout.login);//choose which function from those controller
  app.get('/logout',layout.logout);

  //Nav
  app.get('/personal',layout.personal);
  app.get('/registrar',layout.regis);
  app.get('/record',layout.record);
  app.get('/absent',layout.absent);
  app.get('/activity',layout.act);
  app.get('/behave',layout.behave);
  app.get('/overview',layout.home);
};
