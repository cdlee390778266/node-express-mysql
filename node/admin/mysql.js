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


/*
mysql 增
 */
var sqlInsert = function(req,res,sql,sucString,errString){
    query(sql,function(err,rows,fields){
        if(err){
            console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
            res.json({
                status : 1,
                data : errString
            });
            return ;
        }else{
            res.json({
                status : 0,
                data : sucString
            })
        }

    })
}

/*
mysql 删
 */
var sqlDelete = function(req,res,sql){
    query(sql,function(err,rows,fields){
        if(err){
            console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
            res.json({
                status : 1,
                data : '操作失败'
            });
            return ;
        }else{
            if(rows.length>0){
                res.json({
                    status : 0,
                    data : '登录成功'
                })
            }else{
                res.json({
                    status : 1,
                    data : ' 管理员账户或密码错误！'
                })
            }
        }

    })
}

/*
mysql 改
 */
var sqlUpdate = function(req,res,sql){
    query(sql,function(err,rows,fields){
        if(err){
            console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
            res.json({
                status : 1,
                data : '操作失败'
            });
            return ;
        }else{
            if(rows.length>0){
                res.json({
                    status : 0,
                    data : '登录成功'
                })
            }else{
                res.json({
                    status : 1,
                    data : ' 管理员账户或密码错误！'
                })
            }
        }

    })
}

/*
mysql 查
 */
var sqlSelect = function(req,res,sql){
    query(sql,function(err,rows,fields){
        if(err){
            console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
            res.json({
                status : 1,
                data : '操作失败'
            });
            return ;
        }else{
            if(rows.length>0){
                res.json({
                    status : 0,
                    data : '登录成功'
                })
            }else{
                res.json({
                    status : 1,
                    data : ' 管理员账户或密码错误！'
                })
            }
        }

    })
}

module.exports = {
    'query' : query,
    'sqlInsert' : sqlInsert,
    'sqlDelete' : sqlDelete,
    'sqlUpdate' : sqlUpdate,
    'sqlSelect' : sqlSelect
};