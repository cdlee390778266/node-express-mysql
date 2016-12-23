var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    host : 'localhost',
    user : config.sqluser,
    password : config.sqlpassword,
    database : config.database
})

var query = function(sql,callback){
    pool.getConnection(function(error,conn){
        if(error){
            callback(error,null,null);
            console.log('获取数据库链接失败.错误信息：' + error);
        }else{
            console.log('获取数据库链接成功.');
            conn.query(sql,function(err,rows,fields){
               //释放连接
                conn.release();
                //事件驱动回调
                callback(err,rows,fields);
            })
        }
    })
}

module.exports = query;