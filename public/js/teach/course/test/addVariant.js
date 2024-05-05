const addRadioButttons = document.querySelectorAll('.add-radio-button');
addRadioButttons.forEach(radio => AddELClickAddRadio(radio));
const addCheckButtons = document.querySelectorAll('.add-check-button');
addCheckButtons.forEach(check => AddELClickAddCheck(check));

function AddELClickAddCheck(check) {
    check.addEventListener('click', (e) => {
        const checkRow = document.createElement('div');
        checkRow.classList.add('radio-row');
        checkRow.classList.add('check-container');
        checkRow.innerHTML = `
            <input type="checkbox" id="" name="variant" value="">
            <label></label>
            <input forcheck="" type="text" value="" name="vartext"></input>
        `;
        e.target.before(checkRow);
        AddELChangeCheck(checkRow);
    })
}
function AddELClickAddRadio(radio) {
    radio.addEventListener('click', (e) => {
        const radioRow = document.createElement('div');
        radioRow.classList.add('radio-row');
        radioRow.classList.add('radio-container');
        radioRow.innerHTML = `
            <input type="radio" id="" value="" name="variant">
            <label></label>
            <input forradio="" type="text" value="" name="vartext"></input>
        `;
        AddELChangeRadio(radioRow);
        e.target.before(radioRow);
    })
    
}