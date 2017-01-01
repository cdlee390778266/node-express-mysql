/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-30 15:58:02
*/

var query = require('./mysql');
var upload = require('../common/saveImgs');

exports.router = {
    login : function(req,res){
        res.render('admin/login');
        // if(!global.user){
        //     res.render('admin/login');
        // }else{
        //     res.redirect('/adminIndex');
        // }
        
    },
    check : function(req,res){
        var userName = req.query.userName;
        var userPWD = req.query.userPWD;
        var loginTime = req.query.loginTime;
        var sql = 'select * from administrators where loginname="' + userName + '" and password="' + userPWD + '"';
        var updateSql = 'update administrators set logintime="' + loginTime + '"  where name="' + userName + '"';
        query.sqlSelectLogin(req,res,sql,updateSql);
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
        // var sql = 'select * from administrators  where level>' + global.user.level;
        var sql = 'select * from administrators  where level>1' ;
        query.sqlSelectRender(req,res,sql,'admin/userlist');
    },

    adduser : function(req,res){  
        upload(req,res,function(fields,imgurls){
            query.sqlInsert(req,res,'insert into administrators values('
                + '"'+ fields.loginID +'",'
                + '"'+ fields.level +'",'
                + '"'+ fields.name +'",'
                + '"'+ fields.loginPWD +'",'
                + '"'+ fields.pseudonym +'",'
                + '"'+ imgurls +'",'
                + '"'+ fields.email +'",'
                + '"'+ fields.date +'"'
                +')','添加成功!','添加失败!');
        });
    },

    deluser : function(req,res){
        var loginnames = req.body.loginnames.split(',');
        var sql = 'delete from administrators where loginname in (';
        for(var i=0;i<loginnames.length;i++){
            if(i !=(loginnames.length-1)){
                sql += '"' + loginnames[i] + '",';
            }else{
                sql += '"' + loginnames[i] + '"';
            }
        }
        sql += ')';
        query.sqlDelete(req,res,sql,'删除成功','删除失败');
    },

    updateuser : function(req,res){
        var sql = 'select * from administrators where loginname="' + req.body.uloginID + '" and password="' + req.body.oldPWD + '"';
        query.query(sql,function(err,rows,fields){

            if(rows.length>0){
                if(rows[0].password != req.body.newPWD){
                    var usql = 'update administrators set level="' + req.body.ulevel + '",name="' + req.body.uname + '",password="' + req.body.newPWD + '",pseudonym="' + req.body.upseudonym + '" where loginname="' + req.body.uloginID + '"';
                    query.sqlUpdate(req,res,usql,'修改成功','修改失败！');
                }else{
                    res.json({
                        status : 1,
                        data : '新密码与原始密码相同!'
                    })
                }
                
            }else{
                res.json({
                    status : 1,
                    data : '原始密码不正确!'
                })
            }
        })
    },














    loginout : function(req,res){
        global.user = '';
        res.redirect('/admin');
    }
}