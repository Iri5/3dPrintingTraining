function FillSelectInModelEdit(modal_id) {
    let modal = document.querySelector(`#${modal_id}`);
    let selectPrinter = modal.querySelector('#select-printer');
    let selectFilament = modal.querySelector('#select-filament');
    let printers = JSON.parse(localStorage.printers);
    let filaments = JSON.parse(localStorage.filaments);
    printers.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        selectPrinter.append(option)
    })
    filaments.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        selectFilament.append(option)
    })
}