var pool=require('../../sql');
var dialog=require('dialog');

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
  pool.query('select * from student s left join academicrecord a on s.sid=a.sid order by s.sid, a.year, a.term asc', function(err, rows){
    var aobj, bobj;
    var prevID;
    var year;
    var sem={'1','2','S'};
    for(var i=0; i<rows.length; i++){
      aobj=rows[i];
      year=1;
      jsonstr += '{ sid: "'+rows[i].sid+'",'+
        'fname: "'+rows[i].fname+'",'+
        'lname: "'+rows[i].lname+'",'+
        'GPAX: '+rows[i].GPAX+','+
        year+'-'+sem[semc]+': '+rows[i].GPA;
      for(var j=i+1; j<row.length; j++){
        bobj=rows[j];
        if(aobj.sid == bobj.sid){

          jsonstr += ','+


        }else{
          break;
        }
      }
    }
  });
};
