var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
    var baseUrl = req.url;
    var file = fs.readFileSync(__dirname + '/../playbook'+baseUrl, 'utf8');
    res.send(file);
});

module.exports = router;
