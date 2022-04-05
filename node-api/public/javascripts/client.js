function runCheck() {
    const isCompany = document.getElementById('pep-company').checked;
    let input = document.getElementById('pep-name').value;

    if (isCompany) {
        if (input.length == 0) {
            alert('Please enter an organization number');
            return;
        }

        // Remove all spaces
        input = input.replaceAll(' ', '');

        const url = `/api/v1/company/${input}`;
        console.log(`Checking company ${input}`);
        console.log(url);

        const resp = document.getElementById('pep-response');
        resp.innerHTML = "Searching...";

        fetch(url).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            const { matches } = data;
            if (matches.length == 0) {
                resp.innerHTML = "No PEPs found in company!";
            } else {
                let resp = '';
                for (const el of matches) {
                    resp += `${el.name} (${el.rolletype})<br>`;
                }
                resp.innerHTML = resp;
            }
        }).catch((reason) => {
            resp.innerHTML = "Invalid organization number!";
            console.error(`Exception in fetch callback: ${reason}`);
        });

    } else {
        if (input.length == 0) {
            alert('Please enter a name');
            return;
        }

        const caseSensitive = document.getElementById('pep-case').checked;
        const url = encodeURI(`/api/v1/person/${input}?caseSensitive=${caseSensitive}`);

        console.log(`Checking person ${input}, caseSensitive: ${caseSensitive}`);
        console.log(url);

        const resp = document.getElementById('pep-response');
        resp.innerHTML = "Searching...";

        fetch(url).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            const { isPep } = data;

            resp.innerHTML = isPep + (isPep ?
                ', person is politically exposed.' :
                ', person is not known to be politically exposed.');
        }).catch((reason) => {
            console.error(`Exception in fetch callback: ${reason}`);
        });
    }
}