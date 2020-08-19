
//需要 安装 md5-node npm install md5-node

var MongodbController = require('./MongodbController');

let testDB = 'testDB';
let testTable = 'testTable';


let filePath = '/Users/vstarcam/Desktop/MP3s';

var fs = require("fs");
var path = require("path");

function readDirecory(){
    var files = fs.readdirSync(filePath);
    var filesArr = [];
    files.forEach(function(val,key){
                  
                  var temp = path.join(filePath,val);
                  
                  if (isFile(temp)){
                  if(temp.includes('.mp3')){
                  console.log(temp);
                  
                  let fileObj = getFileInfos(temp);
                  filesArr.push(fileObj);

                  }
                  }
                  
                  });
    
    MongodbTest = new MongodbController();
    MongodbTest.insertMany(filesArr,testDB,testTable);
    console.log('insert finish');
}



function getFileInfos(filePath){
    let fileID = getFileID(filePath);
    let fileName = getFileName(filePath);
    let fileObj = {'filePath':filePath,'fileID':fileID,'fileName':fileName};//时间  标题  关键字  filepath id

    return fileObj;
}

function getFileID(filePath){
    let string = filePath + Date.now();
    let fileID = md5Encrypt(string);
    return fileID;
}

function getFileName(filePath){
    let arr = filePath.split('/');
    let lastPath = arr[arr.length - 1];
    let arr1 = lastPath.split('.');
    let fileName = arr1[0];
    return fileName;
}

function md5Encrypt(string){
    var md5 = require('md5-node');
    return md5(string);
}

function isFile(fileName){
    if(fs.existsSync(fileName)){
        return fs.statSync(fileName).isFile();
    }
}

function ZSDataBaseWriter(){
    this.readDirecory = readDirecory;
}

module.exports = ZSDataBaseWriter;
