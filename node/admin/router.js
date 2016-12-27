/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-27 18:12:48
*/

var query = require('./mysql');

exports.router = {
    login : function(req,res){

        if(!global.user){
            res.render('admin/login');
        }else{
            res.redirect('/adminIndex');
        }
        
    },
    check : function(req,res){
        var userName = req.query.userName;
        var userPWD = req.query.userPWD;
        var sql = 'select * from administrators where name="' + userName + '" and password="' + userPWD + '"';
    
        query.sqlSelectAjax(req,res,sql);
    },

    index : function(req,res){
        res.render('admin/index',{
            user : global.user
        });
    },

    cfg : function(req,res){
        var sql = 'select * from web_cfg';
        query.sqlSelectRender(req,res,sql,'admin/cfg');
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
        var sql = 'update web_cfg set '
            + 'basehost="' + basehost + '",' 
            + 'mainhost="' + mainhost + '",'
            + 'hostname="' + hostname + '",'
            + 'webname="' + webname + '",'
            + 'imgurl="' + imgurl + '",'
            + 'docurl="' + docurl + '",'
            + 'docstyle="' + docstyle + '",'
            + 'copyright="' + copyright + '",'
            + 'keywords="' + keywords + '",'
            + 'webdsc="' + webdsc + '",'
            + 'beian="' + beian + '",'
            + 'date="' + date + '"'
        query.sqlUpdate(req,res,sql,'保存成功','保存失败');
    },

    userlist : function(req,res){
        var sql = 'select * from web_cfg';
        query.sqlSelectRender(req,res,sql,'admin/cfg');
    },















    loginout : function(req,res){
        global.user = '';
        res.redirect('/admin');
    }
}