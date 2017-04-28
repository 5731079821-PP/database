exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var type=req.body.type;
  var order=req.body.order;
  var date=req.body.order;//2017-04-13 this format
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('type choice: '+type);
  console.log('Order choice: '+order);
  console.log('Date choice: '+date);
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
exports.personal=function(req,res){
  res.render('personal');
};
exports.behave=function(req,res){
  res.render('behave');
};
