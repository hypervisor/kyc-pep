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

        fetch(url).then(response => {
            if (!response.ok) {
                throw Error();
            }
            return response.json();
        }).then(data => {
            // If invalid orgNr was given data will be null.
            if (data == null) {
                return;
            }

            // Array of employees in company.
            const employees = [];

            const rollegruppetyper = data;
            for (const rollegruppetype of rollegruppetyper) {
                for (const rolletype of rollegruppetype.roller) {
                    //console.log(rolletype.person);
                    if (rolletype.person == null) {
                        continue;
                    }

                    const fullName = `${rolletype.person.navn.fornavn} ${rolletype.person.navn.etternavn}`;
                    const employee = {
                        rolletype: rolletype.type.beskrivelse,
                        name: fullName,
                        isPep: db.search(fullName, false)
                    };

                    employees.push(employee);
                }
            }

            if (req.is('application/json')) {
                res.json({ employees: employees });
            } else {
                const itemsToRender = [];
                for (const employee of employees) {
                    itemsToRender.push({
                        header: employee.rolletype,
                        title: employee.name,
                        desc: employee.isPep ? 'Person is politically exposed.' : 'Person is not known to be politically exposed.',
                        useAlertStyle: employee.isPep
                    });
                }
                res.render('index.html', {
                    title: 'KYC Check',
                    responseTitle: `${employees.length} registered employees`,
                    items: itemsToRender
                });
            }
        }).catch((reason) => {
            res.render('index.html', {
                title: 'KYC Check',
                responseTitle: 'Invalid organisation number',
                items: []
            });
        });
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;