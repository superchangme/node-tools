/**
 * Created by tom.chang on 2014/11/26.
 */
var im = require('imagemagick');
var promise= require("promise");
var  deferred= require("deferred");
 var fs=require("fs");
var path=require("path");
/*im.resize({
    srcPath: '1.jpg',
    dstPath: '20.jpg',
    width:   100
}, function(err, stdout, stderr){
    if (err) throw err;
    console.log('resized kittens.jpg to fit within 256x256px');
});

fs.mkdir(__dirname+"/a/b/b/b")
console.log(process.env.os)*/
/*
fs.rename(__dirname+"/20.jpg",__dirname+"/a/20.jpg");*/
 var resize=promise.denodeify(im.resize)
var uuid=require("uuid");
/*console.log(uuid.v1())
resize({

    srcPath: 'a.jpg',
    dstPath: 'a.jpg',
    width:   100 ,
    quality:1
}).then(function(){
    console.log("in1")
});
resize({

    srcPath: 'a.jpg',
    dstPath: 'a1.jpg',
    width:   300
}).then(function(){
    console.log("in2")
});*/
/*
im.resize({
    srcPath: '1.jpg',
    dstPath: '220.jpg',
    width:   300
}, function(err, stdout, stderr){
    if (err) throw err;
    console.log('resized kittens.jpg to fit within 256x256px');
});
*/

var defer=deferred();
setTimeout(function(){
    defer.resolve();
},100);
/*
defer.promise.done(function(){
     console.log("in")
})
*/
 var androidDirPath='D:\\work\\clorox\\node_tools\\icons\\bamboo\\ar\\test\\android\\';
var iosDirPath='D:\\work\\clorox\\node_tools\\icons\\bamboo\\ar\\test\\ios\\';
var iosFolder='D:\\work\\clorox\\node_tools\\icons\\bamboo\\ar\\ios\\';
var androidFolder='D:\\work\\clorox\\node_tools\\icons\\bamboo\\ar\\android\\';
var originIcon='D:\\work\\clorox\\node_tools\\icons\\bamboo\\ar\\icon-76@2x.png';
/*image&&file traverse*/
function myResize(dirPath,type){
    function resizeAll(dirPath,parentFolder){
        fs.stat(dirPath,function (err,status) {
            if(status.isDirectory()){
                fs.readdir(dirPath,function(err,files){
                    for(var i= 0;i<files.length;i++){
                        (function next(i){
                            var oldName = path.join(dirPath, files[i]);
                            var fileName = files[i];
                            var stats = fs.statSync(oldName);
                            if (stats.isDirectory()) {
                                resizeAll(oldName,fileName);
                            } else {
                                im.identify(oldName, function (err, features) {
                                    if (err) throw err;
                                    console.log('Shot at ', features.width, features.height, fileName);
                                    // -> Shot at Tue, 06 Feb 2007 21:13:54 GMT
                                    if(type=="ios"){
                                        im.resize({
                                            srcPath: originIcon,
                                            dstPath: iosFolder+fileName,
                                            width:   features.width,
                                            height:  features.height
                                        }, function(err, stdout, stderr){
                                            if (err) throw err;
                                        });
                                    }else if(type=="android"){
                                        if (!fs.existsSync(androidFolder+parentFolder+"/")) {
                                            fs.mkdirSync(androidFolder+parentFolder+"/");
                                        }
                                        im.crop({
                                            srcPath: originIcon,
                                            dstPath: androidFolder+parentFolder+"/"+fileName,
                                            width: features.width,
                                            height: features.height,
                                            quality: 1,
                                            gravity: "Center"
                                        }, function(err, stdout, stderr){
                                            // foo
                                        });
                                    }
                                    /*      */

                                });
                            }
                        }(i));
                    }
                });
            }
        })
    }
    resizeAll(dirPath)
}


myResize(androidDirPath,"android");
myResize(iosDirPath,"ios");


