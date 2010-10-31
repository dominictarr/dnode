var DNode = require('dnode')
,	sys = require('sys')

/*
  what happens if you call DNode.end() twice?

*/

exports.simple = function (assert) {
    var port = Math.floor(Math.random() * 40000 + 10000);
    var ended = false
    
    var server = DNode({
        handshake : onHandshake
    }).listen(port);
    
    server.on('ready', function () {
        DNode.connect(port, function (remote, conn) {
            assert.equal(conn.stream.remoteAddress, '127.0.0.1');
            remote.handshake();
        });
    });
    server.on('localError',onError)
    server.on('remoteError',onError)
    server.on('end',onEnd)

    function onError(error){
      process.nextTick(function(){
        throw error;
      });
    }
    function onHandshake(){
      server.end();
      assert.ok(ended,'expected end event to be emited immediately after calling close');
      server.end();
      assert.ok(true,"server should have ended properly")
    }
    function onEnd(){
      ended = true;    
    }
};
