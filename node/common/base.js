/* 
* @Author: lee
* @Date:   2016-12-26 17:11:51
* 
* @Last Modified time: 2016-12-28 15:31:21
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

module.exports = {
    'dateFormat' : dateFormat
}      