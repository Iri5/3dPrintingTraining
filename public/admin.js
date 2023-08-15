
document.addEventListener("DOMContentLoaded", ready);
function ready(){
    let modal_containers = document.querySelectorAll(".modal-container");
    for (let div of modal_containers){
        let modal = div.querySelector(".modal");
        let button = div.querySelector(".modalBtn");
        let close = div.querySelector(".close");
        let modalId = modal.id;
        let buttonId = button.id;
        let closeId = close.id;
        ModalWork(modalId, buttonId, closeId);
    }
    
}
function ModalWork(modalId, openBtnId, closeBtnId) {
    let modal = document.getElementById(`${modalId}`);
    console.log(modal);
    let btn = document.getElementById(`${openBtnId}`);
    let span = document.getElementById(`${closeBtnId}`);
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function ModalWorkWithoutBtn(modalId, closeBtnId) {
    let modal = document.getElementById(`${modalId}`);
    let span = document.getElementById(`${closeBtnId}`);
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
ModalWork("myModal", "myBtn", "close");
ModalWork("modalAddNewCourse", "btnAddNewCourse", "closeAddNewCourse");
ModalWork("modalAddQue", "btnAddQue", "closeAddQue");
ModalWork("modalAddNewTest", "btnAddNewTest", "closeAddNewTest");
/*
let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
class Menu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this); // (*)
    }

    delete(elemPar) {
        let login = elemPar.children[2].innerHTML;
        login = login.trim();
        fetch('/admin-delete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: login
        })
            .then(function () {
                document.location.reload;
            });
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
        if (arr.role == "Обучаемый") {
            form.elements.role[0].checked = true;
        } else if (arr.role == "Преподаватель") {
            form.elements.role[1].checked = true;
        } else {
            form.elements.role[2].checked = true;
        }


        //form.elements.role.value = arr.role;
        form.elements.bday.value = arr.date;
        modal.style.display = "block";
        let span = document.getElementsByClassName("close")[3];

        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
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

new Menu(users);


