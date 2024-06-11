let dataTable;
let tableForm = document.querySelector('.math-table_form');
tableForm.addEventListener('submit', (e)=>{
    e.preventDefault();
})
let btn = document.querySelector('#btn-table');

btn.addEventListener('click', () => {
    let tableDOM = document.createElement('table');
    tableDOM.className = 'row-border';
    tableDOM.id = 'example';
    tableDOM.style.width = '50%';
    let tableCulc = document.createElement('div');
    tableCulc.className = 'table-culc';
    tableCulc.append(tableDOM);
    let visualDOM = document.querySelector('.math-table_container');
    visualDOM.append(tableCulc);

    let factorsDOM = document.querySelectorAll(`input[type='range']`);
    let firstFactorTitle = factorsDOM[0].getAttribute('comp');
    let secondFactorTitle = factorsDOM[1].getAttribute('comp')
    let responseTitle = document.querySelector(`#result`).getAttribute('comp-result');
    let tableForm = document.querySelector('.math-table_form');
    let firstFactor = {
        from: tableForm.firstfrom.value,
        to: tableForm.firstto.value,
        step: tableForm.firststep.value,
    };
    let secondFactor = {
        from: tableForm.secondfrom.value,
        to: tableForm.secondto.value,
        step: tableForm.secondstep.value,
    };
    let time = new Date();
    let action = {
        time: `${time.getHours()}:${time.getMinutes()+1}:${time.getSeconds()}`,
        date: `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}`,
        message: null,
    }
    let msg = `Построение таблицы:
    ${firstFactorTitle}: от ${tableForm.firstfrom.value} до ${tableForm.firstto.value} с шагом ${tableForm.firststep.value}
    ${secondFactorTitle}: от ${tableForm.secondfrom.value} до ${tableForm.secondto.value} с шагом ${tableForm.secondstep.value}
    `;
    action.message = msg;
    protocol.push(action);
    let dataSet = [
    ];
    let count = 0;

    
    for (let i = +firstFactor.from; i <= +firstFactor.to; i += +firstFactor.step) {
        
        let stroke = [i];
        for(let j = +secondFactor.from; j <= +secondFactor.to; j += +secondFactor.step){
            let scope = {
                [firstFactorTitle]: i,
                [secondFactorTitle]: j,
            };
            let eq = localStorage.currentEquip
            
            let result = math.evaluate(eq, scope);
            //result1 = Math.round(result * 10000) / 10000;
            result1 = result.toFixed(2);
            
            stroke.push(result1);
        }
        
        dataSet.push(stroke);
    }
    let titles = [{title: "Te/Pf"}];
    for(let j = +secondFactor.from; j <= +secondFactor.to; j += +secondFactor.step){
        let titleObj = {title: j};
        titles.push(titleObj);
    }
    console.log(dataSet);
    
        dataTable = new DataTable('#example', {
            paging: false,
            scrollCollapse: true,
            scrollY: '300px',
            scrollX: true,
            columns: titles,
            data: dataSet,
            info: false,
            ordering: false,
            searching: false,
        });
    
    
    console.log(dataTable)
    btn.disabled = true;
    let btnClear = document.querySelector('#btn-table-clear');
    btnClear.disabled = false;
})

let btnClear = document.querySelector('#btn-table-clear');
btnClear.addEventListener('click', ()=>{
    dataTable.destroy();
    let tableCulcDOM = document.querySelector('.table-culc');
    tableCulcDOM.remove();
    //let containerTable = document.querySelector('#example');
    //containerTable.innerHTML = '';
    
    btnClear.disabled = true;
    btn.disabled = false;
})