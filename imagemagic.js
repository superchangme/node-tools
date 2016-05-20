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
 var dirPath='D:\\work\\佳能&&华润\\node_tools\\icons\\bamboo\\ar';
/*image&&file traverse*/
function resizeAll(dirPath){
    fs.stat(dirPath,function (err,status) {
        if(status.isDirectory()){
            fs.readdir(dirPath,function(err,files){
				for(var i= 0;i<files.length;i++){

                (function next(i){
                        var oldName = path.join(dirPath,files[i]);
                        var fileName =files[i];
                        var stats=fs.statSync(oldName);
                        if(stats.isDirectory()){
                           resizeAll(oldName);
                        }else{
							if(!oldName.match(/png|jpg|jpeg/i)){
								return;
							}
                            im.identify(oldName, function(err, features){
                                if (err) throw err;
                                console.log('Shot at ',features.width,features.height,fileName);
								 resize({
                                    srcPath: oldName,
                                    dstPath: oldName,
                                    //dstPath: oldName.split(".")[0]+"x600."+oldName.split(".")[1],
                                    height:300,
                                    quality:1,
                                    filter: 'Lagrange' 
                                })
                                // -> Shot at Tue, 06 Feb 2007 21:13:54 GMT
                            });
                          /*  if(oldName.indexOf("菜谱")==-1||!oldName.match(/png|jpg|jpeg/i)){
                                next(++i);
                                return;
                            }*//*else{
                                if(oldName.indexOf("x600")>-1){
                                    fs.unlink(oldName);
                                }
                                next(++i);
                            }*/
                          /*  im.identify(oldName, function(err, features){
                                if (err) throw err;
                                resize({
                                    srcPath: oldName,
                                    dstPath: oldName,
                                    //dstPath: oldName.split(".")[0]+"x600."+oldName.split(".")[1],
                                    width:750,
                                    height:100,
                                    quality:1,
                                    filter: 'Lagrange' ,
                                    gravity: "South"
                                }).then(function(err,stdout){
                                    console.log("in",err,oldName)
                                    console.log('stdout:', stdout);
                                    if(err){
                                        console.log(err);
                                    }
                                });
                            /!*    if(features.width>1000){
                                    console.log(i,oldName,features.width);
                                    resize({
                                        srcPath: oldName,
                                        dstPath: oldName*!//!**!//!*oldName.split(".jpg")[0]+"_thumb.jpg"*!//!**!//!*,
                                        width:   1000 ,
                                        quality:1
                                    }).then(function(err){
                                        if(err){
                                            console.log(err);
                                        }
                                    });
                                }else{
                                    //do nothing
                                }*!/
                                next(++i);
                                // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
                            });*/
                    /*        im.convert([oldName,'-gravity','South', '-Crop', '750*100', oldName],
                                function(err, stdout){
                                    if (err) throw err;
                                    console.log('stdout:', stdout);
                                });*/
                        }
                        /*
                         var newName = path.join(dirPath,"xu"+i+".jpg");


                         fs.rename(oldName,newName,function(err){
                         if(err){
                         console.log(err);
                         }else{
                         next(++i);
                         }
                         });
                         */
                }(i));
			}
            });
        }
    })
}

resizeAll("D:\\work\\php\\tom\\wechat_tongji\\2015-11-25temp");


