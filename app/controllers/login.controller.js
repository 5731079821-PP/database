var connection=require('../../sql');
exports.render=function(req,res){
  res.render('login',{

  });
};
exports.create=function(req,res){
  res.render('signin');
};
exports.signin=function(req,res){
  connection.query('SELECT pwd FROM login WHERE usr = ?',req.body.usr,function(err,result){
  if(result.length){
    console.log('dupe');
    return;
  }else{
      var data  = {usr: req.body.usr, pwd: req.body.pass};
      connection.query('INSERT INTO login SET ?', data, function(err, result) {

      });
        res.render('layout');
  }
  });

};
