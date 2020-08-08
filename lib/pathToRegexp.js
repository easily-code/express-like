var pathToRegexp=module.exports=function(path) {
  var ret=path.replace(/:[^\/]+/g,'[^\/]+');
  ret='^'+ret+'$';
  return new RegExp(ret,'g');
}
