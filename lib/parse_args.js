//arg-parser

//take arguments and parse according to type.
//map type-> name
//iterates through list, checks the type, and stores it in a hash with the named key.
//nulls the key, so if another one pops up, there is an error message.

var sys = require('sys');

module.exports = function (rule){
  return function (args){
    return parseArgs(args,rule)
  }
}

function parseArgs (args,rule){
   var result = {}
  // args = new Array(args)
   for (var i in args) {
    var it = args[i]
//   args.forEach(function(it){
      var t = rule[typeof it]
      if (t instanceof Array){
        t = t.shift()
      }      
      if (t){
        if(result[t]){
          throw new Error("already found arg for key :" + t +", '" +typeof it + "' :" + result[t] + " did not expect :" + it)      
        }
        result[t] = it
      } else {
        throw new Error("there was no rule for type '" +typeof it + "' :" + sys.inspect(it))      
      }
   }
  // });
   return result;
}
