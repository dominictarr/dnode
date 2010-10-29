//parse-args.asynct.js

var parseArgs = require('../../lib/parse_args')

exports['test string'] = function (test){
   var pa = parseArgs({'string': 'greeting'})
   
   test.deepEqual(pa(['hello']), {'greeting':'hello'})   
   test.finish();
}
exports['test several types'] = function (test){
  var rule = {
    'string': 'greeting'
  , 'number': 'age'
  , 'boolean': 'liar'
  , 'object':'other'
  }
  var p = parseArgs(rule)(['houdy',true,27,{pi:3.14}])

  test.deepEqual(p, 
    { 'greeting':'houdy'
    , 'age': 27
    , 'liar': true
    , 'other':{pi:3.14}
  })   
  test.finish();
}
exports['test error'] = function (test){
  var rule = {
    'string': 'greeting'
  }
  var pa = parseArgs(rule)
  test.throws(function(){
    pa(['houdy',true])
  },"expected an error that there is no rule for boolean");
  test.throws(function(){
    pa(['houdy','john'])
  },"expected an error that string has already been used.");
  test.finish();
}

exports['test multiple strings'] = function (test){
  var rule = {
    'string': ['greeting','name']
  }
  var p = parseArgs(rule)(['bonjour','piere'])

  test.deepEqual(p, 
    { 'greeting':'bonjour'
    , 'name': 'piere'
    })   
  test.finish()

}



if (module == require.main) {
  require('async_testing').run(__filename, process.ARGV);
}

