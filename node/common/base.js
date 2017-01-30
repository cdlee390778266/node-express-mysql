/* 
* @Author: lee
* @Date:   2016-12-26 17:11:51
* 
* @Last Modified time: 2017-01-20 00:17:36
*/

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */   
var fs = require('fs');
var path = require('path');  
var config = require('./config');
var wateImages = require('images');
var crypto = require('crypto');  //加载crypto库

var dateFormat=function(fmt) {

    var fmtObj = new Date(fmt);      
    var year=fmtObj.getFullYear();
    var month=fmtObj.getMonth()+1;
    var date=fmtObj.getDate();
    var hour=fmtObj.getHours();
    var minute=fmtObj.getMinutes();
    var second=fmtObj.getSeconds();
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;         
} 

var format = function (obj,fmt) { 
    var o = {
        "M+": obj.getMonth() + 1, //月份 
        "d+": obj.getDate(), //日 
        "h+": obj.getHours(), //小时 
        "m+": obj.getMinutes(), //分 
        "s+": obj.getSeconds(), //秒 
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度 
        "S": obj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}

var imgurls = [];

var saveImg = function(imgData,uploadDir,callback){

    var uploadImgDir = path.dirname(require.main.filename) + uploadDir;
    if(!fs.existsSync(uploadImgDir)){
        if(!fs.mkdirSync(uploadImgDir)){
           console.log("目录创建成功。");
        }else{
           console.log("目录创建失败!");
        }
    }

    imgurls = [];
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/g, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var imgname = format(new Date(),'yyyyMMddhhmmss') + Math.ceil(Math.random()*1000) + '.png';
        var imgurl = uploadImgDir + '/' + imgname;
        fs.writeFile(imgurl, dataBuffer, function(err) {
            if(err){
              console.log(err);
              res.end('保存失败');
            }else{
              console.log("保存成功！");
              imgurls.push(config.articleImgDir + '/' + imgname);
              if(typeof callback == 'function'){
                callback(imgurls);
              }
            }
        });
}
var saveBase64ToImg = function(req,res,uploadDir,fields,field,callback){
        imgurl = [];
        //接收前台POST过来的base64
        var contentData = fields[field][0];
        //过滤data:URL
        var base64Data = contentData.match(/src\s*=\s*[\"\']\s*data:image([^\"\']*)[\"\']/g);
        
        for(var i=0;i<base64Data.length;i++){
            var srcData = base64Data[i].match(/[\"\']([^\"\']*)[\"\']/);
            if(i == base64Data.length-1){
                saveImg(srcData[1],uploadDir,callback);
            }else{
                saveImg(srcData[1],uploadDir);
            }
            
        }
        
}

var replaceBase64Src = function(req,res,fields,field,imgurls,callback){
        var contentData = fields[field][0];

        //过滤data:URL
        var base64Data = contentData.match(/src\s*=\s*[\"\']\s*data:image\/\w+;base64,([^\"\']*)[\"\']/g);
        for(var i=0;i<base64Data.length;i++){
            
           contentData = contentData.replace(base64Data[i],'src="'+imgurls[i] + '"');      
        }
        fields[field][0] = contentData;
        callback(req,res,fields);
}

var water = function(req,res,mainPath,imageUrl){
    var watermarkImg = wateImages(mainPath +'/view/admin/image/water.png');
    var sourceImg = wateImages(mainPath + imageUrl);
    // 比如放置在右下角，先获取原图的尺寸和水印图片尺寸
    var sWidth = sourceImg.width();
    var sHeight = sourceImg.height();
    var wmWidth = watermarkImg.width();
    var wmHeight = watermarkImg.height();
    wateImages(sourceImg)
    // 设置绘制的坐标位置，右下角距离 40px
    .draw(watermarkImg, sWidth - wmWidth - 40, sHeight - wmHeight - 40)
    // 保存格式会自动识别
    .save(mainPath + imageUrl);
}

var md5 = function(content){
    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(content);
    var d = md5.digest('hex');  //加密后的值d
    return d;
}


module.exports = {
    'dateFormat' : dateFormat,
    'format' : format,
    saveBase64ToImg : saveBase64ToImg,
    replaceBase64Src : replaceBase64Src,
    water : water,
    md5 : md5
}      