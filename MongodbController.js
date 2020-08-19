
let url = 'mongodb://127.0.0.1:27017/';

var MongoClient = require('mongodb').MongoClient;

function insertOneData(dataObj,dbName,tableName){
    

    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        if(err){throw err}
                        var dbObj = db.db(dbName);
                        dbObj.collection(tableName).insertOne(dataObj,function(err,res){
                                                                if(err){throw err}
                                                                console.log('insert succeed');
                                                                db.close();
                                                                });
                        });
}

function insertMany(dataObj,dbName,tableName){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        if(err){throw err}
                        var dbObj = db.db(dbName);
                        dbObj.collection(tableName).insertMany(dataObj,function(err,res){
                                                              if(err){throw err}
                                                              console.log('insert succeed');
                                                              db.close();
                                                              });
                        });
}


function findData(conditionObj,dbName,tableName,callBack){
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err){throw err}
                        
                        var dbObj = db.db(dbName);
                        
                        dbObj.collection(tableName).find(conditionObj).toArray(function(err,result){
                                                                               
                                                                               if(err) throw err;
                                                                               
                                                                               callBack(result);
                                                                               
                                                                               db.close();
                                                                               
                                                                               });
                        
                        });
}

function updateOneData(conditionObj,updateObj,dbName,tableName,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(dbName);
                        
                        var updateData = {$set:updateObj};
                        
                        dbObj.collection(tableName).updateOne(conditionObj,updateData,function(err,res){
                                                              
                                                              if(err) throw err;
                                                              
                                                              callBack(true);
                                                              
                                                              db.close();
                                                              
                                                              });
                        
                        });
    
}

function updateManyData(conditionObj,updateObj,dbName,tableName,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(dbName);
                        
                        var updateData = {$set:updateObj};

                        dbObj.collection(tableName).updateMany(conditionObj,updateData,function(err,res){
                                                              
                                                              if(err) throw err;
                                                              
                                                              callBack(true);
                                                              
                                                              db.close();
                                                              
                                                              });
                        
                        });
    
}

function deleteOneData(conditionObj,dbName,tableName,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(dbName);
                        
                        dbObj.collection(tableName).deleteOne(conditionObjl,function(err,obj){
                                                              
                                                              if(err) throw err;
                                                              
                                                              callBack(true);
                                                              
                                                              db.close();
                                                              
                                                              });
                        
                        });
    
}

function deleteOneMany(conditionObj,dbName,tableName,callBack){
    
    MongoClient.connect(url,{useUnifiedTopology:true},function(err,db){
                        
                        if(err) throw err;
                        
                        var dbObj = db.db(dbName);
                        
                        dbObj.collection(tableName).deleteMany(conditionObjl,function(err,obj){
                                                              
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

function MongodbController(){
    this.insertOneData = insertOneData;
    this.insertMany = insertMany;
    this.findData = findData;
    this.updateOneData = updateOneData;
    this.updateManyData = updateManyData;
    this.deleteOneData = deleteOneData;
    this.deleteOneMany = deleteOneMany;
    this.logData = logData;
}

module.exports = MongodbController;
