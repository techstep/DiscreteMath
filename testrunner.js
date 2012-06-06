/// http://elegantcode.com/2011/03/07/taking-baby-steps-with-node-js-bdd-style-unit-tests-with-jasmine-node-sprinkled-with-some-should/
// this file should be project_dir/testrunner.js
// specs should be in project_dir/spec
// run with node testrunner.js from project_dir

var jasmine = require('jasmine-node');
var util = require('util');

for(var key in jasmine) {
  global[key] = jasmine[key];
}

var isVerbose = true;
var showColors = true;

process.argv.forEach(function(arg){
    switch(arg) {
          case '--color': showColors = true; break;
          case '--noColor': showColors = false; break;
          case '--verbose': isVerbose = true; break;
      }
});

console.log(__dirname);

jasmine.executeSpecsInFolder(__dirname + '/spec', function(runner, log){
  if (runner.results().failedCount == 0) {
    process.exit(0);
  }
  else {
    process.exit(1);
  }
}, isVerbose, showColors);