const express = require('express');
const db = require('../private/db');
const router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  try {
    const name = decodeURI(req.params.name);
    const isPep = db.search(name);
    console.log(`db.search returned ${isPep}`);
    res.json({ isPep: isPep });
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;