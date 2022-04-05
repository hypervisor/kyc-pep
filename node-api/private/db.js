const csv = require('csv-parser');
const fs = require('fs');
const { init } = require('../app');

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

const searchCsv = function (name) {
    for (const person of people) {
        // Basic sanity checks
        if (person == null || person.name == null || person.aliases == null) {
            continue;
        }

        //console.log(person);

        // Check full name
        if (person.name == name) {
            console.log(`Found ${name} in PEP database!`);
            return true;
        }

        // Check name in aliases
        const aliases = person.aliases.split(';');
        if (aliases.includes(name)) {
            console.log(`Found ${name} in PEP database!`);
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