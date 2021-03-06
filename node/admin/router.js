/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
*/

var query = require('./mysql');
var base = require('../common/base');
var upload = require('../common/saveImgs');
var config = require('../common/config');
var tree = require('../common/tree');
var path = require('path');  

var mainPath = path.dirname(require.main.filename);

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
        var userPWD = base.md5(req.query.userPWD);
        var loginTime = req.query.loginTime;
        var sql = 'select * from administrators where loginname="' + userName + '" and password="' + userPWD + '"';
        var updateSql = 'update administrators set logintime="' + loginTime + '"  where loginname="' + userName + '"';
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
        var company = req.body.company;
        var address = req.body.address;
        var telephone = req.body.telephone;
        var fax = req.body.fax;
        var logo = "";
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
            + 'company="' + company + '",'
            + 'address="' + address + '",'
            + 'telephone="' + telephone + '",'
            + 'fax="' + fax + '",'
            + 'logo="' + logo + '",'
            + 'date="' + date + '"'
        query.sqlUpdate(req,res,sql,'保存成功','保存失败');
    },

    savecfgImg : function(req,res){

        upload(req,res,config.logoUrl,function(fields,imgurls){
            var logourl = imgurls[0].substr(imgurls[0].indexOf(config.logoUrl));
            var sql = 'update web_cfg set '
            + 'basehost="' + fields.basehost + '",' 
            + 'mainhost="' + fields.mainhost + '",'
            + 'hostname="' + fields.hostname + '",'
            + 'webname="' + fields.webname + '",'
            + 'imgurl="' + fields.imgurl + '",'
            + 'docurl="' + fields.docurl + '",'
            + 'docstyle="' + fields.docstyle + '",'
            + 'copyright="' + fields.copyright + '",'
            + 'keywords="' + fields.keywords + '",'
            + 'webdsc="' + fields.webdsc + '",'
            + 'beian="' + fields.beian + '",'
            + 'company="' + fields.company + '",'
            + 'address="' + fields.address + '",'
            + 'telephone="' + fields.telephone + '",'
            + 'fax="' + fields.fax + '",'
            + 'logo="' + logourl + '",'
            + 'date="' + fields.date + '"'
            query.sqlUpdate(req,res,sql,'保存成功','保存失败');
        })
    },

    userList : function(req,res){
        var sql = 'select * from administrators  where level>' + global.user.level + ' limit 0,' +config.userListPageNum;
        query.query('select count(*) as records from administrators where level>' + global.user.level,function(perr,prows,pfields){
            pages = Math.ceil(prows[0].records/config.userListPageNum);
            query.sqlSelectRender(req,res,sql,'admin/userlist',pages);
        })
       
    },

     userListPage : function(req,res){
        var sql = 'select * from administrators  where level>' + global.user.level + ' limit 0,' +config.userListPageNum;
        var start = req.body.page*config.userListPageNum;
        var sql = 'select loginname,pseudonym,name,level,logintime from administrators  where level>' + global.user.level + ' limit ' + start + ',' + config.userListPageNum ;
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
            upload(req,res,config.uploadDir,function(fields,imgurls){
                var md5Pwd = base.md5(fields.loginPWD[0])
                query.sqlInsert(req,res,'insert into administrators values('
                    + '"'+ fields.loginID +'",'
                    + '"'+ fields.level +'",'
                    + '"'+ fields.name +'",'
                    + '"'+ md5Pwd +'",'
                    + '"'+ fields.pseudonym +'",'
                    + '"'+ imgurls +'",'
                    + '"'+ fields.email +'",'
                    + '"'+ fields.date +'"'
                    +')','添加成功!','添加失败!');
            });
        }else{  //无头像上传
            var md5Pwd = base.md5(req.body.loginPWD);
            query.sqlInsert(req,res,'insert into administrators values('
                + '"'+ req.body.loginID +'",'
                + '"'+ req.body.level +'",'
                + '"'+ req.body.name +'",'
                + '"'+ md5Pwd +'",'
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
        var md5OldPwd = base.md5(req.body.oldPWD);
        var sql = 'select * from administrators where loginname="' + req.body.uloginID + '" and password="' + md5OldPwd + '"';
        if(req.body.newPWD){
            var md5NewPwd = base.md5(req.body.newPWD);
            query.query(sql,function(err,rows,fields){
                if(rows.length>0){
                    if(rows[0].password != md5NewPwd){
                        var usql = 'update administrators set level="' + req.body.ulevel + '",name="' + req.body.uname + '",password="' + md5NewPwd + '",pseudonym="' + req.body.upseudonym + '" where loginname="' + req.body.uloginID + '"';
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
                    id : '',
                    title: '',
                    diy: '',
                    tag: '',
                    weight: '',
                    writer: '',
                    type: '',
                    keywords: '',
                    description: '',
                    themeimg : '',
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
        upload(req,res,config.articleThemeImgDir,function(fields,themeimg){
            themeimg[0] = themeimg[0] ? themeimg[0] : fields.srcthemeImg;
            if( !fields.art_id[0]){
               if(fields.content.toString().indexOf('data:image') == -1){

                    var tag = fields.art_tag[0].replace(/，/ig,',');
                    var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                    var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                    var click = fields.art_click.toString().length ? fields.art_click : 0;
                    var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                    var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,themeimg,content,needwatermark,notpost,click,date) values('
                        + '"' + fields.art_title + '",' 
                        + '"' + fields.art_diy + '",' 
                        + '"' + tag + '",' 
                        + weight + ',' 
                        + '"' + fields.art_writer + '",' 
                        + '"' + fields.art_type + '",' 
                        + '"' + fields.art_keywords + '",' 
                        + '"' + fields.art_description + '",' 
                        + '"' + themeimg[0] + '",' 
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
                                        ['预览','/detail?id='+rows.insertId],
                                        ['管理文章','/adminArticleList']
                                    ]
                                }
                            })
                        }
                    })
               }else{
                    base.saveBase64ToImg(req,res,config.articleImgDir,fields,'content',function(imgurls){
                       base.replaceBase64Src(req,res,fields,'content',imgurls,function(req,res,fields){
                            var tag = fields.art_tag[0].replace(/，/ig,',');
                            var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                            var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                            var click = fields.art_click.toString().length ? fields.art_click : 0;
                            var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
            
                            if(needwatermark){
                                for(var i=0;i<imgurls.length;i++){
                                    base.water(req,res,mainPath,imgurls[i]);
                                }
                            }

                            var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,themeimg,content,needwatermark,notpost,click,date) values('
                                + '"' + fields.art_title + '",' 
                                + '"' + fields.art_diy + '",' 
                                + '"' + tag + '",' 
                                + weight + ',' 
                                + '"' + fields.art_writer + '",' 
                                + '"' + fields.art_type + '",' 
                                + '"' + fields.art_keywords + '",' 
                                + '"' + fields.art_description + '",'
                                + '"' + themeimg[0] + '",' 
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
                                                ['预览','/detail?id='+rows.insertId],
                                                ['管理文章','/adminArticleList']
                                            ]
                                        }
                                    })
                                }
                            })
                       });
                   });
               }

            }else{
                
                if(fields.content.toString().indexOf('data:image') == -1){
                    var tag = fields.art_tag[0].replace(/，/ig,',');
                    var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                    var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                    var click = fields.art_click.toString().length ? fields.art_click : 0;
                    var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                    
                    var sql = 'update article set '
                            + 'title="' + fields.art_title + '",' 
                            + 'diy="' + fields.art_diy + '",' 
                            + 'tag="' + tag + '",' 
                            + 'weight=' + weight + ',' 
                            + 'writer="' + fields.art_writer + '",' 
                            + 'type="' + fields.art_type + '",' 
                            + 'keywords="' + fields.art_keywords + '",' 
                            + 'description="' + fields.art_description + '",' 
                            + 'themeimg="' + themeimg[0] + '",' 
                            + 'content=\'' +fields.content + '\',' 
                            + 'needwatermark=' + needwatermark + ',' 
                            + 'notpost=' + fields.notpost+ ',' 
                            + 'click=' + click + ',' 
                            + 'date="' + date + '"'
                            + ' where id=' + fields.art_id
                    
                    query.query(sql,function(err,rows,sqlfield){
                        if(err){
                            console.log('修改文章失败,错误信息：' + err);
                            res.render('admin/message',{
                                status : 1,
                                data : {
                                        title : '修改文章失败',
                                        linkData : [
                                            ['发布新文章','/adminArticle'],
                                            ['管理文章','/adminArticleList']
                                    ]
                                }
                            })
                        }else{
                            console.log('修改文章成功');
                            res.render('admin/message',{
                                status : 0,
                                data : {
                                    title : '修改文章成功',
                                    linkData : [
                                        ['发布新文章','/adminArticle'],
                                        ['查看更改','/adminArticle?id='+fields.art_id],
                                        ['预览','/detail?id='+fields.art_id],
                                        ['管理文章','/adminArticleList']
                                    ]
                                }
                            })
                        }
                    })
               }else{
                    base.saveBase64ToImg(req,res,config.articleImgDir,fields,'content',function(imgurls){
                       base.replaceBase64Src(req,res,fields,'content',imgurls,function(req,res,fields){
                            var tag = fields.art_tag[0].replace(/，/ig,',');
                            var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                            var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                            var click = fields.art_click.toString().length ? fields.art_click : 0;
                            var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                            
                            if(needwatermark){
                                for(var i=0;i<imgurls.length;i++){
                                    base.water(req,res,mainPath,imgurls[i]);
                                }
                            }

                            var sql = 'update article set '
                                    + 'title="' + fields.art_title + '",' 
                                    + 'diy="' + fields.art_diy + '",' 
                                    + 'tag="' + tag + '",' 
                                    + 'weight=' + weight + ',' 
                                    + 'writer="' + fields.art_writer + '",' 
                                    + 'type="' + fields.art_type + '",' 
                                    + 'keywords="' + fields.art_keywords + '",' 
                                    + 'description="' + fields.art_description + '",' 
                                    + 'themeimg="' + themeimg[0] + '",' 
                                    + 'content=\'' +fields.content + '\',' 
                                    + 'needwatermark=' + needwatermark + ',' 
                                    + 'notpost=' + fields.notpost+ ',' 
                                    + 'click=' + click + ',' 
                                    + 'date="' + date + '"'
                                    + ' where id=' + fields.art_id
                            
                            query.query(sql,function(err,rows,sqlfield){
                                if(err){
                                    console.log('修改文章失败,错误信息：' + err);
                                    res.render('admin/message',{
                                        status : 1,
                                        data : {
                                                title : '修改文章失败',
                                                linkData : [
                                                    ['发布新文章','/adminArticle'],
                                                    ['管理文章','/adminArticleList']
                                            ]
                                        }
                                    })
                                }else{
                                    console.log('修改文章成功');
                                    res.render('admin/message',{
                                        status : 0,
                                        data : {
                                            title : '修改文章成功',
                                            linkData : [
                                                ['发布新文章','/adminArticle'],
                                                ['查看更改','/adminArticle?id='+fields.art_id],
                                                ['预览','/detail?id='+fields.art_id],
                                                ['管理文章','/adminArticleList']
                                            ]
                                        }
                                    })
                                }
                            })
                       });
                   });
               }

            }
        })
        
    },

    columnList : function(req,res){
        var sql = 'select * from web_column';
        query.query(sql,function(err,rows){
            if(err){
                console.log('进入"网站栏目管理"出错,错误信息：' + err);
                res.redirect('/adminNotFound');
            }else{
                
               var treeHtml = tree(rows,'id','parentid');
                res.render('admin/columnlist',{
                    status : 0,
                    dataHtml : treeHtml
                }); 
           }
        })
        
    },

    delColumn : function(req,res){
        var sql = 'delete from web_column where id=' + req.body.id + ' or parentid=' + req.body.id;
        query.sqlDelete(req,res,sql,'删除成功','删除失败');
    },

    column : function(req,res){
        if(req.query.id){
            if(req.query.handle == 'add'){
                res.render('admin/column',{
                'title' : '增加子栏目',
                'parentId' : req.query.id,
                'handle' : req.query.handle,
                'data' : [{
                        colname : '',
                        hide : '',
                        rank : '',
                        sort : 50
                    }]
                });
            }else if(req.query.handle == 'update'){
                query.query('select * from web_column where id=' + req.query.id,function(err,rows){
                    if(err){
                        console.log('进入"修改栏目"页面出错,错误休息：' + error);
                        es.redirect('/adminNotFound');
                    }else{
                        res.render('admin/column',{
                            'title' : '修改栏目',
                            'parentId' : req.query.id,
                            'handle' : req.query.handle,
                            'data' : rows
                        });  
                    }
                    
                })
            }
        }else{
            res.render('admin/column',{
                'title' : '增加顶级栏目',
                'parentId' : 0,
                'handle' : req.query.handle,
                'data' : [{
                        colname : '',
                        hide : '',
                        rank : '',
                        sort : 50
                    }]
            });
        }
    },

    saveColumn : function(req,res){
        if(req.query.handle == 'add'){
            var parentId = req.query.parentId ? req.query.parentId : 0;
            req.query.colsort = req.query.colsort ? req.query.colsort : 50;
            var sql = 'insert into web_column (colname,hide,rank,sort,parentid) values ('
                + '"' + req.query.colname + '"'
                + ',' + req.query.colhide 
                + ',' + req.query.rank + ''
                + ',' + req.query.colsort
                + ',"' + parentId + '"'
                + ')';
            query.query(sql,function(err,rows){
                if(err){
                    console.log('保存失败，错误信息：' + err);
                    res.render('admin/message',{
                        status : 1,
                        data : {
                            title : '添加栏目失败',
                            linkData : [
                                ['栏目管理','/adminColumnList']
                            ]
                        }
                    })
                }else{
                   res.render('admin/message',{
                        status : 0,
                        data : {
                            title : '添加栏目成功',
                            linkData : [
                                ['继续添加同级栏目','/adminColumn?id=' + parentId + '&handle=add'],
                                ['添加子栏目','/adminColumn?id=' + rows.insertId + '&handle=add'],
                                ['修改栏目','/adminColumn?id='+ rows.insertId +'&handle=update'],
                                ['栏目管理','/adminColumnList']
                            ]
                        }
                    }) 
                }
            })
        }else if(req.query.handle == 'update'){

            var parentId = req.query.parentId;
            req.query.colsort = req.query.colsort ? req.query.colsort : 50;
            var sql = 'update web_column  set '
                    + 'colname="' + req.query.colname + '"'
                    + ',hide=' + req.query.colhide 
                    + ',rank=' + req.query.rank + ''
                    + ',sort=' + req.query.colsort
                    + ',parentid="' + parentId + '"'
                
            query.query(sql,function(err,rows){
                if(err){
                    console.log('修改栏目失败，错误信息：' + err);
                    res.render('admin/message',{
                        status : 1,
                        data : {
                            title : '修改栏目失败',
                            linkData : [
                                ['栏目管理','/adminColumnList']
                            ]
                        }
                    })
                }else{
                   res.render('admin/message',{
                        status : 0,
                        data : {
                            title : '修改栏目成功',
                            linkData : [
                                ['栏目管理','/adminColumnList']
                            ]
                        }
                    }) 
                }
            })
        }
    },

    moveColumn : function(req,res){
        var sql = "select id,colname from web_column where id!=" + req.query.id + ' and parentid!=' + req.query.id;
        query.query(sql,function(err,rows,fields){
            if(err){
                console.log('数据库操作失败，请检查sql语句，错误信息：' + err);
                res.redirect('/adminNotFound');
                return ;
            }else{
                    res.render('admin/movecolumn',{
                        data : rows,
                        colname : req.query.colname,
                        parentId : req.query.parentId,
                        colId : req.query.id
                    })
                
            }

        })
    },

    saveMoveColumn : function(req,res){
        var sql = "update web_column set parentid=" + req.query.parentId + ' where id=' + req.query.colId;
        query.query(sql,function(err,rows){
            if(err){
                console.log('移动栏目失败！错误信息:'+err);
                res.render('admin/message',{
                    status : 1,
                    data : {
                        title : '移动栏目失败',
                        linkData : [
                            ['栏目管理','/adminColumnList']
                        ]
                    }
                }) 
            }else{
                res.render('admin/message',{
                    status : 0,
                    data : {
                        title : '移动栏目成功',
                        linkData : [
                            ['栏目管理','/adminColumnList']
                        ]
                    }
                }) 
            }
        })
    },

    navList : function(req,res){
        var sql = 'select * from nav '+  'ORDER BY id ' +' limit 0,' + config.navListPageNum  ;
        query.query('select count(*) as records from nav',function(perr,prows,pfields){
            pages = Math.ceil(prows[0].records/config.navListPageNum);
            query.sqlSelectRender(req,res,sql,'admin/navlist',pages);
        })
       
    },

     navListPage : function(req,res){
        var start = req.body.page * config.navListPageNum;
        var sql = 'select * from nav ORDER BY id limit ' + start + ',' + config.navListPageNum ;
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

    navHandle : function(req,res){
        if(req.body.handle == 'delete'){
            var sql = 'delete from nav where id=' + req.body.navId;
            query.sqlDelete(req,res,sql,'删除导航成功','删除导航失败');
        }else if(req.body.handle == 'update'){
            var sql = 'update nav set ' + req.body.field +'=' + req.body.fieldVal + ' where id=' + req.body.navId;
            query.sqlUpdate(req,res,sql,'修改成功','修改失败');
        }
    },

    addNav : function(req,res){
        var sql = 'select * from web_column';
        query.query(sql,function(err,rows){
            if(err){
                console.log('进入"网站栏目管理"出错,错误信息：' + err);
                res.redirect('/adminNotFound');
            }else{
                
               var treeHtml = tree(rows,'id','parentid',1);
               if(req.query.id){
                    query.query('select * from nav where id=' + req.query.id,function(errc,rowsc){
                            if(err){
                            console.log('进入"网站栏目管理"出错,错误信息：' + err);
                            res.redirect('/adminNotFound');
                        }else{
                
                            res.render('admin/nav',{
                                title : '编辑导航',
                                dataHtml : treeHtml,
                                data : rowsc
                            });
                        }
                    })
                    
                }else{
                    res.render('admin/nav',{
                        title : '添加导航',
                        dataHtml : treeHtml,
                        data : [{
                                id: '',
                                navname: '',
                                navlink: '',
                                navsort: 50,
                                navshow: 1,
                                navwindow: 0,
                                navpos: 0,
                                navcolid: '' 
                            } ]
                    });
                }

           }
        })

    },

    saveNav : function(req,res){
        var navSort = req.query.navSort ? req.query.navSort : 50;
        var navShow = req.query.navShow ? req.query.navShow : 1;
        var navWindow = req.query.navWindow ? req.query.navWindow : 0;
        var navId = req.query.navSys ? req.query.navSys : '';
        if(!req.query.updateId.length){
            var sql = 'insert into nav (navname,navlink,navsort,navshow,navwindow,navpos,navcolid) values('
            + '"' + req.query.navName + '",'
            + '"' + req.query.navLink + '",'
            + navSort + ','
            + navShow + ','
            + navWindow + ','
            + req.query.navPos + ','
            + '"' + navId + '"'
            + ')';

            query.query(sql,function(err,rows){
                if(err){
                    console.log('添加导航失败！错误信息：' + err);
                    res.render('admin/message',{
                        status : 1,
                        data : {
                            title : '添加导航失败',
                            linkData : [
                                ['自定义导航栏','/adminNavList']
                            ]
                        }
                    }) 
                }else{
                    res.render('admin/message',{
                        status : 0,
                        data : {
                            title : '添加导航成功',
                            linkData : [
                                ['继续添加导航','/adminAddNav'],
                                ['自定义导航栏','/adminNavList']
                            ]
                        }
                    }) 
                }
            })
        }else{
            var sql = 'update nav set '
            + 'navname="' + req.query.navName + '",'
            + 'navlink="' + req.query.navLink + '",'
            + 'navsort=' + navSort + ','
            + 'navshow=' + navShow + ','
            + 'navwindow=' + navWindow + ','
            + 'navpos=' + req.query.navPos + ','
            + 'navcolid="' + navId + '"'
            + ' where id=' + req.query.updateId;
            
            query.query(sql,function(err,rows){
                if(err){
                    console.log('编辑导航失败！错误信息：' + err);
                    res.render('admin/message',{
                        status : 1,
                        data : {
                            title : '编辑导航失败',
                            linkData : [
                                ['自定义导航栏','/adminNavList']
                            ]
                        }
                    }) 
                }else{
                    res.render('admin/message',{
                        status : 0,
                        data : {
                            title : '编辑导航成功',
                            linkData : [
                                ['继续编辑导航','/adminAddNav'],
                                ['自定义导航栏','/adminNavList']
                            ]
                        }
                    }) 
                }
            })
        }
        
        
    },

    bannerList : function(req,res){
        var sql = 'select banner from web_cfg';
        query.query(sql,function(err,rows){
            if(rows[0].banner){
                var bannerArr = rows[0].banner.split(',');
                for(var i=0;i<bannerArr.length;i++){
                    if(!bannerArr[i]){
                        bannerArr.splice(i,1);
                    }
                }
                res.render('admin/bannerlist',{
                    banner : bannerArr
                });
            }else{
                res.render('admin/bannerlist',{
                    banner : ''
                }); 
            }
            
        })
        
    },

    delBanner : function(req,res){
        var bannerUrl = req.body.bannerUrl;
        var banner = req.body.banner;
        var reg =new RegExp(',*' +bannerUrl);
        var banner = banner.replace(reg,'');
        var sql = 'update web_cfg set banner="' + banner + '"';
        query.sqlUpdate(req,res,sql,'操作成功','操作失败');
    },

    addBanner : function(req,res){
        var sql = 'select banner from web_cfg';
        query.query(sql,function(err,rows){
            var updateStr = req.query.updateStr;
            if(!updateStr){
                updateStr = '';
            }
            res.render('admin/banner',{
                banner : rows[0].banner,
                updateStr : updateStr
            });
            
        })
    },

    saveBanner : function(req,res){
        upload(req,res,config.bannerImgsUrl,function(fields,imgurls){
            for(var i=0;i<imgurls.length;i++){
                imgurls[i] = imgurls[i].substr(imgurls[i].indexOf(config.bannerImgsUrl));
            }

            if(!fields.updateStr[0]){
               if(fields.banner[0].length){
                    var sql = 'update web_cfg set banner="' + fields.banner + ',' + imgurls.toString() + '"';
                }else{
                    var sql = 'update web_cfg set banner="' + imgurls.toString() + '"';
                }
            }else{
                var banner = fields.banner[0].replace(fields.updateStr[0],imgurls.toString());
                var sql = 'update web_cfg set banner="' + banner + '"';
            }
            
            var linkData = [
                                    ['继续添加轮播图','/adminAddBanner'],
                                    ['轮播图列表','/adminBannerList']
                                ]
                                
            query.query(sql,function(err,rows){
                    if(err){
                        console.log('保存失败，错误信息：' + err);
                        res.render('admin/message',{
                            status : 1,
                            data : {
                                title : '保存轮播图失败',
                                linkData : [
                                    ['轮播图列表','/adminBannerList'],
                                ]
                            }
                        })
                    }else{
                       res.render('admin/message',{
                            status : 0,
                            data : {
                                title : '保存轮播图成功',
                                linkData : linkData
                            }
                        }) 
                    }

                });
              
        })

    },



    loginOut : function(req,res){
        global.user = '';
        res.redirect('/admin');
    },

    notfound : function(req,res){
        res.render('admin/404');
    }
}