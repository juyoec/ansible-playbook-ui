var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/*', function(req, res, next) {
    var baseUrl = req.url;
    var body = req.body.body;
    fs.writeFileSync(__dirname + '/../playbook'+baseUrl, body);
    res.send('ok');
});

module.exports = router;
