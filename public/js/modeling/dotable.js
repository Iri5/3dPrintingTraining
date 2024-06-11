let btnG = document.querySelector('.math-table_show-form-btn');
btnG.addEventListener('click', ()=>{
    let time = new Date();
    let action = {
        time: `${time.getHours()}:${time.getMinutes()+1}:${time.getSeconds()}`,
        date: `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}`,
        message: 'Нажатие на кнопку "Построение таблицы"',
    }
    protocol.push(action);
    let tableForm = document.querySelector('.math-table_form-container');
    tableForm.style.display = 'block';
    btnG.style.display = 'none';
    let firstFactorLegend = tableForm.querySelector('.first-factor > legend');
    let secondFactorLegend = tableForm.querySelector('.second-factor > legend');
    let factorsDOM = document.querySelectorAll(`.component > label`);
    let firstFactorTitle = factorsDOM[0].innerHTML.trim();
    let secondFactorTitle = factorsDOM[1].innerHTML.trim();
    firstFactorLegend.innerHTML = firstFactorTitle;
    secondFactorLegend.innerHTML = secondFactorTitle;
})
