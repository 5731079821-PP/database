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
  
};
