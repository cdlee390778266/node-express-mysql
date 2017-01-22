/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
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
            upload(req,res,config.uploadDir,function(fields,imgurls){
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
                    var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                    var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                    var click = fields.art_click.toString().length ? fields.art_click : 0;
                    var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                    var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,themeimg,content,needwatermark,notpost,click,date) values('
                        + '"' + fields.art_title + '",' 
                        + '"' + fields.art_diy + '",' 
                        + '"' + fields.art_tag + '",' 
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
                            var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                            var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                            var click = fields.art_click.toString().length ? fields.art_click : 0;
                            var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                            var sql = 'insert into article (title,diy,tag,weight,writer,type,keywords,description,themeimg,content,needwatermark,notpost,click,date) values('
                                + '"' + fields.art_title + '",' 
                                + '"' + fields.art_diy + '",' 
                                + '"' + fields.art_tag + '",' 
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
                    var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                    var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                    var click = fields.art_click.toString().length ? fields.art_click : 0;
                    var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                    var sql = 'update article set '
                            + 'title="' + fields.art_title + '",' 
                            + 'diy="' + fields.art_diy + '",' 
                            + 'tag="' + fields.art_tag + '",' 
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
                            var needwatermark = fields.art_needwatermark ? fields.art_needwatermark : 0;
                            var weight = fields.art_weight.toString().length ? fields.art_weight : 0;
                            var click = fields.art_click.toString().length ? fields.art_click : 0;
                            var date = fields.art_date.toString().length ? fields.art_date : base.format(new Date(),'yyyy-MM-dd hh:mm:ss');
                            var sql = 'update article set '
                                    + 'title="' + fields.art_title + '",' 
                                    + 'diy="' + fields.art_diy + '",' 
                                    + 'tag="' + fields.art_tag + '",' 
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

    column : function(req,res){
        var sql = 'select * from web_column order by parentid,ttid';
        query.query(sql,function(err,rows){
            if(err){
                console.log('进入"网站栏目管理"出错,错误信息：' + err);
                res.redirect('/adminNotFound');
            }else{
                console.log(rows);
                res.render('admin/column',{
                    status : 0,
                    data : rows
                }); 
           }
        })
        
    },

    addColumn : function(req,res){
        res.render('admin/addcolumn',{
            'parentId' : 0
        });
    },

    saveColumn : function(req,res){
        var parentId = req.query.parentId ? req.query.parentId : 0;
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
                            ['栏目管理','/adminColumn']
                        ]
                    }
                })
            }else{
               res.render('admin/message',{
                    status : 0,
                    data : {
                        title : '添加栏目成功',
                        linkData : [
                            ['继续添加顶级栏目','/adminAddColumn'],
                            ['栏目管理','/adminColumn']
                        ]
                    }
                }) 
            }
        })
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