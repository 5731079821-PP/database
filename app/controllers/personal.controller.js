exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var year=req.body.year;
  var order=req.body.order;
  var course=req.body.course;
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('Year choice: '+year);
  console.log('Order choice: '+order);
  console.log('Course choice: '+course);
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
exports.absent=function(req,res){
  res.render('absent');
};
exports.act=function(req,res){
  res.render('act');
};
exports.behave=function(req,res){
  res.render('behave');
};
