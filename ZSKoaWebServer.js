
//https://www.jianshu.com/p/9ca8abe180f4
//https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192

//需要安装 koa koa-router  koa-bodyparser

var fs = require("fs");


var TestDBController = require('./TestDBController');
MongodbTest = new TestDBController();


function startServer(){
    const router = require('koa-router')();

    const Koa = require('koa');
    const app = new Koa();
    const bodyParser = require('koa-bodyparser');
//    app.use(async (ctx, next) => {
//            await next();
//            ctx.response.type = 'text/html';
//            ctx.response.body = '<h1>Hello, koa2!feawdfcS</h1>';
//            });
    

    app.use(async (ctx, next) => {
            await next();
            console.log('async 3000...');

            });
    

    
 
//    koa2 :koa2 异步执行完成后再返回数据
    router.get('/getAllFiles', async (ctx, next) => {

               let data = await findAllData();
               ctx.response.body = data;

               });
    
    router.get('/getFile', async (ctx, next) => {
               let request = ctx.request;
               let req_query = request.query;
               let req_queryString = request.queryString;
//               console.log('request is ' + JSON.stringify(request) + ', \nreq_query is ' + JSON.stringify(request.query) + ',\nreq_queryString is ' + JSON.stringify(req_queryString));
               
               let fileID = req_query.fileID;

               
//               console.log('ctx.params is ' + JSON.stringify(ctx));
               let data = await findOneData(fileID);
               console.log('did get fileData');

//               ctx.response.body = data;
               ctx.status = 200;
               ctx.type = 'mp3';
//               console.log('Buffer is ' + Buffer.isBuffer(data));
               ctx.length = Buffer.byteLength(data);
//               ctx.body = data;
               ctx.response.body = data;

//               ctx.length = Buffer.byteLength(body);
               });

    //http://localhost:3000/hello/123e33
    router.get('/hello/:name', async (ctx, next) => {
               var name = ctx.params.name;
               ctx.response.body = `<h1>Hello, ${name}!</h1>`;
               });
/*
    router.get('/', async (ctx, next) => {
               ctx.response.body = `<h1>Index</h1>
               <form action="/signin" method="post">
               <p>Name: <input name="name" value="koa"></p>
               <p>Password: <input name="password" type="password"></p>
               <p><input type="submit" value="Submit"></p>
               </form>`;
               });

    router.post('/signin', async (ctx, next) => {
                var name = ctx.request.body.name || '',
                password = ctx.request.body.password || '';
                console.log(`signin with name: ${name}, password: ${password}`);
                if (name === 'koa' && password === '12345') {
                ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
                } else {
                ctx.response.body = `<h1>Login failed!</h1>
                <p><a href="/">Try again</a></p>`;
                }
                });
    */
//    最后注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
    
    app.use(bodyParser());//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
    app.use(router.routes());//用上路由
    app.listen(3000);
    console.log('app started at port 3000...');
}

//https://www.jianshu.com/p/7c12cd4c8749
var findAllData = function(){
    return new Promise(function(resolve, reject){
                       MongodbTest.findData({},function(arr){
                                            if(arr){
                                            resolve(arr);
                                            }
                                            else
                                            {
                                            reject('未找到数据');
                                            }
                                            });
                       });
}

var findOneData = function(fileID){
    return new Promise(function(resolve, reject){
                       MongodbTest.findData({'fileID':fileID},function(arr){
                                            if(arr){
                                            
                                            let data = arr[0];
                                            let filePath = data.filePath;
//                                            getFile(filePath,resolve, reject);
                                            
                                            let fileData = fs.readFileSync(filePath);

                                            
                                            resolve(fileData);
                                            }
                                            else
                                            {
                                            reject('未找到数据');
                                            }
                                            });
                       });
}


var getFile = function(filePath,resolve, reject){
    return new Promise(function(resolve, reject){
                       
                       fs.readFile(filePath, function (err, data) {
                                   if(err){
                                   reject('错误');
                                   }
                                   else
                                   {
                                   console.log('get filePath is ' + filePath);
                                   resolve(data);
                                   }
                                   });
                       });
}







function ZSKoaWebServer(){
    this.startServer = startServer;
}

module.exports = ZSKoaWebServer;
