/* 
* @Author: lee
* @Date:   2016-12-26 17:11:51
* 
* @Last Modified time: 2016-12-30 15:16:36
*/

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */   
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

module.exports = {
    'dateFormat' : dateFormat,
    'format' : format
}      