module.exports=function(app){
  var record=require('../controllers/record.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',record.home);
  app.get('/registrar',record.regis);
  app.get('/personal',record.personal);
  app.get('/absent',record.absent);
  app.get('/activity',record.act);
  app.get('/behave',record.behave);


};
