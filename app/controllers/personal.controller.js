var connection = require('../../sql');

exports.search=function(req,res){
  var by=req.body.by;         //search
  var select=req.body.select; //filter dropdown
  var order=req.body.order;   //ascending - Decending
  var course=req.body.course;// if fileter choice -- select course */
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('Order choice: '+order);
  console.log('Course choice: '+course);
  var query = '';
  if(select == 'undefined'){
  }else if(select=='all'){
    if(by != '')
    query += 'WHERE  s.fname = "' + by + '" or s.sid = "' + by +'"' ;
  }  else{
    if(select != 'course'){
      if(select == 'assist'){
        query += ' inner join instructor on student.instructorid = instructor.instructorId '+
        'where instructor.instructorId = ' + /*session instructorId*/ '101010';
      }
      if(by != ''){
        if(select == 'assist') query += ' and (sid = ' + by + 'or name = ' + by + ')';
        else query += 'WHERE ' + select + ' = ' + by;
      }
    }
    else {
      query += ' inner join enroll e on s.sid = e.sId inner join course c on c.courseId = e.courseId where s.instructorid = 101010 and e.courseId = ' + course ; // query -- student enroll subject that the teacher teach
    }
  }
  if(order == 'a'){
    query += ' ORDER BY sid ASC';
  }else if(order == 'd'){
    query += ' ORDER BY sid DESC';
  }
  console.log(query);
  connection.query('SELECT s.sid, s.fname, s.lname, s.GPAX FROM student s ' + query, function(err, rows, fields){
    if(err){
      console.log('QUERY ERROR : personal table with search apply');
    }else{
      var errormsg='';
      if(rows == ''){
          errormsg+= 'no results';
      }
      res.render('allpersonal',{
      student : rows,
      errormsg: errormsg
      });
    }
  });
};
exports.profile=function(req,res){
  var id = req.param('id');
  console.log(id);
  connection.query('select * from student s inner join department d on s.departmentId = d.departmentId inner join faculty f on d.facultyId = f.facultyId WHERE sid = ?', id, function(err, rows, fields){
    if(err){
      console.log('individual info query error');
    }else {
      var gender;
      if(rows[0].gender == 'M') gender = 'ชาย';
      else gender = 'หญิง'
      res.render('profile', {
        indiv : rows[0],
        gender : gender
      });
    }
  });
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

exports.rend=function(req,res){

  connection.query('SELECT sid, fname, lname, GPAX from student', function(err, rows, fields){
    if(err){
      console.log('query error');
    }

    res.render('allpersonal', {
      student : rows
    });
  });

};
