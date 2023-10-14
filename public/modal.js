document.addEventListener('DOMContentLoaded', ready);
function ready(){
    let modal_containers = document.querySelectorAll('.modal-container');
    for (let div of modal_containers){
        let modal = div.querySelector('.modal');
        let button = div.querySelector('.modalBtn');
        let close = div.querySelector('.close');
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
        modal.style.display = 'block';
    }
    span.onclick = function () {
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
function ModalWorkWithoutBtn(modalId, closeBtnId) {
    let modal = document.getElementById(`${modalId}`);
    let span = document.getElementById(`${closeBtnId}`);
    modal.style.display = 'block';
    span.onclick = function () {
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}
