function IsLoginNew(currentLogin) {
    let logins = document.querySelectorAll('.login');
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
        ModalWorkWithoutBtn('modalUserExist');
    } else {
        let role = e.target.role.value;
        let group = e.target.group.value;
        if ((role == '1') && (group == '')) {
            ModalWorkWithoutBtn('modalHasntGroup');
        }
        else {
            addForm.submit();
        }
        //form.submit();
    }
}

async function ModalWorkConfirm(modalId, func, ...params) {
    let modal = document.getElementById(`${modalId}`);
    let span = modal.querySelector(".modal_close");
    let cancel = modal.querySelector(".no");
    let confirm = modal.querySelector(".yes");
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
        func(params);
        modal.style.display = 'none';
    }
}
function Delete(login) {
    alert("func")
    alert(login);
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
function Edit(userData, modalId){
    let modal = document.getElementById(`${modalId}`);

    let editForm = modal.querySelector("form");
    editForm.current.value = userData.logins;
    editForm.fio.value = userData.name;
    editForm.email.value = userData.email;
    editForm.login.value = userData.login;
    editForm.group.value = userData.group;
    if (userData.role == 'Обучаемый') {
        editForm.elements.role[0].checked = true;
    } else if (userData.role == 'Преподаватель') {
        editForm.elements.role[1].checked = true;
    } else {
        editForm.elements.role[2].checked = true;
    }

    editForm.elements.bday.value = userData.bday;
}
document.querySelector("#users");
users.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else if (target.dataset.action == "delete") {
        let tr = target.parentElement.parentElement;
        let login = tr.querySelector(".login").innerHTML.trim();
        ModalWorkConfirm("modalQueDelete", Delete, login);
    } else if (target.dataset.action == "edit"){
        
        console.log(target.parentElement.parentElement);
        let userFields = target.parentElement.parentElement.children;
        let userData = {};
        for (key in userFields){
            let clasName = userFields[key].className;
            if (clasName != null){
                let userInner = userFields[key].innerHTML;
                let userTrim;
                if (userInner != undefined){
                    userTrim = userInner.trim();
                    userData[clasName] = userTrim;
                }
            }
        }
        Edit(userData, 'myModal_edit' );
        ModalWorkWithoutBtn('myModal_edit' ) 
    }
})
