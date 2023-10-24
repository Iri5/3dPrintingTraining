document.addEventListener('DOMContentLoaded', ready);
function ready(){
    let modal_containers = document.querySelectorAll('.modal_container');
    for (let div of modal_containers){
        let modal = div.querySelector('.modal');
        let button = div.querySelector('.modalBtn');
        ModalWork(modal, button);
    }
}
function ModalWork(modal, openBtn) {
    let close = modal.querySelector(".modal_close");
    openBtn.onclick = function () {
        modal.style.display = 'block';
    }
    close.onclick = function () {
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
function ModalWorkWithoutBtn(modalId) {
    let modal = document.getElementById(`${modalId}`);
    let close = modal.querySelector(".modal_close");
    modal.style.display = 'block';
    close.onclick = function () {
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
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
    confirm.onclick = function (login) {
        func(params);
        modal.style.display = 'none';
    }
}