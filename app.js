var express = require('express');
var bodyParser = require("body-parser");  
var session = require('express-session');
var base = require('./node/common/base');
var router = require('./node/tpl/router');
var adminRouter = require('./node/admin/router');
var app = express();

app.locals.dateformat = base.dateFormat;
    
app.use(express.static(__dirname));
app.set('views','./view');
//app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 60*1000*60*6 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
 }));


app.get('/',router.router.index);
app.get('/index',router.router.index);
app.get('/cat',router.router.cat);
app.get('/detail',router.router.detail);
app.get('/list',router.router.list);
app.get('/notfound',router.router.notfound);

//后台
// app.use(function(req,res,next){
//     if(!global.user && req.url != '/admin' && req.url.indexOf('/adminCheck') == -1 ){
//         res.redirect('/admin');
//     }else{
//         next();
//     }
// });

app.get('/admin',adminRouter.router.login);
app.get('/adminCheck',adminRouter.router.check);
app.get('/adminIndex',adminRouter.router.index);
app.get('/adminCfg',adminRouter.router.cfg);
app.post('/adminSaveCfg',adminRouter.router.savecfg);
app.post('/adminSaveCfgImg',adminRouter.router.savecfgImg);

app.get('/adminUserList',adminRouter.router.userList);
app.post('/adminUserListPage',adminRouter.router.userListPage);
app.post('/adminAddUser',adminRouter.router.addUser);
app.get('/adminAddUser_checkID',adminRouter.router.adduser_checkID);
app.post('/adminDelUser',adminRouter.router.delUser);
app.post('/adminUpdateUser',adminRouter.router.updateUser);

app.get('/adminArticleList',adminRouter.router.articleList);
app.post('/adminArticleListPage',adminRouter.router.articleListPage);
app.get('/adminArticle',adminRouter.router.article);
app.post('/adminSaveArticle',adminRouter.router.saveArticle);
app.post('/adminDelArticle',adminRouter.router.delArticle);

app.get('/adminColumn',adminRouter.router.column);
app.get('/adminAddColumn',adminRouter.router.addColumn);
app.get('/adminSaveColumn',adminRouter.router.saveColumn);

app.get('/adminBannerList',adminRouter.router.bannerList);
app.post('/adminDelBanner',adminRouter.router.delBanner);
app.get('/adminAddBanner',adminRouter.router.addBanner);
app.post('/adminSaveBanner',adminRouter.router.saveBanner);

app.get('/adminLoginOut',adminRouter.router.loginOut);
app.get('/adminNotFound',adminRouter.router.notfound);






app.listen(888,function(){
    console.log('server runnning at 127.0.0.1:888');
})
