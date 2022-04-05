const express = require('express');
const fetch = require('cross-fetch');
const db = require('../private/db');
const router = express.Router();

/* GET PEP-check for a company. */
router.get('/:orgNr', function(req, res, next) {
  try {
    const orgNr = req.params.orgNr;

    const url = `https://code-challenge.stacc.dev/api/roller?orgNr=${orgNr}`;
    console.log(url);

    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    }).catch((reason) => {
        console.error(`Exception in fetch callback: ${reason}`);
    })

    res.json({ orgNr: orgNr });
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;