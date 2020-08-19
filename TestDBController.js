
let url = 'mongodb://127.0.0.1:27017/';

let testDB = 'testDB';

let testTable = 'testTable';

var MongoClient = require('mongodb').MongoClient;

function insertOneData(dataObj){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        if(err){throw err}
                        var dbObj = db.db(testDB);
                        dbObj.collection(testTable).insertOne(dataObj,function(err,res){
                                                              if(err){throw err}
                                                              console.log('insert succeed');
                                                              db.close();
                                                              });
                        });
}

function insertMany(dataObj){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        if(err){throw err}
                        var dbObj = db.db(testDB);
                        dbObj.collection(testTable).insertMany(dataObj,function(err,res){
                                                               if(err){throw err}
                                                               console.log('insert succeed');
                                                               db.close();
                                                               });
                        });
}


function findData(conditionObj,callBack){
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err){throw err}
                        
                        var dbObj = db.db(testDB);
                        
                        dbObj.collection(testTable).find(conditionObj).toArray(function(err,result){
                                                                               
                                                                               if(err) throw err;
                                                                               
                                                                               callBack(result);
                                                                               
                                                                               db.close();
                                                                               
                                                                               });
                        
                        });
}

function updateOneData(conditionObj,updateObj,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(testDB);
                        
                        var updateData = {$set:updateObj};
                        
                        dbObj.collection(testTable).updateOne(conditionObj,updateData,function(err,res){
                                                              
                                                              if(err) throw err;
                                                              
                                                              callBack(true);
                                                              
                                                              db.close();
                                                              
                                                              });
                        
                        });
    
}

function updateManyData(conditionObj,updateObj,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(testDB);
                        
                        var updateData = {$set:updateObj};
                        
                        dbObj.collection(testTable).updateMany(conditionObj,updateData,function(err,res){
                                                               
                                                               if(err) throw err;
                                                               
                                                               callBack(true);
                                                               
                                                               db.close();
                                                               
                                                               });
                        
                        });
    
}

function deleteOneData(conditionObj,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(testDB);
                        
                        dbObj.collection(testTable).deleteOne(conditionObjl,function(err,obj){
                                                              
                                                              if(err) throw err;
                                                              
                                                              callBack(true);
                                                              
                                                              db.close();
                                                              
                                                              });
                        
                        });
    
}

function deleteOneMany(conditionObj,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(testDB);
                        
                        dbObj.collection(testTable).deleteMany(conditionObjl,function(err,obj){
                                                               
                                                               if(err) throw err;
                                                               
                                                               callBack(true);
                                                               
                                                               db.close();
                                                               
                                                               //                                                               obj.result.n 删除的条数。
                                                               
                                                               });
                        
                        });
    
}

function logData(string){
    console.log(string);
}

function TestDBController(){
    this.insertOneData = insertOneData;
    this.insertMany = insertMany;
    this.findData = findData;
    this.updateOneData = updateOneData;
    this.updateManyData = updateManyData;
    this.deleteOneData = deleteOneData;
    this.deleteOneMany = deleteOneMany;
    this.logData = logData;
}

module.exports = TestDBController;
