const csv = require('csv-parser');
const fs = require('fs');

const searchCsv = function(name) {
    let isPep = false;
    const stream = fs.createReadStream('private/pep_data.csv');
    stream.pipe(csv())
        .on('data', (row) => {
            // Basic sanity checks
            if (row == null || row.name == null || row.aliases == null) {
                return;
            }

            // Check full name
            if (row.name == name) {
                isPep = true;
                stream.close();
                return;
            }

            // Check name in aliases
            const aliases = row.aliases.split(';');
            if (aliases.includes(name)) {
                isPep = true;
                stream.close();
                return;
            }
      });

    return isPep;
}

module.exports = {
    search: searchCsv
}