let DELETE = false;
let CANCEL = false;
function IsLoginNew(currentLogin) {
    let logins = document.querySelectorAll('.logins');
    let loginsArray = [];
    for (let login of logins) {
        loginsArray.push(login.innerHTML.trim());
    }
    if (loginsArray.includes(currentLogin)) {
        return false;
    } else {
        return true;
    }
}
let addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', User);

async function User(e) {
    e.preventDefault();
    let currentLogin = e.target.login.value;
    if (IsLoginNew(currentLogin) == false) {
        ModalWorkWithoutBtn('modalUserExist', 'closeUserExist');
    } else {
        let role = e.target.role.value;
        let group = e.target.group.value;
        if ((role == '1') && (group == '')) {
            ModalWorkWithoutBtn('modalHasntGroup', 'closeHasntGroup');
        }
        else {
            addForm.submit();
        }
        //form.submit();
    }
}
let yesDelete = document.querySelector('#yes-delete');
yesDelete.addEventListener('click', YESDelete);
function YESDelete() {
    DELETE = true;
}
let noDelete = document.querySelector("#yes-delete");
noDelete.addEventListener('click', NODelete);
function NODelete() {
    CANCEL = true;
}
let close = document.querySelector("#close-que-delete");
noDelete.addEventListener('click', Close);
function Close() {
    CANCEL = true;
}
async function WaitForIt() {
    if ((CANCEL != true) && (DELETE != true)) {
        setTimeout(waitForIt, 2500);
    } else if (CANCEL == true) {
        return false;
    } else if (DELETE == true) {
        return true;
    }
}
async function ModalWorkConfirm(modalId, closeBtnId, cancelId, confirmId, login) {

    let modal = document.getElementById(`${modalId}`);
    let span = document.getElementById(`${closeBtnId}`);
    let cancel = document.getElementById(`${cancelId}`);
    let confirm = document.getElementById(`${confirmId}`);

    modal.style.display = 'block';
    span.onclick = async function () {
        modal.style.display = 'none';

    }
    cancel.onclick = async function () {
        modal.style.display = 'none';

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';

        }
    }
    confirm.onclick = function(login){
        Delete(login);
        modal.style.display = 'none';
    }
}
function Delete(login) {
    fetch('/admin-delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: login
    })
        .then(function () {
            document.location.reload;
        });

}
document.querySelector("#users");
users.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else if (target.dataset.action == "delete") {
        let tr = target.parentElement.parentElement;
        let login = tr.querySelector(".logins").innerHTML.trim();
        ModalWorkConfirm("modalQueDelete", "close-que-delete", "no-delete", "yes-delete", login);
    } else if (target.dataset.action == "edit"){
        console.log("ediiiit");
    }
})
/*class Menu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this); // (*)
    }

    

    edit(elemPar) {
        let arr = {
            name: elemPar.children[0].innerHTML.trim(),
            email: elemPar.children[1].innerHTML.trim(),
            login: elemPar.children[2].innerHTML.trim(),
            group: elemPar.children[3].innerHTML.trim(),
            role: elemPar.children[4].innerHTML.trim(),
            date: elemPar.children[5].innerHTML.trim()
        }

        let modal = document.getElementById('myModal_edit');
        let form = document.forms.my;
        form.current.value = arr.login;
        form.fio.value = arr.name;
        form.email.value = arr.email;
        form.login.value = arr.login;
        form.group.value = arr.group;
        if (arr.role == 'Обучаемый') {
            form.elements.role[0].checked = true;
        } else if (arr.role == 'Преподаватель') {
            form.elements.role[1].checked = true;
        } else {
            form.elements.role[2].checked = true;
        }


        //form.elements.role.value = arr.role;
        form.elements.bday.value = arr.date;
        modal.style.display = 'block';
        let span = document.getElementsByClassName('close')[3];

        span.onclick = function () {
            modal.style.display = 'none';
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    search() {
        alert('ищу');
    }

    onClick(event) {
        let action = event.target.dataset.action;
        let elemPar = event.target.parentElement.parentElement;
        if (action) {
            this[action](elemPar);
        }
    }
}
let users = document.querySelector('.menu');
if (users) {
    new Menu(users);
}
//new Menu(users);
*/

