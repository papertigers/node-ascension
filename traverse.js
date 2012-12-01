//Required modules
var fs = require('fs'),
        async = require('async'),
        fspath = require('path');

/*
 * traverse walks a path async and callsback
 * with an array of files/dirs in the path
 */

function traverse(path, callback) {
        fs.readdir(path, function (err, files) {
                callback(path, files)   
        });
}

/*
 * Call traverse and use the file array
 * to call stat on every file.
 */

traverse("/mnt/music", function(path, files) {
        files = files.map(function (i) {return fspath.join(path, i); } );
        async.map(files, fs.stat, function(err, results){
                console.log(results);
        });
});
