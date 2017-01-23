/* 
* @Author: Lee
* @Date:   2016-12-22 13:35:33
*/

var query = require('../admin/mysql');
var tplQuery = require('./mysql');
var base = require('../common/base');
var upload = require('../common/saveImgs');
var config = require('../common/config');

//头部数据
var header = [
                {
                    key : '首页',
                    child : false,
                    href : '/index'
                },
                {
                    key : '关于企业',
                    child : true,
                    data : [[2 ,'www.baidus.com']]
                },
                 {
                    key : '解决方案',
                    child : true,
                    data : [[3 ,'www.baidus.com']]
                },
                {
                    key : '产品展示',
                    child : true,
                    data : [[4 ,'www.baidus.com']]
                },
                {
                    key : '服务与支持',
                    child : true,
                    data : [[5 ,'www.baidus.com']]
                },
                {
                    key : '新闻动态',
                    child : true,
                    data : [[6 ,'www.baidus.com']]

                },
                {
                    key : '联系我们',
                    child : true,
                    data : [[7 ,'www.baidus.com']]
                },
            ]


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
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){

            res.render('tpls/index',{

                header : header,

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
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){

            res.render('tpls/cat',{

                header : header,

                left : {
                    product : {
                        title :['产品展示','Product display'],
                        liData : [
                            ['食品化工机械','http://www.baidu.com','active'],
                            ['制药设备','http://www.baidu.com'],
                            ['PE化粪池','http://www.baidu.com'],
                            ['方形-保温水箱','http://www.baidu.com'],
                            ['水箱封盖及半成品','http://www.baidu.com']
                        ]
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
                    }
                ]
            tplQuery.sqlSelectAll(req,res,sqlArr,function(data){
               if(!data.article.length){
                    res.redirect('/notfound');
                    return ;
               }

               data.article[0].tag = data.article[0].tag.split(',');

                res.render('tpls/detail',{

                    header : header,

                    left : {
                        product : {
                            title :['产品展示','Product display'],
                            liData : [
                                ['食品化工机械','http://www.baidu.com','active'],
                                ['制药设备','http://www.baidu.com'],
                                ['PE化粪池','http://www.baidu.com'],
                                ['方形-保温水箱','http://www.baidu.com'],
                                ['水箱封盖及半成品','http://www.baidu.com']
                            ]
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
                    }
                ]
        tplQuery.sqlSelectAll(req,res,sqlArr,function(data){

            res.render('tpls/list',{

            header : header,

            left : {
                product : {
                    title :['产品展示','Product display'],
                    liData : [
                        ['食品化工机械','http://www.baidu.com','active'],
                        ['制药设备','http://www.baidu.com'],
                        ['PE化粪池','http://www.baidu.com'],
                        ['方形-保温水箱','http://www.baidu.com'],
                        ['水箱封盖及半成品','http://www.baidu.com']
                    ]
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