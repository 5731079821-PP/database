var pool=require('../../sql');
var dialog=require('dialog');
var newuser=require('../routes/User');
require('./login.controller');

exports.search=function(req,res){
  var by=req.body.by;
  var select=req.body.select;
  var order=req.body.order;
  var year=req.body.year;
  console.log('Search key: '+by);
  console.log('select choice: '+select);
  console.log('Order choice: '+order);
  console.log('year choice: '+year);
  var query = 'select s.sid, s.fname, s.lname, s.GPAX, a.GPA, a.year, a.term from student s left join academicrecord a on s.sid=a.sid ';
  if(select != undefined){
    if(select == 'id'){
      query += ' where s.sid like "%'+by+'%"';
    }else if(select == 'name'){
      if(by == ''){
        dialog.err('PLEASE FILL NAME IN THE BOX', 'warning', function (err) {
          return;
        });
        return;
      }else {
        if(by.indexOf(' ')>-1){// fname and lname
          fname = by.substr(0, by.indexOf(' '));
          lname = by.substr(by.lastIndexOf(' ')+1,by.length);
          query += ' where s.fname = "'+fname+'" and s.lname like "%'+lname+'%" ';
        }else{
          query += ' where s.fname like "%'+by+'%" ';
        }
      }
    }else if(select == 'assist'){
      query += ' where s.instructorid = '+newuser.userinstructorId;
    }else if(select == 'year'){
      if(year == undefined){
        dialog.err('PLEASE SELECT YEAR', 'warning', function (err) {
          return;
        });
        return;
      }
      else query += ' where idtoyear(s.sid) '+ year;
    }else if(select == 'gpax'){
      if(by == ''){
        dialog.err('PLEASE FILL COMPARE GPAX IN THE BOX', 'warning', function (err) {
          return;
        });
        return;
      }
      else query += ' where s.GPAX '+grade+by;
    }
  }
  query += ' order by s.sid, a.year, a.term asc';
  var jsonstr = '[';
  pool.query(query, function(err, rows){
    if(err) console.error('QUERY ERROR : search registrar table');
    console.log(rows);
    console.log('query success');
    var aobj, bobj;
    var prevID;
    var year;
    var sem=['1st','2nd','S'];
    console.log(rows.length);
    for(var i=0; i<rows.length; i++){
      aobj=rows[i];
      year=aobj.year-1;
      jsonstr += '{"sid":'+rows[i].sid+','+
        '"fname": "'+aobj.fname+'",'+
        '"lname": "'+aobj.lname+'",'+
        '"GPAX": '+aobj.GPAX+','+
          // set grade of all semester to ''-''
        '"y'+(aobj.year-year)+'_'+sem[0]+'": "'+'-'+'",'+
        '"y'+(aobj.year-year)+'_'+sem[2]+'": "'+'-'+'",'+
        '"y'+(aobj.year-year)+'_'+sem[1]+'": "'+'-'+'",'+

        '"y'+(aobj.year-year)+'_'+sem[aobj.term-1]+'": '+aobj.GPA;
      var prevyear = aobj.year;
      for(var j=i+1; j<rows.length; j++){
        console.log('in if : '+j);
        bobj=rows[j];
        if(aobj.sid == bobj.sid){
          if(prevyear != bobj.year){
            jsonstr += ','+
              '"y'+(bobj.year-year)+'_'+sem[0]+'": "'+'-'+'",'+
              '"y'+(bobj.year-year)+'_'+sem[1]+'": "'+'-'+'",'+
              '"y'+(bobj.year-year)+'_'+sem[2]+'": "'+'-'+'"';
            prevyear = bobj.year;
          }
          jsonstr += ','+
            '"y'+(bobj.year-year)+'_'+sem[bobj.term-1]+'": '+bobj.GPA;
        }else{
          // console.log(' in else ');
          i=j;
          var fillyear=rows[j-1].year-aobj.year;
          fillyear+=2;
          // console.log(' fillyear '+fillyear);
          for( fillyear; fillyear<=4; fillyear++){
            // console.log( fillyear);
            jsonstr += ','+
              '"y'+(fillyear)+'_'+sem[0]+'": "'+'-'+'",'+
              '"y'+(fillyear)+'_'+sem[1]+'": "'+'-'+'",'+
              '"y'+(fillyear)+'_'+sem[2]+'": "'+'-'+'"';
          }
          jsonstr += '},';
          break;
        }
      }
      if(i == rows.length-1 ){
        for(var fillyear=(rows[i].year-year)+1; fillyear<=4; fillyear++){
          jsonstr += ','+
            '"y'+(fillyear)+'_'+sem[0]+'": "'+'-'+'",'+
            '"y'+(fillyear)+'_'+sem[1]+'": "'+'-'+'",'+
            '"y'+(fillyear)+'_'+sem[2]+'": "'+'-'+'"';
        }
        jsonstr +='}';
      }
    } jsonstr += ']';
    console.log(jsonstr);
    // jsonstr = "'" + jsonstr + "'";
    var tojsonstr = JSON.parse(jsonstr);
    var errormsg = '';
    if(jsonstr=='[]') errormsg = 'NO RESULTS';
    res.render('regis',{
      student : tojsonstr,
      errormsg : errormsg
    });
  })
};

exports.record=function(req,res){
  res.render('record');
};
exports.rend=function(req,res){
  var jsonstr = '[';
  pool.query('select s.sid, s.fname, s.lname, s.GPAX, a.GPA, a.year, a.term from student s left join academicrecord a on s.sid=a.sid order by s.sid, a.year, a.term asc', function(err, rows){
    if(err) console.error('QUERY ERROR : render registrar table');
    console.log('query success');
    var aobj, bobj;
    var prevID;
    var year;
    var sem=['1st','2nd','S'];
    for(var i=0; i<rows.length; i++){
      aobj=rows[i];
      year=aobj.year-1;
      jsonstr += '{"sid":'+rows[i].sid+','+
        '"fname": "'+aobj.fname+'",'+
        '"lname": "'+aobj.lname+'",'+
        '"GPAX": '+aobj.GPAX+','+
          // set grade of all semester to ''-''
        '"y'+(aobj.year-year)+'_'+sem[0]+'": "'+'-'+'",'+
        '"y'+(aobj.year-year)+'_'+sem[2]+'": "'+'-'+'",'+
        '"y'+(aobj.year-year)+'_'+sem[1]+'": "'+'-'+'",'+

        '"y'+(aobj.year-year)+'_'+sem[aobj.term-1]+'": '+aobj.GPA;
      var prevyear = aobj.year;
      for(var j=i+1; j<rows.length; j++){
        bobj=rows[j];
        if(aobj.sid == bobj.sid){
          if(prevyear != bobj.year){
            jsonstr += ','+
              '"y'+(bobj.year-year)+'_'+sem[0]+'": "'+'-'+'",'+
              '"y'+(bobj.year-year)+'_'+sem[1]+'": "'+'-'+'",'+
              '"y'+(bobj.year-year)+'_'+sem[2]+'": "'+'-'+'"';
            prevyear = bobj.year;
          }
          jsonstr += ','+
            '"y'+(bobj.year-year)+'_'+sem[bobj.term-1]+'": '+bobj.GPA;
        }else{
          // console.log(' in else ');
          i=j;
          var fillyear=rows[j-1].year-aobj.year;
          fillyear+=2;
          // console.log(' fillyear '+fillyear);
          for( fillyear; fillyear<=4; fillyear++){
            // console.log( fillyear);
            jsonstr += ','+
              '"y'+(fillyear)+'_'+sem[0]+'": "'+'-'+'",'+
              '"y'+(fillyear)+'_'+sem[1]+'": "'+'-'+'",'+
              '"y'+(fillyear)+'_'+sem[2]+'": "'+'-'+'"';
          }
          jsonstr += '},';
          break;
        }
      }
      if(i == rows.length-1){
        for(var fillyear=(rows[i].year-year)+1; fillyear<=4; fillyear++){
          jsonstr += ','+
            '"y'+(fillyear)+'_'+sem[0]+'": "'+'-'+'",'+
            '"y'+(fillyear)+'_'+sem[1]+'": "'+'-'+'",'+
            '"y'+(fillyear)+'_'+sem[2]+'": "'+'-'+'"';
        }
        jsonstr +='}';
      }
    } jsonstr += ']';
    console.log(jsonstr);
    // jsonstr = "'" + jsonstr + "'";
    var tojsonstr = JSON.parse(jsonstr);
    var errormsg = '';
    if(jsonstr=='[]') errormsg = 'NO RESULTS';
    res.render('regis',{
      student : tojsonstr,
      errormsg : errormsg
    });
  });
};
