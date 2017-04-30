var connection = require('../../sql');

exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var order=req.body.order;
  var type=req.body.type;
  console.log('Search key: '+by);
  console.log('Search choice: '+select);
  console.log('Order choice: '+order);
  console.log('Type choice: '+type);
  var query = '';
  if(select == 'undefined'){
    if(by != '' ){
      query += 'where s.sid = "' + by + '" or s.fname = "' + by + '"';
    }
  }else if(select=='all'){
    if(by != '')
    query += 'WHERE  s.fname = "' + by + '" or s.sid = "' + by +'"' ;
  }else{
    if(select != 'course'){
      if(select == 'assist'){
        query += ' inner join instructor i on s.instructorid = i.instructorId '+
        'where i.instructorId = ' + /*session instructorId*/ '101010';
      }
      if(by != '' && select != 'undefined'){
        if(select == 'assist') query += ' and s.sid = "' + by + '" or s.fname = "' + by + '"';
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
  connection.query('SELECT * FROM student s ' + query, function(err, rows, fields){
    if(err){
      console.error('QUERY ERROR : behave table with search apply');
    }else{
      var errormsg='';
      if(rows == ''){
          errormsg+= 'no results';
      }
      res.render('behave',{
      student : rows,
      errormsg: errormsg
      });
    }
  });
  };
exports.rend=function(req,res){
  connection.query('select sid, fname, lname, behaviorScore, GPAX from student', function(err, rows){
      if(err) console.error('QUERY ERROR : all behavior table');
      var errormsg='';
      if(rows == ''){
          errormsg+= 'no results';
      }
      res.render('behave', {
        student : rows,
        errormsg : errormsg
      });
  });
};

exports.indivScore=function(req,res){
  var id = req.param('id');
  res.render('bscore');
};
