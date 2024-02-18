document.addEventListener("DOMContentLoaded", getInfoPrinterFilament);
async function getInfoPrinterFilament() {

    let response = await fetch('/printers-filaments')
    if (response.ok) {
        //info about printers and filaments from database
        let dataBasePrintersAndFilaments = await response.json();
        let printers = dataBasePrintersAndFilaments.printers;
        let filaments = dataBasePrintersAndFilaments.filaments;
        //download info into localstorage
        localStorage.printers = JSON.stringify(dataBasePrintersAndFilaments.printers);
        localStorage.filaments = JSON.stringify(dataBasePrintersAndFilaments.filaments);
        //find td with foreign keys
        let printersTDinModels = document.querySelectorAll("td[atrname='printermodel']");
        let filamentsTDinModels = document.querySelectorAll("td[atrname='filamentmodel']");
        //replace foreign keys with names
        printersTDinModels.forEach(elem => {
            let id = elem.innerHTML.trim();
            let printer = printers.find(item => item.id == id);
            elem.innerHTML = printer.title;
        })
        filamentsTDinModels.forEach(elem => {
            let id = elem.innerHTML.trim();
            let filament = filaments.find(item => item.id == id)
            elem.innerHTML = filament.title;
        })

        FillSelectInModelEdit('editModel');
    }

    let dBModelsComponents = await fetch('/show-models')
    if (dBModelsComponents.ok) {
        let dataBaseModelsAndComponents = await dBModelsComponents.json();
        let models = dataBaseModelsAndComponents.models;
        let components = dataBaseModelsAndComponents.components;
        localStorage.components = JSON.stringify(dataBaseModelsAndComponents.components);
        localStorage.models = JSON.stringify(dataBaseModelsAndComponents.models);
        FillSelectInModelAdd('addModel');
    }
}