var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var files = fs.readdirSync(__dirname + '/../playbook');
    var fileItems = [];
    for (var i=0; i< files.length; i++) {
        var base = { name: files[i], rename: files[i].replace('.', '_')};
        if (files[i].indexOf('ec2') >= 0) {
            base.type = true;
        }
        fileItems.push(base);
    }
    res.render('index', { title: 'Express', files:fileItems });
});

module.exports = router;
