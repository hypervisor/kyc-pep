function runCheck() {
    const isCompany = document.getElementById('pep-company').checked;
    const input = document.getElementById('pep-name').value;

    if (isCompany) {
        if (input.length == 0) {
            alert('Please enter an organization number');
            return;
        }

        const url = `/api/v1/company/${input}`;
        console.log(`Checking company ${input}`);
        console.log(url);

        

    } else {
        
        if (input.length == 0) {
            alert('Please enter a name');
            return;
        }
    
        const caseSensitive = document.getElementById('pep-case').checked;
        const url = encodeURI(`/api/v1/person/${input}?caseSensitive=${caseSensitive}`);
    
        console.log(`Checking person ${input}, caseSensitive: ${caseSensitive}`);
        console.log(url);
    
        document.getElementById('pep-response').innerHTML = "Searching...";
    
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            const { isPep } = data;
            const resp = document.getElementById('pep-response');
            resp.innerHTML = isPep + (isPep
                ? ', person is politically exposed.'
                : ', person is not known to be politically exposed.');
        }).catch((reason) => {
            console.error(`Exception in fetch callback: ${reason}`);
        });
    }
}