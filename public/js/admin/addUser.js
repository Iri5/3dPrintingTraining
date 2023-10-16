let addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', UserAdd);



async function UserAdd(e) {
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
            let formData = new FormData();
            addForm.submit();
        }
    }
}
