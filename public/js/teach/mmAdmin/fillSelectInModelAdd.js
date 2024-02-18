function FillSelectInModelAdd(modal_id) {
    let modal = document.querySelector(`#${modal_id}`);
    let selectPrinter = modal.querySelector('#select_printer_add');
    let selectFilament = modal.querySelector('#select_filament_add');
    let selectFirstFactor = modal.querySelector('#select_firstfactor_add');
    let selectSecondFactor = modal.querySelector('#select_secondfactor_add');
    let selectResponse = modal.querySelector('#select_response_add');
    let printers = JSON.parse(localStorage.printers);
    let filaments = JSON.parse(localStorage.filaments);
    let components = JSON.parse(localStorage.components);
    printers.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        selectPrinter.append(option);
    })
    filaments.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        selectFilament.append(option);
    })
    components.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        if (elem.type == 1) {
            selectFirstFactor.append(option);
            let secondOption = document.createElement('option');
            secondOption.innerHTML = elem.title;
            secondOption.value = elem.id;
            selectSecondFactor.append(secondOption);
        } else if (elem.type == 0) {
            selectResponse.append(option);
        }
    })
}