const express = require('express');
const db = require('../private/db');
const router = express.Router();

/* GET PEP-check for company. */
router.get('/:orgNr', function(req, res, next) {
  try {
    const orgNr = req.params.orgNr;
    //const isPep = db.search(name, caseSensitive);
    //console.log(`db.search returned ${isPep}`);
    //res.json({ isPep: isPep });
    res.json({ orgNr: orgNr });
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;