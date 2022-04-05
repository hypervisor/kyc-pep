const csv = require('csv-parser');
const fs = require('fs');
const { init } = require('../app');

//
// This file is used to abstract the "database".
//

let people = [];

const initDb = function () {
    fs.createReadStream('private/pep_data.csv')
        .pipe(csv())
        .on('data', (row) => {
            people.push(row);
        })
        .on('end', () => {
            console.log('Parsed CSV!');
        });
}

const searchCsv = function (name, caseSensitive) {
    const searchTerm = caseSensitive ? name : name.toLowerCase();

    for (const person of people) {
        // Basic sanity checks
        if (person == null || person.name == null || person.aliases == null) {
            continue;
        }

        const toSearch = caseSensitive ? person.name : person.name.toLowerCase();

        // Check full name
        if (toSearch == searchTerm) {
            return true;
        }

        // Check name in aliases
        let aliases = person.aliases.split(';');
        if (!caseSensitive) {
            aliases = aliases.map((x) => x.toLowerCase());
        }

        if (aliases.includes(searchTerm)) {
            return true;
        }
    }

    return false;
}

// Read from CSV to an in-memory array
initDb();

module.exports = {
    search: searchCsv
}