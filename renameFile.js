/**
 * Created by tom.chang on 2015/4/22.
 */
var dirWalker = require('./dirWalker');
var fs = require('fs');
var path = require("path");
var filePath = path.normalize('D:\\work\\clorox\\20160516');
var cloroxFolder= path.normalize('D:\\work\\clorox\\20160505');
var templateFolder=path.normalize('D:\\work\\clorox\\title');
var  cloroxFilesPathArr=[]

function endsWith(str,suffix){
    return str.slice(-suffix.length)===suffix;
}
function handleFile(path, floor) {
    var blankStr = '';
    for (var i = 0; i < floor; i++) {
        blankStr += '    ';
    }
    var files=fs.readdirSync(path),stats,r=[];
    files.forEach(function(item) {
        var tmpPath = path + '/' + item;
        stats= fs.statSync(tmpPath);
        if(stats.isDirectory()){
            handleFile(tmpPath)
            if(endsWith(tmpPath.slice(0,-1),'ft')){
                fs.createReadStream('D:\\work\\clorox\\20160505\\ft2\\index.html').pipe(fs.createWriteStream(tmpPath+"/index.html"));

            }
        }else{

        }
    }   );
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

//console.log(path.join(cloroxFolder,cloroxFilesPathArr[0]),"/images",__dirname+"clorox")
//华润改名
handleFile(filePath);
