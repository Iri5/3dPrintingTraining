document.addEventListener("DOMContentLoaded", LoadModels);
async function LoadModels() {
    const taskText = localStorage.getItem('taskText');
    if (taskText) {
        let blockTask = document.createElement('div');
        blockTask.innerHTML = taskText;
        blockTask.classList.add('blockTask');
        let info = document.querySelector(".settings-user");
        info.prepend(blockTask);
    }
    let response = await fetch('/show-models')
    if (response.ok) {
        let bdModels = await response.json();
        let models = bdModels.models;
        let components = bdModels.components;

        localStorage.components = JSON.stringify(bdModels.components);
        localStorage.models = JSON.stringify(bdModels.models);

        SearchModels()
    }
    let selectModels = document.querySelector("#models");
    selectModels.addEventListener('change', ChangeModel);
    let printer = document.querySelector('#printer');
    let filament = document.querySelector('#filament');
    printer.addEventListener('change', ChangeParam);
    filament.addEventListener('change', ChangeParam);

}
function ChangeModel() {
    Clear();
    SearchCurrentModel()
}
function ChangeParam() {
    Clear();
    let models = document.querySelectorAll("#models > option");
    if (models != null) {
        models.forEach(elem => {
            elem.remove();
        })
    }

    SearchModels();
}
//Очищение
function Clear() {
    let del = document.querySelectorAll(".component");
    if (del != null) {
        del.forEach(elem => {
            elem.remove();
        })
    }
    del = document.querySelector(".response");
    if (del != null) {
        del.remove();
    }
    let div = document.querySelector('#myDiv');
    div.style.display = 'none';
    let show = document.querySelector('.surface-plot_show-btn');
    show.style.display = 'block';
}
function SearchModels() {
    //Модели и компоненты из БД
    let models = JSON.parse(localStorage.models);
    let components = JSON.parse(localStorage.components);
    //Селекторы притнера и филамента в документе
    let printer_id = document.querySelector("#printer").value;
    let filament_id = document.querySelector("#filament").value;
    let selectModels = document.querySelector("#models");
    let count = 0;
    //Есть ли модель для выбранных параметров
    models.forEach(element => {
        if (element.printer_id == printer_id && element.filament_id == filament_id) {
            //Создаем элемент списка
            let option = document.createElement('option');
            option.innerHTML = element.title;
            option.value = element.id;
            selectModels.append(option);
            count++;
        }
    });
    if (count > 0) {
        SearchCurrentModel();
    }
}
function SearchCurrentModel() {
    let selectModels = document.querySelector("#models");
    let model_id = selectModels.value;
    localStorage.currentModelId = model_id;

    let models = JSON.parse(localStorage.models);
    let components = JSON.parse(localStorage.components);
    //объект выбранной модели
    let current_model = models.find(item => item.id == model_id);
    localStorage.currentModel = current_model;
    localStorage.currentEquip = current_model.equation
    let firstFactor = null;
    let secondFactor = null;

    if (current_model.first_factor_id != null) {
        //Ищем объект компонента первого фактора
        firstFactor = components.find(item => item.id == current_model.first_factor_id);
        AddDOM(firstFactor, 'ffactor');
    }
    if (current_model.second_factor_id != null) {
        //Ищем объект компонента второго фактора
        secondFactor = components.find(item => item.id == current_model.second_factor_id)
        AddDOM(secondFactor, 'sfactor');
    }
    let response = components.find(item => item.id == current_model.response_id);
    AddDOMResponse(response);
}
//добавление отклика в дом
function AddDOMResponse(component) {
    let div = document.createElement('div');
    div.classList.add("response");

    let divTitle = document.createElement('div');
    divTitle.innerHTML = component.title;
    divTitle.classList.add('responseTitle')

    let divNumber = document.createElement('div');
    divNumber.setAttribute("comp", "result");
    divNumber.id = "result";
    divNumber.setAttribute("comp-result", `${component.designation}`);

    let divUnits = document.createElement('div');
    divUnits.innerHTML = component.units;
    div.append(divTitle);
    div.append(divNumber);
    div.append(divUnits);
    let info = document.querySelector(".settings-user")
    info.append(div);

    let buttonSaveTask = document.createElement('button');
    buttonSaveTask.classList.add('buttonSaveTask');
    buttonSaveTask.innerHTML = 'Отправить';
    buttonSaveTask.addEventListener('click', clickBtnSaveTask)
    info.append(buttonSaveTask)
}
//добавление факторов в дом
function AddDOM(component, id) {
    let div = document.createElement('div');
    div.classList.add("component");
    div.classList.add(`${component.designation}`)

    let ranInput = document.createElement('div');
    ranInput.classList.add('blockInput');

    let range = document.createElement('input');
    range.type = "range";
    range.max = component.max;
    range.min = component.min;
    range.value = (component.max + component.min) / 2;
    range.setAttribute("comp", component.designation);

    let text = document.createElement('input');
    text.type = 'number'
    text.value = (component.max + component.min) / 2;
    text.id = id;
    text.setAttribute("comp", component.designation);
    text.classList.add('numOfRange');

    let label = document.createElement('label');
    label.innerHTML = component.title + ", " + component.units;

    ranInput.append(range);
    ranInput.append(text);
    div.append(label);
    div.append(ranInput);

    let info = document.querySelector(".settings-user")
    info.append(div);
    AddProcessing(component.designation);
}
//добавление обработчика на изменение трэкбара и инпутов
function AddProcessing(nameClass) {
    let range = document.querySelector(`.${nameClass}  input[type='range']`)
    let inputs = document.querySelector(`.${nameClass}  input[type='number']`)
    range.addEventListener('input', onChangeTBar);
    inputs.addEventListener('input', onChangeTBar);
}

function onChangeTBar(e) {
    let target = e.target;
    let comp = target.getAttribute('comp');
    let text = document.querySelector(`input[comp=${comp}][type='number']`)
    text.value = target.value;

    Culculate(240, 20)
}
function Culculate(firstFactor, secondFactor) {
    let ranges = document.querySelectorAll("input[type='number']");
    let te = ranges[0].getAttribute("comp");
    let scope = {};
    /*ranges.forEach(element => {
        scope[`${element.getAttribute("comp")}`] = element.value;

    })
    console.log(scope);
    let eq = localStorage.currentEquip

    const result = math.evaluate(eq, scope);

    console.log(result);
    let resDiv = document.querySelector("div[comp=result]");
    result1 = Math.round(result * 10000) / 10000;
    resDiv.innerHTML = result1;*/
    ranges.forEach(element => {
        console.log(`${element.getAttribute("comp")} : ${element.value}`)
        scope[`${element.getAttribute("comp")}`] = element.value;

    })
    console.log(scope);
    let eq = localStorage.currentEquip

    const result = math.evaluate(eq, scope);

    console.log(result);
    let resDiv = document.querySelector("div[comp=result]");
    result1 = Math.round(result * 1000) / 1000;
    resDiv.innerHTML = result1;
    console.log(`CALCULATE
                firstFactor: ${firstFactor},
                secondFactor: ${secondFactor},
                scopeTe: ${scope.Te},
                scopePf: ${scope.Pf},
                eq: ${eq},
                result: ${result1}`)
}
function clickBtnSaveTask() {
    const ffactorInput = document.querySelector('#ffactor');
    const firstfactor = ffactorInput.value;
    const sfactorInput = document.querySelector('#sfactor');
    const secondfactor = sfactorInput.value;
    let taskText = localStorage.getItem('taskText');
    let educationId = localStorage.getItem('educationId');
    let answerId = localStorage.getItem('answerId');
    let taskId = localStorage.getItem('taskId');
    let userId = localStorage.getItem('userId');
    let send = {
        firstfactor: firstfactor,
        secondfactor: secondfactor,
        taskText: taskText,
        educationId: educationId,
        answerId: answerId,
        taskId: taskId,
        userId: userId
    }
    fetch('/practical_answer', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(send)
    })
        .then(function (result) {
            if (result.status == 200) {
                localStorage.removeItem('taskText');
                localStorage.removeItem('educationId');
                localStorage.removeItem('answerId');
                localStorage.removeItem('taskId');
                localStorage.removeItem('userId');
                let exit = document.createElement('a');
                exit.href = `/user/${userId}`
                exit.click();
            }

        })



}