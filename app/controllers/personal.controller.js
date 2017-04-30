// var mysql = require('mysql');
var async = require('async');
var pool = require('../../sql');
var dialog = require('dialog');

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
        query += ' inner join instructor i on s.instructorid = i.instructorId '+
        'where i.instructorId = ' + /*session instructorId*/ '101010';
      }
      if(by != ''){
        if(select == 'assist') query += ' and (sid = ' + by + 'or name = ' + by + ')';
        else query += 'WHERE ' + select + ' = ' + by;
      }
    }
    else { // select : course
      console.log('course : '+ course);
      if(course == undefined)  {
        dialog.err('PLEASE SELECT COURSE', 'warning', function (err) {
          return;
        })
        console.log(' in if == undefined');
        return;
      }
      else {
        console.log('   in else ');
        query += ' inner join enroll e on s.sid = e.sId inner join course c on c.courseId = e.courseId where s.instructorid = 101010 and e.courseId = ' + course ; // query -- student enroll subject that the teacher teach
      }
    }
  }
  if(order == 'a'){
    query += ' ORDER BY sid ASC';
  }else if(order == 'd'){
    query += ' ORDER BY sid DESC';
  }
  query = 'SELECT s.sid, s.fname, s.lname, s.GPAX FROM student s ' + query;
  console.log(query);
  var query1="select * from instructor i inner join teach t on i.instructorId=t.instructorId inner join course c on c.courseId=t.courseId where i.instructorId=101010";
  var row = [];

  var return_data = {};
  var errormsg = '';
  async.parallel([
    function(parallel_done){
      pool.query(query1, {}, function(err, rows){
        if (err) return parallel_done(err);
        return_data.table1 = rows;
        parallel_done();
      });
    },
    function(parallel_done){
      pool.query(query, {}, function(err, rows){
        if(err) return parallel_done(err);
        if(rows == '') errormsg = 'no results';
        return_data.table2 = rows;
        parallel_done();
      });
    }
  ], function(err){
    if(err) console.error(err);

    row = JSON.stringify(return_data);
    rows = JSON.parse(row);

    res.render('allpersonal',{
      student: rows.table2,
      subj: rows.table1,
      errormsg: errormsg
    })
  });
};

exports.profile=function(req,res){
  var id = req.param('id');
  console.log(id);
  pool.query('select *,DATE_FORMAT(s.dateOfBirth,"%b %e, %Y") as bdate from student s inner join department d on s.departmentId = d.departmentId inner join faculty f on d.facultyId = f.facultyId WHERE sid = ?', id, function(err, rows, fields){
    if(err){
      console.log('individual info query error');
    }else {
      console.log(rows);
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

exports.rend=function(req,res){
  var query2="SELECT sid, fname, lname, GPAX from student";
  var query1="select * from instructor i inner join teach t on i.instructorId=t.instructorId inner join course c on c.courseId=t.courseId where i.instructorId=101010";
  var row = [];

  var return_data = {};
  var errormsg='';
  async.parallel([
    function(parallel_done){
      pool.query(query1, {}, function(err, rows){
        if (err) return parallel_done(err);
        return_data.table1 = rows;
        parallel_done();
      });
    },
    function(parallel_done){
      pool.query(query2, {}, function(err, rows){
        if(err) return parallel_done(err);
        if(rows=='') errormsg+='no results';
        return_data.table2 = rows;
        parallel_done();
      });
    }
  ], function(err){
    if(err) console.error(err);

    row = JSON.stringify(return_data);
    rows = JSON.parse(row);

    res.render('allpersonal',{
      student: rows.table2,
      subj: rows.table1,
      errormsg: errormsg
    })
  });
};
