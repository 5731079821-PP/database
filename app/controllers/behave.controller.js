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
