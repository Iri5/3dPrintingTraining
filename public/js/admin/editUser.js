let editForm = document.querySelector('#edit_form');
editForm.addEventListener('submit', UserEdit);
async function UserEdit(e) {
    e.preventDefault();
    let form = e.target;
    console.log(form);
    let dataToSend = {};
    dataToSend.currentLogin = form.current.value;
    dataToSend.fio = form.fio.value;
    dataToSend.email = form.email.value;
    dataToSend.login = form.login.value;
    dataToSend.group = form.group.value;
    dataToSend.role = form.role.value;
    dataToSend.bday = form.bday.value;
    console.log(dataToSend);
    if ((dataToSend.login != dataToSend.currentLogin) && (IsLoginNew(dataToSend.login) == false)) {
        ModalWorkWithoutBtn('modalUserExist');
    } else {
        let role = dataToSend.role;
        let group = dataToSend.group;
        if ((role == '1') && (group == '')) {
            ModalWorkWithoutBtn('modalHasntGroup');
        }
        else {
            let modal = document.querySelector("#myModal_edit");
            fetch('/admin', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(dataToSend)
            })
                .then(function (res) {
                    if (res.status == 200){
                        let modal = document.querySelector("#myModal_edit");
                        modal.style.display = 'none';
                        location.reload();
                    }
                })
        }
    }
}

function Edit(userData, modalId) {
    let modal = document.getElementById(`${modalId}`);

    let editForm = modal.querySelector("form");
    editForm.current.value = userData.login;
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
        Edit(userData, 'myModal_edit');
        ModalWorkWithoutBtn('myModal_edit')
    }
})
