/* 
* @Author: Lee
* @Date:   2016-12-29 14:15:13
    无限层级的树形结构（类似递归） 
* @Last Modified time: 2017-01-25 13:56:41
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

function treeMenu(a,ttId,pId,domType){
    this.tree=a||[];
    this.groups={};
    this.ttId = ttId;
    this.pId = pId;
    this.domType = domType;
};
treeMenu.prototype={
    init:function(pid,domType){
        this.group();
        if(!!this.domType){
            return this.getOpts(this.groups[pid],0);
        }else{
            return this.getDom(this.groups[pid]);
        }
        
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
            html+=  '<li><span>'+a[i].colname+'</span>'
                +   '<a class="col-del" href="javascript:void(0);" data-ttid="' + a[i].id + '">删除</a>'
                +   '<a class="col-move" href="/adminMoveColumn?id=' + a[i].id + '&colname=' + a[i].colname + '&parentId='+ a[i].parentid +'" >移动</a>'
                +   '<a class="col-update" href="/adminColumn?id=' + a[i].id + '&handle=update" >更改</a>'
                +   '<a class="col-add" href="/adminColumn?id=' + a[i].id + '&handle=add"  >增加子类</a>'
                +   '<a class="col-handle" href="/cat?id=' + a[i].id + '">预览</a>'

            html+=this.getDom(this.groups[a[i][this.ttId]]);
            html+='</li>\n';
        };
        html+='</ul>\n';
        return html;
    },
    getOpts:function(a,j){
        if(!a){return ''}
        var html='';
    
        for(var i=0;i<a.length;i++){
            html+=  '<option value="' + a[i].id + '" data-link="/cat?id=' + a[i].id + '" >'+ a[i].colname+'</option>\n'    
            html+=this.getOpts(this.groups[a[i][this.ttId]],++j);
            html+='';
        };
        return html;
    }
};
// var html=new treeMenu(zNodes).init(0);
// alert(html);

function tree(zNodes,ttId,pId,domType){
    return new treeMenu(zNodes,ttId,pId,domType).init(0);
}

module.exports = tree;