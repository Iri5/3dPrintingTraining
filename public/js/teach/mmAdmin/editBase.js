let editPrinter = document.querySelector('#editPrinter form');
editPrinter.addEventListener('submit', PrinterEdit);
async function PrinterEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = await DataForm(form);
    FetchEdit('printer', 'editPrinter', dataToSend);
}
let editFilament = document.querySelector('#editFilament');
editFilament.addEventListener('submit', FilamentEdit);
async function FilamentEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = await DataForm(form);
    FetchEdit('filament', 'editFilament', dataToSend);
}
let editComponent = document.querySelector('#editComponent form');
editComponent.addEventListener('submit', ComponentEdit);
async function ComponentEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = await DataForm(form);
    FetchEdit('component', 'editComponent', dataToSend);
}
let editModel = document.querySelector('#editModel form');
editModel.addEventListener('submit', ModelEdit);
async function ModelEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = await DataForm(form);
    FetchEdit('model', 'editModel', dataToSend);
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
    let select = form.querySelectorAll('select');
    if (select != undefined){
        select.forEach(element => {
            let name = element.name;
            dataToSend[name] = element.value;
    });
    }
    
    
    return dataToSend;
}

async function FetchEdit(url, modalId, dataToSend){
    let modal = document.querySelector(`#${modalId}`);
    fetch(`/${url}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToSend)
    })
        .then(function (res) {
            if (res.status == 200) {
                modal.style.display = 'none';
                location.reload();
            }
        })
}

function Edit(userData, modalId) {
    let modal = document.getElementById(`${modalId}`);
    console.log('33333');
    console.log(userData);
    let editForm = modal.querySelector("form");
    for (key in userData) {
        if (key == 'type'){
            if (userData[key] == 'Фактор'){
                editForm[key].selectedIndex = 0;
            } else {
                editForm[key].selectedIndex = 1;
            }
        }
        else if (key == 'printermodel'){
            editForm.printer.selectedIndex = userData[key];
        }
        else if (key == 'filamentmodel'){
            editForm.filament.selectedIndex = userData[key];
        }
        //else if (key != 'type' || key != 'printer' || key != 'filament'){
          //  editForm[key].value = userData[key];
        //}
        else {
            editForm[key].value = userData[key];
        }
        
        
    }
}
/*
let adminMMtables = document.querySelector(".adminMMtable");
adminMMtables.forEach((elem)=>{
    elem.addEventListener('click', clickInTableAdminMM);
})*/
/*function clickInTableAdminMM (e){
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else if (target.dataset.action == "delete") {
        let tr = target.parentElement.parentElement;
        let login = tr.querySelector(".login").innerHTML.trim();
        ModalWorkConfirm("modalQueDelete", Delete, login);
    } else if (target.dataset.action == "edit") {

        let userFields = target.parentElement.parentElement.children;
        let userData = {};
        for (key in userFields) {
            let clasName = userFields[key].className;
            if (clasName != null) {
                let userInner = userFields[key].innerHTML;
                let userTrim;
                if (userInner != undefined) {
                    userTrim = userInner.trim();
                    userData[clasName] = userTrim;
                }
            }
        }
        console.log('222222');
        console.log(userData);

        Edit(userData, 'myModal_edit');
        ModalWorkWithoutBtn('myModal_edit')
    }
}*/
