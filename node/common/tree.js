/* 
* @Author: Lee
* @Date:   2016-12-29 14:15:13
    无限层级的树形结构（类似递归） 
* @Last Modified time: 2017-01-23 14:26:44
*/
// var zNodes=[
// {id:0,pId:-1,name:"Aaaa"},
//     {id:1,pId:0,name:"A"},
//     {id:11,pId:1,name:"A1"},
//     {id:12,pId:1,name:"A2"},
//     {id:13,pId:1,name:"A3"},
//     {id:2,pId:0,name:"B"},
//     {id:21,pId:2,name:"B1"},
//     {id:22,pId:2,name:"B2"},
//     {id:23,pId:2,name:"B3"},
//     {id:3,pId:0,name:"C"},
//     {id:31,pId:3,name:"C1"},
//     {id:32,pId:3,name:"C2"},
//     {id:33,pId:3,name:"C3"},
//     {id:34,pId:31,name:"x"},
//     {id:35,pId:31,name:"y"},  
//     {id:36,pId:31,name:"z"},
//     {id:37,pId:36,name:"z1123"} ,
//     {id:38,pId:37,name:"z123123123"}   
// ];

function treeMenu(a,id,pId){
    this.tree=a||[];
    this.groups={};
    this.id = id;
    this.pId = pId;
};
treeMenu.prototype={
    init:function(pid){
        this.group();
        return this.groups;
        // return this.getDom(this.groups[pid]);
    },
    group:function(){
        for(var i=0;i<this.tree.length;i++){
            if(this.groups[this.tree[i][this.pId]]){
                this.groups[this.tree[i][this.pId]].push(this.tree[i]);
            }else{
                this.groups[this.tree[i][this.pId]]=[];
                this.groups[this.tree[i][this.pId]].push(this.tree[i]);
            }
        }
    },
    getDom:function(a){
        if(!a){return ''}
        var html='\n<ul >\n';
        for(var i=0;i<a.length;i++){
            html+='<li><a href="#">'+a[i].name+'</a>';
            html+=this.getDom(this.groups[a[i].id]);
            html+='</li>\n';
        };
        html+='</ul>\n';
        return html;
    }
};
// var html=new treeMenu(zNodes).init(0);
// alert(html);
var tree = function(dataObj,id,pId){
    return new treeMenu(dataObj,id,pId).init(0);
}

module.exports = tree;