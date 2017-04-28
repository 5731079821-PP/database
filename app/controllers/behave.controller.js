exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var order=req.body.order;
  var type=req.body.type;
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('Order choice: '+order);
  console.log('Type choice: '+type);
};
exports.home=function(req,res){
  res.render('layout',{
    User: 'ID: '+req.session.inID+'  ',
    subtitle: 'Overview'
  });
};
exports.regis=function(req,res){
  res.render('regis');
};
exports.absent=function(req,res){
  res.render('absent');
};
exports.act=function(req,res){
  res.render('act');
};
exports.personal=function(req,res){
  res.render('personal');
};
exports.bscore=function(req,res){
  res.render('bscore');
};
