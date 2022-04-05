function doSearch() {
    let input = document.getElementById('pep-input').value;
    const searchType = document.getElementById('pep-type').value;
    const caseSensitive = document.getElementById('pep-case').checked;
    const isCompany = searchType == 'Company';
    const path = isCompany ? 'company' : 'person';

    if (isCompany) {
        input = input.replaceAll(' ', '');
    }

    const suffix = isCompany ? '' : `?caseSensitive=${caseSensitive}`;
    const url = encodeURI(`/${path}/${input}${suffix}`);

    window.location.href = url;
}