var express = require('express');
var bodyParser = require("body-parser");  
var router = require('./node/tpl/router');
var adminRouter = require('./node/admin/router');
var app = express();

app.use(express.static(__dirname));
app.set('views','./view');
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',router.router.index);
app.get('/index',router.router.index);
app.get('/cat',router.router.cat);
app.get('/detail',router.router.detail);
app.get('/list',router.router.list);


app.get('/admin',adminRouter.router.login);
app.get('/check',adminRouter.router.check);
app.get('/adminIndex',adminRouter.router.index);
app.get('/adminCfg',adminRouter.router.cfg);
app.post('/adminSaveCfg',adminRouter.router.savecfg);

app.listen(888,function(){
    console.log('server runnning at 127.0.0.1:888');
})
