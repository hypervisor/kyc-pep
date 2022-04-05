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
        // Array of employees in company that were found in the PEP database.
        const pepMatches = [];

        const rollegruppetyper = data;
        for (const rollegruppetype of rollegruppetyper) {
            console.log(rollegruppetype.type.beskrivelse);
            for (const rolletype of rollegruppetype.roller) {
                //console.log(rolletype.person);
                if (rolletype.person == null) {
                    continue;
                }

                const fullName = `${rolletype.person.navn.fornavn} ${rolletype.person.navn.etternavn}`;
                console.log('\t' + fullName);

                if (db.search(fullName, false)) {
                    pepMatches.push({
                        rollegruppetype: rollegruppetype.type.beskrivelse,
                        rolletype: rolletype.type.beskrivelse,
                        name: fullName
                    });
                }
            }
        }

        res.json({ matches: pepMatches });
    }).catch((reason) => {
        console.error(`Exception in fetch callback: ${reason}`);
    });
  } catch(err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;