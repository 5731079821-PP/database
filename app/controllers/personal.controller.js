exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
};
exports.profile=function(req,res){
  res.render('profile');
};
exports.home=function(req,res){
  res.render('layout');
};
exports.regis=function(req,res){
  res.render('regis');
};
exports.record=function(req,res){
  res.render('record');
};
exports.absent=function(req,res){
  res.render('absent');
};
exports.act=function(req,res){
  res.render('act');
};
exports.behave=function(req,res){
  res.render('behave');
};
