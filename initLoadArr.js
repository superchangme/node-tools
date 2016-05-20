/**
 * Created by tom.chang on 2015/4/22.
 */
var dirWalker = require('./dirWalker');
var fs = require('fs');
var path = require("path");
var filePath = path.normalize('D:/work/佳能&&华润/node_tools/img/');
var imgArr=[];
var imgPath="img/";
function handleFile(path,name, floor) {
    var blankStr = '',stats;
    for (var i = 0; i < floor; i++) {
        blankStr += '    ';
    }
    stats= fs.statSync(path);

    if (stats.isDirectory()) {
        console.log('+' + blankStr + path);
    } else {
        //console.log(name)
        imgArr.push("'"+imgPath+name+"'")
       // console.log('-' + blankStr + path+blankStr+"已替换为"+path.replace("_","-"));
    }
}
dirWalker.walkSync(filePath, 0, handleFile);
                  console.log(imgArr.length)
fs.writeFile("imgLoad.json",imgArr.join(",")+",'css/main_z.png'")
