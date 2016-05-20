/**
 * Created by tom.chang on 2015/4/22.
 */
var fs = require('fs');

/*

 递归处理文件,文件夹

 path 路径
 floor 层数
 handleFile 文件,文件夹处理函数

 */
var total=0;
function walk(path, floor, handleFile) {
    handleFile(path,null, floor);
    floor++;
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
        } else {
            files.forEach(function(item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function(err1, stats) {
                    if (err1) {
                        console.log('stat error');
                    } else {
                        if (stats.isDirectory()) {
                            walk(tmpPath, floor, handleFile);
                        } else {
                            handleFile(tmpPath,item, floor);
                        }
                    }
                })
            });

        }
    });
}

function walkSync(path, floor, handleFile) {
    handleFile(path, null,floor);
    floor++;
    var files=fs.readdirSync(path),stats;
    files.forEach(function(item) {
        var tmpPath = path + '/' + item;
        stats= fs.statSync(tmpPath);
        if (stats.isDirectory()) {
            walk(tmpPath, floor, handleFile);
        } else {
            handleFile(tmpPath, item,floor);
            total++;
        }
    });
    return total;
}

exports.walk = walk;
exports.walkSync = walkSync;
