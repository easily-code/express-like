module.exports=function () {
  var ms=[];
  var app=function() {
    var i=0,context={};
    function next(err) {
      if (i>ms.length-1) return;
      ms[i++](context,next);
    }
    next();
  }
  app.use=function (f) {
    ms.push(f);

  };
  return app;
};
