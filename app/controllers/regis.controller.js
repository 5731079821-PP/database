exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var order=req.body.order;
  var year=req.body.year;
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('Order choice: '+order);
  console.log('Order choice: '+year);

};
exports.home=function(req,res){
  res.render('layout');
};
exports.personal=function(req,res){
  res.render('personal');
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
exports.record=function(req,res){
  res.render('record');
};
