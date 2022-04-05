function runCheck() {
    const name = document.getElementById('pep-name').value;
    if (name.length == 0) {
        alert('Please enter a name');
        return;
    }

    console.log(`Checking ${name}`);

    const url = encodeURI(`/api/v1/pep/${name}`);
    console.log(url);

    document.getElementById('pep-response').innerHTML = "Searching...!";

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