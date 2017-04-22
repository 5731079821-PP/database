var connection=require('../../sql');
exports.login=function(req,res){
  //console.log(req.body);
  //console.log('Email: '+req.body.email);
  //console.log('Pass: '+req.body.pass);
  var data={
    usr: req.body.usr,
    pwd: req.body.pass
  };


  res.render('layout');

};

exports.logout=function(req,res){
  res.render('login',{
    title: 'Logout',
    isLoggedIn: false
  });
};
exports.home=function(req,res){
  res.render('layout');
};

exports.personal=function(req,res){
  res.render('personal');
};
exports.regis=function(req,res){
  res.render('regis');
};
exports.record=function(req,res){
  res.render('record');
};
exports.personal=function(req,res){
  res.render('personal');
};
exports.act=function(req,res){
  res.render('act');
};
exports.behave=function(req,res){
  res.render('behave');
};
exports.absent=function(req,res){
  res.render('absent');
};
