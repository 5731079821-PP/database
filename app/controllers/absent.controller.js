exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var type=req.body.type;
  var order=req.body.order;
  console.log('Search key: '+by);
  console.log('Type choice: '+type);
  console.log('Search choice: '+select);
  console.log('Order choice: '+order);

  connection.query('select sid, fname, lname, instructor.name from student inner join instructor on student.instructorid = instructor.instructorId', function(err, rows, fields){
    res.render('allabsent', {
      list : rows
    });
  });
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
exports.personal=function(req,res){
  res.render('personal');
};
exports.act=function(req,res){
  res.render('act');
};
exports.behave=function(req,res){
  res.render('behave');
};
exports.miss=function(req,res){
  res.render('miss');
};
