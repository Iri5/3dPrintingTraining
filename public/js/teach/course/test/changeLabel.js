
let inputsRadio = document.querySelectorAll('input[forradio]');
let inputsChange = document.querySelectorAll('input[forcheck]');
document.addEventListener('DOMContentLoaded', ChangeLabel);
function ChangeLabel() {
    let inputsRadio = document.querySelectorAll('input[forradio]');
    let inputsChange = document.querySelectorAll('input[forcheck]');
    let radioContainers = document.querySelectorAll('.radio-container');
    let checkContainers = document.querySelectorAll('.check-container');
    radioContainers.forEach(el => {
        AddELChangeRadio(el);
    })
    checkContainers.forEach(el => {
        AddELChangeCheck(el);
    })
}
function AddELChangeRadio(container) {
    let inputRadio = container.querySelector('input[forradio]');
    let radio = container.querySelector('input[type="radio"]');
    inputRadio.addEventListener('input', () => {
        radio.value = inputRadio.value;
    })
}
function AddELChangeCheck(container) {
    let inputCheck = container.querySelector('input[forcheck]');
    let check = container.querySelector('input[type="checkbox"]');
    inputCheck.addEventListener('input', () => {
        check.value = inputCheck.value;
    })
}