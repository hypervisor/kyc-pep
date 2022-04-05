function runCheck() {
    const name = document.getElementById('pep-name').value;
    if (name.length == 0) {
        alert('Please enter a name');
        return;
    }

    const caseSensitive = document.getElementById('pep-case').checked;
    const url = encodeURI(`/api/v1/pep/${name}?caseSensitive=${caseSensitive}`);

    console.log(`Checking ${name}, caseSensitive: ${caseSensitive}`);
    console.log(url);

    document.getElementById('pep-response').innerHTML = "Searching...";

    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        const { isPep } = data;
        document.getElementById('pep-response').innerHTML = isPep;
    }).catch((reason) => {
        console.error(`Exception in fetch callback: ${reason}`);
    })
}