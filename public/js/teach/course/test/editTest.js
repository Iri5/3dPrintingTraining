const editTest = document.querySelector('#editTest');
console.log("edit test");
console.log(editTest);
editTest.addEventListener('submit', TestEdit);
async function TestEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = await DataForm(form);
    console.log(dataToSend);
    FetchEdit('test', dataToSend);
}
async function DataForm(form){
    let dataToSend = {};
    let inputs = form.querySelectorAll("input");
    inputs.forEach(element => {
        let name = element.getAttribute('name');
        dataToSend[name] = element.value;
    });
    let textarea = form.querySelectorAll("textarea");
    if (textarea != undefined){
        textarea.forEach(element => {
            let name = element.getAttribute('name');
            dataToSend[name] = element.value;
        });
    }
    return dataToSend;
}
async function FetchEdit(url, dataToSend){
    fetch(`/${url}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToSend)
    })
        .then(function (res) {
            if (res.status == 200) {
                location.reload();
            }
        })
}