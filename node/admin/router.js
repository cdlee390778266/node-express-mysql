/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-26 18:03:14
*/

var query = require('./mysql');

exports.router = {
    login : function(req,res){
        res.render('admin/login');
    },
    check : function(req,res){
        var userName = req.query.userName;
        var userPWD = req.query.userPWD;
        var sql = 'select * from administrators where name="' + userName + '" and password="' + userPWD + '"';
    
        query.sqlSelect(req,res,sql);
    },

    index : function(req,res){
        res.render('admin/index');
    },

    cfg : function(req,res){
        res.render('admin/cfg');
    },

    savecfg : function(req,res){
        var basehost = req.body.basehost;
        var mainhost = req.body.mainhost;
        var hostname = req.body.hostname;
        var webname = req.body.webname;
        var imgurl = req.body.imgurl;
        var docurl = req.body.docurl;
        var docstyle = req.body.docstyle;
        var copyright = req.body.copyright;
        var keywords = req.body.keywords;
        var webdsc = req.body.webdsc;
        var beian = req.body.beian;
        var date = req.body.date;
        var sql = 'insert into web_cfg values('
            + '"' + basehost + '",' 
            + '"' + mainhost + '",'
            + '"' + hostname + '",'
            + '"' + webname + '",'
            + '"' + imgurl + '",'
            + '"' + docurl + '",'
            + '"' + docstyle + '",'
            + '"' + copyright + '",'
            + '"' + keywords + '",'
            + '"' + webdsc + '",'
            + '"' + beian + '",'
            + '"' + date + '"'
            + ')';
        query.sqlInsert(req,res,sql,'保存成功','保存失败');
    }
}