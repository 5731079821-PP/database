var pool=require('../../sql');
var dialog=require('dialog');
var str2json=require('string-to-json');

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

exports.record=function(req,res){
  res.render('record');
};
exports.rend=function(req,res){
  var jsonstr = '[';
  pool.query('select * from student s left join academicrecord a on s.sid=a.sid order by s.sid, a.year, a.term asc', function(err, rows){
    if(err) console.error('QUERY ERROR : render registrar table');
    console.log('query success');
    var aobj, bobj;
    var prevID;
    var year;
    var sem=['1st','2nd','S'];
    for(var i=0; i<rows.length; i++){
      aobj=rows[i];
      console.log(aobj);
      year=aobj.year-1;
      jsonstr += '{"sid":'+rows[i].sid+','+
        '"fname": "'+aobj.fname+'",'+
        '"lname": "'+aobj.lname+'",'+
        '"GPAX": '+aobj.GPAX+','+
          // set grade of all semester to 'null'
        '"y'+(aobj.year-year)+'_'+sem[0]+'": '+null+','+
        '"y'+(aobj.year-year)+'_'+sem[1]+'": '+null+','+
        '"y'+(aobj.year-year)+'_'+sem[2]+'": '+null;

        '"y'+(aobj.year-year)+'_'+sem[aobj.term-1]+'": '+aobj.GPA;
      var prevyear = aobj.year-year;
      console.log(jsonstr);
      for(var j=i+1; j<rows.length; j++){
        bobj=rows[j];
        if(aobj.sid == bobj.sid){
          if(prevyear != bobj.year-year){
            console.log('prevy : ' + prevyear + ' bobj.year-year :'+ bobj.year-year);
            jsonstr += ','+
              '"y'+(aobj.year-year)+'_'+sem[0]+'": '+null+','+
              '"y'+(aobj.year-year)+'_'+sem[1]+'": '+null+','+
              '"y'+(aobj.year-year)+'_'+sem[2]+'": '+null;
            prevyear = bobj.year-year;
          }
          jsonstr += ','+
            '"y'+(bobj.year-year)+'_'+sem[bobj.term-1]+'": '+bobj.GPA;
        }else{
          i=j;
          jsonstr += '},';
          break;
        }
      }
      if(i == rows.length-1){
        for(var fillyear=rows[i].year-year; fillyear<=4; fillyear++){
          for(var fillterm=rows[i].term; fillterm<=3; fillterm++){
            jsonstr +=  ','+
              '"y'+(fillyear)+'_'+sem[fillterm-1]+'":"null"';
          }
        }jsonstr +='}';
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
