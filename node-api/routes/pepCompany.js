const express = require('express');
const db = require('../private/db');
const router = express.Router();

/* GET PEP-check for a company. */
router.get('/:orgNr', function(req, res, next) {
  try {
    const orgNr = req.params.orgNr;
    res.json({ orgNr: orgNr });
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;