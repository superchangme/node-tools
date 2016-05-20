var fs = require( 'fs' ),
    stat = fs.stat;

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst,allInOne ){
    // 读取目录中的所有文件/目录
    // 创建读取流

   // readable = fs.createReadStream( src );
    // 创建写入流
    //writable = fs.createWriteStream( dst );

    // 通过管道来传输流
//    readable.pipe( writable );
var _inOneDst=dst;
    exists( src, dst ,function(){
        console.log("create dir",dst)
    });
    fs.readdir( src, function( err, paths ){
        console.log(src)
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            //console.log(_dst,"in")

            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream(allInOne ? _inOneDst: _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, allInOne ? _inOneDst: _dst, copy );
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
            fs.mkdir( dst,'777', function(){
                callback( src, dst );
            });
        }
    });
};
//copy('D:/work/ht/1/3.jpg','F:/upload/3.jpg')
exports.copy=copy;
//copy('D:/work/JS_plugin/js_plugins/project/voiceofchina/design/好声音制作文件/src','D:/work/JS_plugin/js_plugins/project/voiceofchina/design/好声音制作文件/one',true)
//copy(__dirname+"/copy_test",__dirname+"/copy_test2")
//console.log(__dirname+"/copy_test")

