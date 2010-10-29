var DNode = require('dnode');
var EventEmitter = require('events').EventEmitter;

exports.ping = function (assert) {
    var port = Math.floor(Math.random() * 40000 + 10000);
    
    var server = DNode({
        busy : function () { for (var i = 0; i < 1e7; i++); }
    }).listen(port);
    
    var pings = [];
    var timeouts = [];
    var tm_id
    var iv = null;
    server.on('ready', function () {
        DNode.connect(
            port, true, //{ ping : 100, timeout : 50 },
            function (remote, conn) {
               setTimeout(function () {
                    iv = setInterval(function () { remote.busy() }, 20);
                }, 300);
                
                conn.on('ping', function (elapsed) {
                    pings.push(elapsed);
                    
                    if (pings.length == 6) {
                        assert.ok(timeouts.length >= 2);
                        
                        pings.forEach(function (ms, i) {
                            var t = timeouts.indexOf(i) >= 0;
                            assert.equal(ms >= 50, t);
                        });
                        
                        clearInterval(iv);
                        clearTimeout(tm_id);
                        server.end();
                    }
                });
                
                conn.on('timeout', function () {
                    assert.ok(pings.length >= 3);
                    timeouts.push(pings.length);
                });
            }
        );
    });
    tm_id  =setTimeout(function(){
      server.end();
      clearInterval(iv);
      throw new Error("server did not ping");
    },2000);
};

