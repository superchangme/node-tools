/**
 * Created by tom.chang on 2015/4/22.
 */
var dirWalker = require('./dirWalker');
var fs = require('fs');
var path = require("path");
var filePath = path.normalize('D:\\work\\clorox\\20160328\\CB30（130)');
var cloroxFolder= path.normalize('D:\\work\\clorox\\20160519');
var templateFolder=path.normalize('D:\\work\\clorox\\title');
var  cloroxFilesPathArr=[]
var copy=require("./copyFile");

var htmlBegin=['<html lang="en"><head>',
    '    <meta charset="UTF-8">',
    '    <title>佳能文描图</title>',
    '    <style>',
    '        .container{',
    '            width: 750px;',
    '            margin: 0 auto;',
    '        }',
    '        img{',
    '            display: block;',
    '        }',
    '        ul{',
    '            float: right;',
    '            padding: 0;',
    '            width: 400px;',
    '        }',
    '        ul li{',
    '            list-style: none;',
    '            margin-top: 10px;',
    '            line-height: 23px;',
    '            display: table;',
    '            width: 390px;',
    '        }',
    '        ul li span{',
    '            width: 120px;',
    '            float:left;',
    '        }',
    '        ul li span+span{',
    '            display: table-cell;',
    '            vertical-align: top;',
    '            width: 3000px;;',
    '            float: none;',
    '        }',
    '    </style>',
    '</head>',
    '<body><div class="container"><div><img src="images/a1.jpg"></div> <div><img src="images/b1.jpg"></div> <div><img src="images/b2.jpg" style="float: left"> <img src="images/b3.jpg"> <div style="clear:both;"></div><div style="clear:both;"></div> </div>'].join("");
var htmlEnd='</div></body></html>';
function handleFile(path, floor) {
    var blankStr = '';
    for (var i = 0; i < floor; i++) {
        blankStr += '    ';
    }
    fs.stat(path, function(err1, stats) {
        if (err1) {
            console.log('stat error');
        } else {
            if (stats.isDirectory()) {
                console.log('+' + blankStr + path);
            } else {

                console.log(path)
                fs.rename(path,path.replace(/bt(\d)/,"bt_$1"))
                //console.log('-' + blankStr + path+blankStr+"已替换为"+path.replace("_","-"));
            }
        }
    })
}
function getChildFolder(path){
    var files=fs.readdirSync(path),stats,r=[];
    files.forEach(function(item) {
        var tmpPath = path + '/' + item;
        stats= fs.statSync(tmpPath);
        if (stats.isDirectory()&&item.indexOf("title")==-1) {

            r.push(tmpPath)
        } else {
        }
    });
    return r;

}
cloroxFilesPathArr=getChildFolder(cloroxFolder)
//拷贝佳能默认图片
cloroxFilesPathArr.forEach(function(item){
    console.log("haha",item)
          var copyTo=path.join("",item)
    var files=fs.readdirSync(copyTo+"/images/");
    var html=htmlBegin;
    var r=files.reduce(function(o,p){
        var key=p.match(/\w/)[0];
            if(o.indexOf(key)==-1){
                o.push(key)

            }
        return      o;
    },[])
    //console.log(r.length)
    if(r.length==6){
        copy.copy(templateFolder+'/version/v5',copyTo)
    }   else if(r.length==7){
        copy.copy(templateFolder+'/version/v6',copyTo)

    }
    files.forEach(function(item){
        if(item.match(/a|b/))return;
        html+='<div><img src="images/'+item+'"></div>' ;
    })
    html+=htmlEnd;
    fs.writeFile(item+"/index.html",html)
       //copy.copy(templateFolder,copyTo)
})
//console.log(path.join(cloroxFolder,cloroxFilesPathArr[0]),"/images",__dirname+"clorox")
//华润改名
dirWalker.walk(filePath, 0, handleFile);
