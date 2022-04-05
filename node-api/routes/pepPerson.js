const express = require('express');
const db = require('../private/db');
const router = express.Router();

/* GET PEP-check for one person. */
router.get('/:name', function(req, res, next) {
    try {
        const caseSensitive = (req.query.caseSensitive === 'true');
        const name = decodeURI(req.params.name);

        const isPep = db.search(name, caseSensitive);

        console.log(`db.search returned ${isPep}`);

        if (req.is('application/json')) {
            res.json({ isPep: isPep });
        } else {
            res.render('index.html', {
                title: 'KYC Check',
                responseTitle: 'No response',
                items: []
            });
        }
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;