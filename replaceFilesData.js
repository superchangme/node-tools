/**
 * Created by tom.chang on 2015/9/21.
 */
var path = require("path");

var fs=require("fs");
var  cloroxFilesPathArr=["NTB1","NTB2","NTB4","NTB5","NTB6","NTB3","NTB10","NTB7"]
var cloroxFolder= path.normalize('D:/work/佳能&&华润');
var dirWalker = require('./dirWalker');

function handleFile(path, floor) {
    console.log()
    fs.stat(path, function(err1, stats) {
        if (err1) {
            console.log('stat error',err1);
        } else {
            if (stats.isDirectory()) {
            } else {
                if (path.match(/html$/)) {
                    var data = fs.readFileSync(path);

                    var ostr = data.toString().replace(/<\/ul>/, '</ul><div style="clear:both;"></div>')
                    fs.writeFile(path,ostr)
                }
            }
        }
    })
}
cloroxFilesPathArr.forEach(function(item){
    var filePath=path.join(cloroxFolder,item)
    dirWalker.walk(filePath, 0, handleFile);
})
