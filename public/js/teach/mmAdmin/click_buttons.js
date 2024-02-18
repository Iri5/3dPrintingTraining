let tables = document.querySelectorAll(".tableM");
tables.forEach(elem => {
    elem.addEventListener('click', clickInTableAdminMM);
});

function clickInTableAdminMM(e) {
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else {
        if (target.hasAttribute("printer-id")) {
            let id = target.getAttribute('printer-id');
            if (target.dataset.action == "delete") {
                ModalWorkConfirm("modalQueDelete", Delete, id, "/printer");
            }
            if (target.dataset.action == "edit") {
                let parent = target.parentElement.parentElement;
                let curId = target.getAttribute("printer-id");
                let td = parent.querySelectorAll("td[atrname]");
                let userData = {};
                td.forEach(elem => {
                    let atrName = elem.getAttribute("atrname");
                    let userInner = elem.innerHTML;
                    let userTrim;
                    if (userInner != undefined) {
                        userTrim = userInner.trim();
                        userData[atrName] = userTrim;
                    }
                   
                })
                userData.current = curId;
                console.log(userData)
                Edit(userData, 'editPrinter');
                ModalWorkWithoutBtn('editPrinter');
            }
        }
        if (target.hasAttribute("filament-id")) {
            let id = target.getAttribute('filament-id');
            if (target.dataset.action == "delete") {
                ModalWorkConfirm("modalQueDelete", Delete, id, "/filament");
            }
            if (target.dataset.action == "edit") {
                let parent = target.parentElement.parentElement;
                let curId = target.getAttribute("filament-id");
                let td = parent.querySelectorAll("td[atrname]");
                let userData = {};
                td.forEach(elem => {
                    let atrName = elem.getAttribute("atrname");
                    let userInner = elem.innerHTML;
                    let userTrim;
                    if (userInner != undefined) {
                        userTrim = userInner.trim();
                        userData[atrName] = userTrim;
                    }
                })
                userData.current = curId;
                console.log(userData)
                Edit(userData, 'editFilament');
                ModalWorkWithoutBtn('editFilament')
            }
        }
        if (target.hasAttribute("component-id")) {
            let id = target.getAttribute('component-id');

            if (target.dataset.action == "delete") {
                ModalWorkConfirm("modalQueDelete", Delete, id, "/component");
            }
            if (target.dataset.action == "edit") {
                let parent = target.parentElement.parentElement;
                let curId = target.getAttribute("component-id");
                let td = target.parentElement.parentElement.children;
                let td1 = parent.querySelectorAll("td[atrname]");
                let userData = {};
                td1.forEach(elem => {
                    let atrName = elem.getAttribute("atrname");
                    let userInner = elem.innerHTML;
                    let userTrim;
                    if (userInner != undefined) {
                        userTrim = userInner.trim();
                        userData[atrName] = userTrim;
                    }
                })
                userData.current = curId;
                console.log(userData)
                Edit(userData, 'editComponent');
                ModalWorkWithoutBtn('editComponent')
            }
        }
        if (target.hasAttribute("model-id")) {
            let id = target.getAttribute('model-id');

            if (target.dataset.action == "delete") {
                ModalWorkConfirm("modalQueDelete", Delete, id, "/model");
            }
            if (target.dataset.action == "edit") {
                let parent = target.parentElement.parentElement;
                let curId = target.getAttribute("model-id");
                let td = target.parentElement.parentElement.children;
                let td1 = parent.querySelectorAll("td[atrname]");
                let userData = {};
                td1.forEach(elem => {
                    let atrName = elem.getAttribute("atrname");
                    let userInner = elem.innerHTML;
                    let userTrim;
                    if (userInner != undefined) {
                        userTrim = userInner.trim();
                        userData[atrName] = userTrim;
                    }
                })
                userData.current = curId;
                let printer_id = userData.printer;
                let filament_id = userData.filament;
                SelectFP(printer_id, filament_id, 'editModel')
                Edit(userData, 'editModel');
                ModalWorkWithoutBtn('editModel')
            }
        }
    }
}


function SelectFP(printer_id, filament_id, modal_id) {
    let modal = document.querySelector(`#${modal_id}`);
    let selectPrinter = modal.querySelector('#select-printer');
    let selectFilament = modal.querySelector('#select-filament');
    selectPrinter.value = printer_id;
    selectFilament.value = filament_id;
}