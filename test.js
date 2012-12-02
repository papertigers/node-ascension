var fs = require('fs'),
  config_file = "config.json",
  traverse = require("./lib/traverse"),
  musicmetadata = require('musicmetadata');

var config = JSON.parse(fs.readFileSync(config_file, "ascii"));
var music_list = [];
//Currently Sync, this will take awhile
config.collections.forEach( function(path) {
  files = traverse.traverseMusic(path);
  music_list.push(files);
});

console.log(music_list);
