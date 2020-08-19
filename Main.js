
console.log('hello');



//var ZSDataBaseWriter = require('./ZSDataBaseWriter');
//
//dbWriter = new ZSDataBaseWriter();
//
//dbWriter.readDirecory();
//return;

var ZSKoaWebServer = require('./ZSKoaWebServer');

webServer = new ZSKoaWebServer();
webServer.startServer();
return;




var MongodbController = require('./MongodbController');

MongodbTest = new MongodbController();

//只会更新找到的第一条
//MongodbTest.updateOneData({'name':'dataName'},{'url':'012'},'dbName','tableName',function(succeed){
//                           console.log(succeed);
//                           });
//
//MongodbTest.updateManyData({'name':'dataName'},{'url':'dataName1232'},'dbName','tableName',function(succeed){
//                          console.log(succeed);
//                          });

MongodbTest.findData({'_id':'5dc223b40a9e5648f65d27a4'},'dbName','tableName',function(arr){
//                     ObjectId("5dc223b40a9e5648f65d27a4")
                     for(index in arr){
                     console.log(arr[index]);
                     }
                     });



//function updateOneData(conditionObj,updateObj,dbName,tableName,callBack){

/*
 1、去官网下载安装包mongodb。
 
 2、将安装包解压到/usr/local
 
 3、进入安装包解压后的目录，新建两个文件夹data和log  ：
 sudo mkdir data
 sudo mkdir log
 在log文件夹内 vim mongodb.log，随便写点什么，保存退出
 
 
 4、cd到bin：
 cd /usr/local/mongo/mongodb-macos-x86_64-4.2.1/bin
 
 5、vim mongodb.conf，写上下面的内容
 port=27017
 dbpath=/usr/local/mongo/data/
 logpath=/usr/local/mongo/log/mongodb.log
 fork=true
 bind_ip = 127.0.0.1
 保存退出
 
 
 6、sudo ./mongod -f mongodb.conf  就可以启动服务了
 
 7、启动过程遇到问题，可以用repair方式查找问题
 ./mongod --dbpath=/usr/local/mongo/data/ --logpath=/usr/local/mongo/log/mongodb.log --repair
 
 8.npm install mongodb
 
 */
