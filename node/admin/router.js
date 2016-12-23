/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-23 15:35:07
*/

var query = require('./mysql');

exports.router = {
    login : function(req,res){
        res.render('admin/login');
    },
    check : function(req,res){
        query('select * fromt administrators',function(err,rows,fields){
            if(err){
                console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
                res.json({
                    status : 1,
                    data : '操作失败'
                })
                return ;
            }else{
                console.log(rows);
            }
            console.log(rows);
        })
    }
}