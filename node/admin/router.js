/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
* @Last Modified by:   anchen
<<<<<<< HEAD
* @Last Modified time: 2017-01-11 17:44:16
=======
* @Last Modified time: 2017-01-10 23:55:33
>>>>>>> 926e4607e17d13491f2979e23f6e69cb5cf3615a
*/

var query = require('./mysql');
var base = require('../common/base');
var upload = require('../common/saveImgs');
var config = require('../common/config');

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

    userList : function(req,res){
        // var sql = 'select * from administrators  where level>' + global.user.level;
        var sql = 'select * from administrators  where level>1 limit 0,' + config.userListPageNum ;
        query.query('select count(*) as records from administrators where level>1',function(perr,prows,pfields){
            pages = Math.ceil(prows[0].records/config.userListPageNum);
            query.sqlSelectRender(req,res,sql,'admin/userlist',pages);
        })
       
    },

     userListPage : function(req,res){
        // var sql = 'select * from administrators  where level>' + global.user.level;
        var start = req.body.page*config.userListPageNum;
        var sql = 'select loginname,pseudonym,name,level,logintime from administrators  where level>1 limit ' + start + ',' + config.userListPageNum ;
        query.query(sql,function(err,rows,fields){
            if(err){
                res.json({
                    status : 1,
                    data : '操作失败'
                })
            }else{
                for(var i=0;i<rows.length;i++){
                    rows[i].logintime = base.dateFormat(rows[i].logintime);
                }
                res.json({
                    status : 0,
                    data : rows
                })
            }
        })
    },

    addUser : function(req,res){ 

        if(req.body.userface != ''){ //有头像上传
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
        }else{  //无头像上传
            query.sqlInsert(req,res,'insert into administrators values('
                + '"'+ req.body.loginID +'",'
                + '"'+ req.body.level +'",'
                + '"'+ req.body.name +'",'
                + '"'+ req.body.loginPWD +'",'
                + '"'+ req.body.pseudonym +'",'
                + '"'+ req.body.userface +'",'
                + '"'+ req.body.email +'",'
                + '"'+ req.body.date +'"'
                +')','添加成功!','添加失败!');
        }
    },

    adduser_checkID : function(req,res){
        var sql = 'select * from administrators where loginname="' + req.query.loginID + '"';
        query.query(sql,function(err,rows,fields){
            if(rows.length){
                res.end('false');
            }else{
                res.end('true');
            }
        })
        
    },

    delUser : function(req,res){
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

    updateUser : function(req,res){
        var sql = 'select * from administrators where loginname="' + req.body.uloginID + '" and password="' + req.body.oldPWD + '"';
        if(req.body.newPWD){
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
        }else{
            var usql = 'update administrators set level="' + req.body.ulevel + '",name="' + req.body.uname + '",pseudonym="' + req.body.upseudonym + '" where loginname="' + req.body.uloginID + '"';
                query.sqlUpdate(req,res,usql,'修改成功','修改失败！');
        }
    },

   
    articleList : function(req,res){
        var sql = 'select * from article '+  'ORDER BY id DESC ' +' limit 0,' + config.articlePageNum  ;
        query.query('select count(*) as records from article',function(perr,prows,pfields){
            pages = Math.ceil(prows[0].records/config.articlePageNum);
            query.sqlSelectRender(req,res,sql,'admin/articlelist',pages);
        })
       
    },

     articleListPage : function(req,res){
        var start = req.body.page * config.articlePageNum;
        var sql = 'select * from article ORDER BY id DESC limit ' + start + ',' + config.articlePageNum ;
        query.query(sql,function(err,rows,fields){
            if(err){
                res.json({
                    status : 1,
                    data : '操作失败'
                })
            }else{
                res.json({
                    status : 0,
                    data : rows
                })
            }
        })
    },

    delArticle : function(req,res){
        var checkedArr = req.body.checkedArr.split(',');
        var sql = 'delete from article where id in (';
        for(var i=0;i<checkedArr.length;i++){
            if(i !=(checkedArr.length-1)){
                sql += '"' + checkedArr[i] + '",';
            }else{
                sql += '"' + checkedArr[i] + '"';
            }
        }
        sql += ')';
        query.sqlDelete(req,res,sql,'删除成功','删除失败');
    },

    article : function(req,res){
        var articleId = req.query.id;
        if(articleId){
            var sql = 'select * from article where id=' + articleId;
            query.sqlSelectRender(req,res,sql,'admin/article',0);
        }else{
            res.render('admin/article',{
                data : [{
                    title: '',
                    diy: '',
                    tag: '',
                    weight: '',
                    writer: '',
                    type: '',
                    keywords: '',
                    description: '',
                    content: '',
                    needwatermark: '',
                    notpost: '',
                    click: '',
                    date: ''
                }]
            });
        }
        
    },



    saveArticle : function(req,res){
        upload(req,res,function(fields,imgurls){
           if(fields.content.toString().indexOf('data:image') == -1){
                var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                var click = fields.art_click.toString().length ? fields.art_click : 0;
                var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,content,needwatermark,notpost,click,date) values('
                    + '"' + fields.art_title + '",' 
                    + '"' + fields.art_diy + '",' 
                    + '"' + fields.art_tag + '",' 
                    + weight + ',' 
                    + '"' + fields.art_writer + '",' 
                    + '"' + fields.art_type + '",' 
                    + '"' + fields.art_keywords + '",' 
                    + '"' + fields.art_description + '",' 
                    + '\'' +fields.content + '\',' 
                    + needwatermark + ',' 
                    + fields.notpost+ ',' 
                    + click + ',' 
                    + '"' + date + '"' 
                    +')'
                query.query(sql,function(err,rows,sqlfield){
                    if(err){
                        console.log('发布文章失败,错误信息：' + err);
                        res.render('admin/message',{
                            status : 1,
                            data : {
                                    title : '发布文章失败',
                                    linkData : [
                                        ['发布新文章','/adminArticle'],
                                        ['管理文章','/adminArticleList']
                                ]
                            }
                        })
                    }else{
                        console.log('发布文章成功');
                        res.render('admin/message',{
                            status : 0,
                            data : {
                                title : '发布文章成功',
                                linkData : [
                                    ['发布新文章','/adminArticle'],
                                    ['查看更改','/adminArticle?id='+rows.insertId],
                                    ['查看文章','/'],
                                    ['管理文章','/adminArticleList']
                                ]
                            }
                        })
                    }
                })
           }else{
                base.saveBase64ToImg(req,res,fields,'content',function(imgurls){
                   base.replaceBase64Src(req,res,fields,'content',imgurls,function(req,res,fields){
                        var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                        var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                        var click = fields.art_click.toString().length ? fields.art_click : 0;
                        var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                        var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,content,needwatermark,notpost,click,date) values('
                            + '"' + fields.art_title + '",' 
                            + '"' + fields.art_diy + '",' 
                            + '"' + fields.art_tag + '",' 
                            + weight + ',' 
                            + '"' + fields.art_writer + '",' 
                            + '"' + fields.art_type + '",' 
                            + '"' + fields.art_keywords + '",' 
                            + '"' + fields.art_description + '",' 
                            + '\'' +fields.content + '\',' 
                            + needwatermark + ',' 
                            + fields.notpost+ ',' 
                            + click + ',' 
                            + '"' + date + '"' 
                            +')'
                        
                        query.query(sql,function(err,rows,sqlfield){
                            if(err){
                                console.log('发布文章失败,错误信息：' + err);
                                res.render('admin/message',{
                                    status : 1,
                                    data : {
                                            title : '发布文章失败',
                                            linkData : [
                                                ['发布新文章','/adminArticle'],
                                                ['管理文章','/adminArticleList']
                                        ]
                                    }
                                })
                            }else{
                                console.log('发布文章成功');
                                res.render('admin/message',{
                                    status : 0,
                                    data : {
                                        title : '发布文章成功',
                                        linkData : [
                                            ['发布新文章','/adminArticle'],
                                            ['查看更改','/adminArticle?id='+rows.insertId],
                                            ['查看文章','/'],
                                            ['管理文章','/adminArticleList']
                                        ]
                                    }
                                })
                            }
                        })
                   });
               });
           }
        })
        
    },











    loginOut : function(req,res){
        global.user = '';
        res.redirect('/admin');
    }
}