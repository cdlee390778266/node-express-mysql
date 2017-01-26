var mysql = require('mysql');
var query = require('../admin/mysql');
var config = require('../common/config');




var sqlSelectAll = function(req,res,sqlArr,callback){
    var data = {};
    var index = 0;
    function sqlSelectOne(length){
        query.query(sqlArr[index].sql,function(err,rows,fields){
            if(err){
                console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
                res.redirect('/notfound');
                return ;
            }else{
               data[sqlArr[index].field] = rows;
               index++;
               if(index<length){
                    sqlSelectOne(sqlArr.length);
               }else{
                    callback(data);
               }
            }

        })
    }
    sqlSelectOne(sqlArr.length);

}



module.exports = {
    sqlSelectAll : sqlSelectAll
};