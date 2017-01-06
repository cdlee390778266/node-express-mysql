//创建配置不存在的路径

//文章图片存放路径 
var uploadImgDir = path.dirname(require.main.filename) + config.articleImgDir;   //项目根路径

fs.exists(uploadImgDir, function(exists){
    if(!exists){
        fs.mkdir(uploadImgDir,function(err){
            if (err) {
                console.error(err);
                console.log("创建目录" + uploadImgDir + "失败!");
           }
           console.log("创建目录" + uploadImgDir + "成功。");
        })
    }
})