/* 
* @Author: Lee
* @Date:   2016-12-29 14:15:13
    图片储存 npm install multiparty
* @Last Modified time: 2017-01-18 11:15:26
*/
var fs = require('fs');
var multiparty = require('multiparty');
var path = require('path');  
var config = require('./config');
var base = require('./base');


var upload = function(req, res,uploaddir,callback){

    //项目根目录
    var uploadDir = path.dirname(require.main.filename) + uploaddir;

    if(!fs.existsSync(uploadDir)){
        if(!fs.mkdirSync(uploadDir)){
           console.log("目录创建成功。");
        }else{
           console.log("目录创建失败!");
        }
    }

    if (req.method === 'POST') {
  
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = uploadDir;
  
    //设置单文件大小限制
    form.maxFilesSize = 200* 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    
    form.parse(req, function(err, fields, files) {
    	
       if(err){
			console.log('图片上传出错!' + err);
			res.json({
			    status : 1,
			    data : '图片上传出错!'
			});
        }else{
        	if(files){
                var imgurls  = [];
        		for(var i in files){
        			
        			for(var j=0;j<files[i].length;j++){

                        if(files[i][j].originalFilename){
        				//同步重命名文件名
        			 	var date = base.format(new Date(),'yyyy-MM-dd hh-mm-ss_');
        			 	fs.renameSync(files[i][j].path,uploadDir +'/' + date + files[i][j].originalFilename);
        			 	console.log('图片上传成功!');
                        imgurls.push(uploadDir +'/' + date + files[i][j].originalFilename);
                        }
        			}
        		}
                callback(fields,imgurls);
        	}else{
        		console.log('图片上传出错!');
				res.json({
				    status : 1,
				    data : '图片上传出错!'
				});
        	}
      
      }
      
    });
 
    return;
   }
  };
  
  module.exports = upload;