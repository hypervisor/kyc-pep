const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Serving homepage...');
    res.render('index.html', {
        title: 'KYC Check',
        responseTitle: '',
        items: []
    });
});

module.exports = router;