/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
*/

var query = require('../admin/mysql');
var tplQuery = require('./mysql');
var base = require('../common/base');
var upload = require('../common/saveImgs');
var config = require('../common/config');

var getNavData = function(nav,col){
    var dataObj = {};
    for(var i=0;i<nav.length;i++ ){
        if(!dataObj[nav[i].id]){
            dataObj[nav[i].id] = {};
            dataObj[nav[i].id].data = nav[i];
            dataObj[nav[i].id].cData = [];
        }
        for(var j=0;j<col.length;j++){
            if(col[j].parentid == nav[i].navcolid){
                dataObj[nav[i].id].cData.push(col[j]);
            }   
        }
    }
    return dataObj;
}

exports.router = {
    index : function(req,res){

        var sqlArr = [
                    {
                        sql : 'select * from web_cfg',
                        field : 'cfg'
                    },
                    {
                        sql : 'select * from article order by id desc  limit 5 ',
                        field : 'article'
                    },
                    {
                        sql : 'select * from nav where navshow=1  and navpos=0' ,
                        field : 'nav'
                    },
                    {
                        sql : 'select * from web_column ' ,
                        field : 'col'
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){
            var navObj = getNavData(data.nav,data.col);
        
            res.render('tpls/index',{

                nav : navObj,

                product : {
                    flag : true,
                    title : ['产品展示','Product display'],
                    data : data.article
                },

                about : {
                    flag : true,
                    title : ['关于我们','About us'],
                    data : []
                },
                
                iNews : {
                    flag : true,
                    title : ['关于我们','About us'],
                    hot : {
                        title : 'About us',
                        describe : '多功能提取罐适用于中草药、植物、动物、食品、生物药，化工行业...',
                        img : 'view/tpls/images/news.jpg',
                        href : '/index'
                    },
                    liData : [
                        {
                            title : '在位清洗系统（cip）工作原理',
                            date : '2016-03-24',
                            href : 'httt://www.jingdong.com'
                        },
                        {
                            title : '服务计划',
                            date : '2016-03-24',
                            href : 'httt://www.jingdong.com'
                        },
                        {
                            title : '服务计划',
                            date : '2016-03-24',
                            href : 'httt://www.jingdong.com'
                        }
                    ] 
                },
                
                cfg : data.cfg

            });
        })


    },
    cat : function(req,res){
        var sqlArr = [
                    {
                        sql : 'select * from web_cfg',
                        field : 'cfg'
                    },
                    {
                        sql : 'select * from article order by id desc  limit 5 ',
                        field : 'article'
                    },
                    {
                        sql : 'select * from nav where navshow=1  and navpos=0' ,
                        field : 'nav'
                    },
                    {
                        sql : 'select * from web_column ' ,
                        field : 'col'
                    },
                    {
                        sql : 'select navname,navlink from nav where navshow=1  and navpos=1' ,
                        field : 'left'
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){
            var navObj = getNavData(data.nav,data.col);

            res.render('tpls/cat',{

                nav : navObj,

                left : {
                    product : {
                        title :['产品展示','Product display'],
                        liData : data.left,
                        activeUrl : req.url 
                    },
                    contact : {
                        title :['联系我们','Contact us'],
                        txt : [data.cfg[0].company,'联系电话：'+data.cfg[0].telephone,'地址：'+data.cfg[0].address]
                    }
                },

                tags : [
                    ['首页','/index'],
                    ['产品展示','/index'],
                    ['水处理设备','/index']
                ],

               product : data.article,

                cfg : data.cfg,

            });
        })
        
    },
    detail : function(req,res){
        if(req.query.id){
            var sqlArr = [
                    {
                        sql : 'select * from web_cfg',
                        field : 'cfg'
                    },
                    {
                        sql : 'select * from article where id=' + req.query.id,
                        field : 'article'
                    },
                    {
                        sql : 'select * from nav where navshow=1  and navpos=0' ,
                        field : 'nav'
                    },
                    {
                        sql : 'select * from web_column ' ,
                        field : 'col'
                    },
                    {
                        sql : 'select navname,navlink from nav where navshow=1  and navpos=1' ,
                        field : 'left'
                    }
                ]
            tplQuery.sqlSelectAll(req,res,sqlArr,function(data){
               if(!data.article.length){
                    res.redirect('/notfound');
                    return ;
               }
               var navObj = getNavData(data.nav,data.col);

               data.article[0].tag = data.article[0].tag.split(',');

                res.render('tpls/detail',{

                    nav : navObj,

                    left : {
                        product : {
                            title :['产品展示','Product display'],
                            liData : data.left,
                            activeUrl : req.url
                        },
                        contact : {
                            title :['联系我们','Contact us'],
                            txt : [data.cfg[0].company,'联系电话：'+data.cfg[0].telephone,'地址：'+data.cfg[0].address]
                        }
                    },

                    tags : [
                        ['首页','/index'],
                        ['产品展示','/index'],
                        [data.article[0].title,'']
                    ],

                    detail : data.article,

                    cfg : data.cfg,
                    
        
                })
            })
            
        }else{
            res.redirect('/notfound');
        }
        
    },
    list : function(req,res){

        var sqlArr = [
                    {
                        sql : 'select * from web_cfg',
                        field : 'cfg'

                    },
                    {
                        sql : 'select id,title,date from article',
                        field : 'article'
                    },
                    {
                        sql : 'select * from nav where navshow=1  and navpos=0' ,
                        field : 'nav'
                    },
                    {
                        sql : 'select * from web_column ' ,
                        field : 'col'
                    },
                    {
                        sql : 'select navname,navlink from nav where navshow=1  and navpos=1' ,
                        field : 'left'
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){
            var navObj = getNavData(data.nav,data.col);

            res.render('tpls/list',{

            nav : navObj,

            left : {
                product : {
                    title :['产品展示','Product display'],
                    liData : data.left,
                    activeUrl : req.url
                },
                contact : {
                    title :['联系我们','Contact us'],
                    txt : [data.cfg[0].company,'联系电话：'+data.cfg[0].telephone,'地址：'+data.cfg[0].address]
                }
            },

            tags : [
                ['首页','/index'],
                ['产品展示','/index'],
                ['水处理设备','/index']
            ],

            news : data.article,

            cfg : data.cfg,
            
        });
        })
        
    },

    notfound : function(req,res){
        res.render('tpls/404');
    }
}