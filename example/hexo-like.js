var app=require('./hexolike')();

var deleteAll=require('./delete-all');
var loadMd=require('./load-md');
var mdParser=require('./md-parser');
var loadPlugs=require('./load-plugs');
var compileEjs=require('./compile-ejs');
var categoriesTags=require('./categories-tags');
var makeBlogs=require('./make-blogs');

app.use(deleteAll('./public/blogs'))
//blogs目录下有文件的会先删除，在创建文件夹blogs

app.use(loadMd('./source'));
// 读md文件

app.use(mdParser());
// 解析md文件(模块：yaml-front-matter,highlight,markdown-it)

app.use(loadPlugs());
// 读模板(ejs)

app.use(function (ctx,next) {
  for (var i in ctx.files) {
    var plug=ctx.files[i].data['self'];
    if(plug)
  {  ctx.files[i].data['content']+=ctx.plugs[plug]({'people':ctx.files[i].data.people})
    console.log(ctx.files[i].data['content']);}
  }

})
app.use(compileEjs());
//ejs模板解析

app.use(categoriesTags())

app.use(makeBlogs());
