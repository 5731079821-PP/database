module.exports=function(app){
  var absent=require('../controllers/absent.controller');//use which controller
//app.post('/home',personal.login);//choose which function from those controller
//  app.get('/logout',personal.logout);

  //Nav
  app.get('/overview',absent.home);
  app.get('/registrar',absent.regis);
  app.get('/personal',absent.personal);
  app.get('/activity',absent.act);
  app.get('/behave',absent.behave);
  app.get('/miss',absent.miss);
  app.post('/absent',absent.search);


};
