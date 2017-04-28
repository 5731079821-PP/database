var connection=require('../../sql');

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
    if(err) console.error('QUERY ERROR : absent table');
   console.log('query complete');
   var errormsg='';
   if(rows == ''){
       errormsg+= 'no results';
   }
   res.render('allabsent', {
     student : rows,
     errormsg : errormsg
   });
 });
};
exports.rend=function(req,res){
  connection.query('select sid, fname, lname, instructor.name from student inner join instructor on student.instructorid = instructor.instructorId', function(err, rows, fields){
    if(err) console.error('QUERY ERROR : absent table');
   console.log('query complete');
   var errormsg='';
   if(rows == ''){
       errormsg+= 'no results';
   }
   res.render('allabsent', {
     student : rows,
     errormsg : errormsg
   });
 });
};
