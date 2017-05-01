// var mysql = require('mysql');
var async = require('async');
var pool = require('../../sql');
var dialog = require('dialog');
var newuser=require('../routes/User');
require('./login.controller');

exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var type=req.body.type;
  var order=req.body.order;
  var date=req.body.date;//2017-04-13 this format
  console.log('Search key: '+by);
  console.log('select : '+select);
  console.log('type choice: '+type);
  console.log('Order choice: '+order);
  console.log('Date choice: '+date);
  var query = 'select a.name, a.type, a.prize, p.sid, a.assistant, DATE_FORMAT(a.date,"%b %e, %Y") as date , s.fname, s.lname from activity a '+
  'inner join paticipate p on a.activityid = p.activityId '+
  'inner join student s on s.sid= p.sid';

  if(select == 'assist'){
    query += ' inner join instructor i on s.instructorid=i.instructorId where i.instructorId = '+newuser.userinstructorId;
  }else if(select == 'date'){
    if(date == ''){
      dialog.err('PLEASE CHOOSE DATE', 'warning', function (err) {
        return;
      });
    }
    else {
      query += ' where date = "'+date+'" ';
    }
  }

  if(by != '') {
    if(query.indexOf('where') == -1) query +=' where ';
    else query+=' or ';
    query += ' p.sid = "'+by+'" '+' or a.name = "'+by+'" '+' or s.fname="'+by+'" '+' or a.assistant="'+by+'" ';
  }

  if(type!='' && type!=undefined){
    if(query.indexOf('where') == -1) query +=' where ';
    else query+=' and ';
    query += ' a.type="'+type+'" ';
  }
  console.log(date);
  console.log(query);
  pool.query(query, function(err, rows){
    if(err) console.error('QUERY ERROR : activity with search apply');
    var errormsg='';
    if(rows=='') errormsg="NO RESULTS";
    res.render('act',{
      student : rows,
      errormsg : errormsg
    });
  });

};

exports.home=function(req,res){
  res.render('layout',{
    User: 'ID: '+req.session.inID+'  ',
    subtitle: 'Overview'
  });
};
exports.rend=function(req,res){
  var query='select a.name, a.type, a.prize, p.sid, a.assistant, DATE_FORMAT(a.date,"%b %e, %Y") as date , s.fname, s.lname from activity a '+
  'inner join paticipate p on a.activityid = p.activityId '+
  'inner join student s on s.sid= p.sid';
  pool.query(query, function(err, rows){
    if(err) console.error('QUERY ERROR : activity table');
    var errormsg='';
    if(rows=='') errormsg + 'NO RESULTS';
    res.render('act',{
      student : rows,
      errormsg : errormsg
    });
  });
  // res.render('act');
};
