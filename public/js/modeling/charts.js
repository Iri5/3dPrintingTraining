let btn2dFormShow = document.querySelector('.show-2dgraph');
btn2dFormShow.addEventListener('click', () => {
    let time = new Date();
    let action = {
        time: `${time.getHours()}:${time.getMinutes()+1}:${time.getSeconds()}`,
        date: `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}`,
        message: 'Нажатие на кнопку "Показать 2D график"',
    }
    protocol.push(action);
    let components = document.querySelectorAll('.component > label');
    let firstFactorLabel = components[0].innerHTML.trim();
    let secondFactorLabel = components[1].innerHTML.trim();
    console.log(secondFactorLabel);
    let legendFirstFactor = document.querySelectorAll('.legend-first-factor');
    let legendSecondFactor = document.querySelectorAll('.legend-second-factor');
    legendFirstFactor.forEach(elem => elem.innerHTML = firstFactorLabel);
    legendSecondFactor.forEach(elem => elem.innerHTML = secondFactorLabel);
    btn2dFormShow.style.display = 'none';
    let d2form = document.querySelector('.chart-form_container');
    d2form.style.display = 'block';
    let canvases = document.querySelectorAll('canvas');
    canvases.forEach(elem => { elem.style.display = 'block' })
})
let firstGraphPlot;
let secondGraphPlot;
let build2dGraphicsBtn = document.querySelector('#btn-d2graph');
let destroyGraph = document.querySelector('#btn-d2graph-delete');
build2dGraphicsBtn.addEventListener('click', () => {
    let time = new Date();
    let action = {
        time: `${time.getHours()}:${time.getMinutes()+1}:${time.getSeconds()}`,
        date: `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}`,
        message: null
    }
    destroyGraph.disabled = false;
    build2dGraphicsBtn.disabled = true;
    let components = document.querySelectorAll('.component > label');
    let firstFactorLabel = components[0].innerHTML.trim();
    let secondFactorLabel = components[1].innerHTML.trim();
    let responseLabel = document.querySelector('.responseTitle').innerHTML.trim();

    let responseTitle = document.querySelector(`#result`).getAttribute('comp-result');
    let factorsDOM = document.querySelectorAll(`input[type='range']`);
    let firstFactorTitle = factorsDOM[0].getAttribute('comp');
    let secondFactorTitle = factorsDOM[1].getAttribute('comp')
    let graphForm = document.querySelector('.d2-form');


    let firstGraph = {
        fix: graphForm.firstfactorfix.value,
        from: graphForm.secondvarfrom.value,
        to: graphForm.secondvarto.value,
        step: graphForm.secondvarstep.value,
        resultArr: [],
        labelsArr: []
    }
    let secondGraph = {
        fix: graphForm.secondfactorfix.value,
        from: graphForm.firstvarfrom.value,
        to: graphForm.firstvarto.value,
        step: graphForm.firstvarstep.value,
        resultArr: [],
        labelsArr: []
    }
    let msg = `
    Построение 2D-графиков:
        1) ${firstFactorTitle} фиксированно ${graphForm.firstfactorfix.value},
            ${secondFactorTitle} от ${graphForm.secondvarfrom.value} до ${graphForm.secondvarto.value} с шагом ${graphForm.secondvarstep.value};
        2) ${secondFactorTitle} фиксированно ${graphForm.secondfactorfix.value},
            ${firstFactorTitle} от ${graphForm.firstvarfrom.value} до ${graphForm.firstvarto.value} с шагом ${graphForm.firstvarstep.value};    
    `
    action.message = msg;
    protocol.push(action);
    for (let i = +firstGraph.from; i <= +firstGraph.to; i += +firstGraph.step) {
        let scope = {
            [firstFactorTitle]: firstGraph.fix,
            [secondFactorTitle]: i,
        };
        let eq = localStorage.currentEquip
        let result = math.evaluate(eq, scope);
        result1 = Math.round(result * 10000) / 10000;
        firstGraph.resultArr.push(result1);
        firstGraph.labelsArr.push(i);
    }

    firstGraphPlot = new Chart(
        document.getElementById('acquisitions'),
        {
            type: 'line',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    x: {
                        title: {
                            color: 'blue',
                            display: true,
                            text: secondFactorLabel
                        }
                    },
                    y: {
                        title: {
                            color: 'blue',
                            display: true,
                            text: responseLabel
                        }
                    }
                }
            },
            data: {
                labels: firstGraph.labelsArr,
                datasets: [
                    {
                        label: responseTitle,
                        data: firstGraph.resultArr
                    }
                ]
            }
        }
    );
    for (let i = +secondGraph.from; i <= +secondGraph.to; i += +secondGraph.step) {
        let scope = {
            [firstFactorTitle]: i,
            [secondFactorTitle]: secondGraph.fix,
        };
        let eq = localStorage.currentEquip
        let result = math.evaluate(eq, scope);
        result1 = Math.round(result * 10000) / 10000;
        secondGraph.resultArr.push(result1);
        secondGraph.labelsArr.push(i);
    }

    secondGraphPlot = new Chart(
        document.getElementById('second-graph-plot'),
        {
            type: 'line',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    x: {
                        title: {
                            color: 'blue',
                            display: true,
                            text: firstFactorLabel
                        }
                    },
                    y: {
                        title: {
                            color: 'blue',
                            display: true,
                            text: responseLabel
                        }
                    }
                }
            },
            data: {
                labels: secondGraph.labelsArr,
                datasets: [
                    {
                        label: responseTitle,
                        data: secondGraph.resultArr
                    }
                ]
            }
        }
    );
})

destroyGraph.addEventListener('click', () => {
    firstGraphPlot.destroy();
    secondGraphPlot.destroy();

    destroyGraph.disabled = true;
    build2dGraphicsBtn.disabled = false;
})