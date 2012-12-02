/*
 * This will walk a provided music "collection"
 * returning songs in the allowed formats.
 * This is modeled after substacks findit sync func.
 * https://github.com/substack/node-findit
 * Difference: Wanted just files and some filtering.
 */

exports.traverseMusic = function traverseMusic(dir) {
  var fs = require('fs'),
    path = require('path');

  var files = [];
  var dirQueue = [];
  var processFile = function processFile(file) {
    stat = fs.lstatSync(file);
    if (stat.isFile()) {
      files.push(file);
    }
    if (stat.isDirectory()) {
      fs.readdirSync(file).forEach(function(f) { dirQueue.push(path.join(file, f)); });
    }
  }

  fs.readdirSync(dir).forEach(function(f) { dirQueue.push(path.join(dir, f)); });
  while (dirQueue.length > 0) {
    processFile(dirQueue.shift());
  }

  return files;
}
