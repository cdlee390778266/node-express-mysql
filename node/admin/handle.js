var express = require('express');
var app = express();
// app.set('views','')
app.get('/',function(req,res){
    console.log('go');
})
app.listen(888,function(){
    console.log('server runnning at 127.0.0.1:888');
})
