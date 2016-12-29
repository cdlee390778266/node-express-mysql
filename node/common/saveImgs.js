/* 
* @Author: Lee
* @Date:   2016-12-29 14:15:13
    图片储存 npm install multiparty
* @Last Modified time: 2016-12-29 18:16:54
*/
var fs = require('fs');
var multiparty = require('multiparty'); 
var config = require('./config')

 var upload = function(req, res){
    if (req.url === '/upload' && req.method === 'POST') {
    // 解析一个文件上传
    var form = new multiparty.Form();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "upload";
    //设置单文件大小限制
    form.maxFilesSize = 200* 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    
    form.parse(req, function(err, fields, files) {
      console.log(req)
      console.log(files);
      console.log(files.path);
      res.end();
      //同步重命名文件名
      // fs.renameSync(files.path,files.originalFilename);
      
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
    });
 
    return;
   }
  };
  
  module.exports = upload;