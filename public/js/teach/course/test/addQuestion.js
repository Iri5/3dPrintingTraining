const addQuestionButtons = document.querySelectorAll('.add-question-btn');
addQuestionButtons.forEach(btn => {
    btn.addEventListener('click', e => addQuestionClick(e))
});

async function addQuestionClick(e) {
    const dataToSend = {
        type: e.target.getAttribute('qtype'),
        testId: localStorage.currenttestid
    }
    const result = await fetch('/question', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToSend)
    })
    console.log('result');
    console.log(result.status);
    const insertId = await result.json()
    console.log(insertId.id);
    if (dataToSend.type == 1) { CreateSingleAnsQuestion(insertId.id) }
    if (dataToSend.type == 2) { CreateMultipleAnsQuestion(insertId.id) }
    if (dataToSend.type == 3) { CreateShortAnsQuestion(insertId.id) }
}

function CreateSingleAnsQuestion(insertId) {
    const container = document.createElement('div');
    container.classList.add('question__container')
    container.innerHTML = `
        <h3>Вопрос с единичным выбором</h3>
        <form action="">
            <input class="simple" type="number" name="id" value="${insertId}" style="display: none;">
            <input class="simple" type="number" name="type" value="1" style="display: none;">
            <div class="area">
                <label for="">Текст вопроса</label>
                <textarea class="simple" name="que_text" id=""
                    rows="3"></textarea>
            </div>
            <div class="area score">
                <label for="">Число баллов</label>
                <input class="simple" name="score" type="number" value="">
            </div>
            <p>Варианты ответа:</p>
            <div class="radio-row radio-container">
                <input type="radio" name="variant" value="">
                <label></label>
                <input forradio="" name="vartext" type="text" value="">
            </div>
            <button type="button" class="add-button add-radio-button">Добавить вариант ответа</button>
            <div class="row">
                <button type="submit" name="action" value="save">Сохранить</button>
                <button type="submit" name="action" value="delete">Удалить</button>
            </div>
        </form>
    `
    let inputCont = container.querySelector('.radio-container');
    console.log('inputCont');
    console.log(inputCont);
    AddELChangeRadio(inputCont);
    const addRadioButtton = container.querySelector('.add-radio-button');
    AddELClickAddRadio(addRadioButtton)
    let form = container.querySelector('form');
    AddELSubmitFormQue(form);
    let questionsContainer = document.querySelector('.test__questions');
    questionsContainer.append(container);
}
function CreateMultipleAnsQuestion(insertId) { 
    const container = document.createElement('div');
    container.classList.add('question__container')
    container.innerHTML = `
        <h3>Вопрос с множественным выбором</h3>
        <form action="">
            <input class="simple" type="number" name="id" value="${insertId}" style="display: none;">
            <input class="simple" type="number" name="type" value="2" style="display: none;">
            <div class="area">
                <label for="">Текст вопроса</label>
                <textarea class="simple" name="que_text" id="" rows="3"></textarea>
            </div>
            <div class="area score">
                <label for="">Число баллов</label>
                <input class="simple" name="score" type="number" value="">
            </div>
            <p>Варианты ответа:</p>
            <div class="radio-row check-container">
                <input type="checkbox" name="variant" value="" checked>
                <label></label>
                <input forcheck="" type="text" name="vartext" value="">
            </div>
            <button type="button" class="add-button add-check-button">Добавить вариант ответа</button>
            <div class="row">
                <button type="submit" name="action" value="save">Сохранить</button>
                <button type="submit" name="action" value="delete">Удалить</button>
            </div>
        </form>
    `
    let inputCont = container.querySelector('.check-container');
    console.log(inputCont)
    AddELChangeCheck(inputCont);
    const addCheckButtton = container.querySelector('.add-check-button');
    AddELClickAddCheck(addCheckButtton);
    let form = container.querySelector('form');
    AddELSubmitFormQue(form);
    let questionsContainer = document.querySelector('.test__questions');
    questionsContainer.append(container);
}
function CreateShortAnsQuestion(insertId) { 
    const container = document.createElement('div');
    container.classList.add('question__container')
    container.innerHTML = `
        <h3>Вопрос с коротким ответом</h3>
        <form action="">
            <input class="simple" type="number" name="id" value="${insertId}" style="display: none;">
            <input class="simple" type="number" name="type" value="3" style="display: none;">
            <div class="area">
                <label for="">Текст вопроса</label>
                <textarea class="simple" name="que_text" id="" rows="3"></textarea>
            </div>
            <div class="area score">
                <label for="">Число баллов</label>
                <input class="simple" name="score" type="number" value="">
            </div>
            <p>Ответ:</p>
            <input type="text" answer name="ans" value="">
        
            <div class="row">
                <button type="submit" name="action" value="save">Сохранить</button>
                <button type="submit" name="action" value="delete">Удалить</button>
            </div>
        </form>
    `
    let form = container.querySelector('form');
    AddELSubmitFormQue(form);
    let questionsContainer = document.querySelector('.test__questions');
    questionsContainer.append(container);
}