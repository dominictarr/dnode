var DNode = require('dnode')
,	sys = require('sys')

/*
  what happens if you call DNode.end() twice?

*/

exports.simple = function (assert) {
    var port = Math.floor(Math.random() * 40000 + 10000);
    
//    DNode({}).listen(6060)
    
    var server = DNode({
        handshake : handshake
    }).listen(port);
    
    server.on('ready', function () {
        DNode.connect(port, function (remote, conn) {
            assert.equal(conn.stream.remoteAddress, '127.0.0.1');
            remote.handshake();
        });
    });
    server.on('localError',onError)
    server.on('remoteError',onError)
    
    function onError(error){
      process.nextTick(function(){
        throw error;
      });
    }
    function handshake(){
      server.end();
      server.end();
      assert.ok(true,"server should have ended properly")
    }
};
