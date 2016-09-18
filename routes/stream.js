var express = require('express');
var ansible = require('./ansible');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.socket.setTimeout(24 * 60 * 60 * 1000);

    var messageCount = 0;
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');
    ansible.addListener(function(data) {
        var split = data.split('\n');
        for (var i =0; i< split.length; i++) {
            res.write('data: ' + split[i].replace(/[\*]/gi, '') + '\n')
        }
        //res.write("data: " + data.replace('\n', '').replace(/[\*]/gi, '')  + '\n');
        res.write('\n');
    });
    req.on("close", function() {
    });
});

module.exports = router;
