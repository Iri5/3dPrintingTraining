
let te = 'Te';
let show = document.querySelector('.surface-plot_show-btn');
show.addEventListener('click', () => {

    let factorsDOM = document.querySelectorAll(`input[type='range']`);
    let firstFactor = {
        title: factorsDOM[0].getAttribute('comp'),
        min: factorsDOM[0].min,
        max: factorsDOM[0].max,
    }
    let secondFactor = {
        title: factorsDOM[1].getAttribute('comp'),
        min: factorsDOM[1].min,
        max: factorsDOM[1].max,
    }
    let responseTitle = document.querySelector(`#result`).getAttribute('comp-result');
    let z = [];
    let scope = {
    };
    let x = [];
    let y = [];

    let newZ = [];
    let newX = [];
    let newY = [];
    for (let i = +firstFactor.min; i < +firstFactor.max+1; i+=2){
        newX.push(i);
    }
    for (let i = +secondFactor.min; i < +secondFactor.max+1; i+=2){
        newY.push(i);
    }
    for (let i = +secondFactor.min; i < +secondFactor.max+1; i+=2) {
        let newZOne = [];
        for (let j = +firstFactor.min; j < +firstFactor.max+1; j+=2) {
            
            scope[firstFactor.title] = j;
            scope[secondFactor.title] = i;
            let eq = localStorage.currentEquip
            let result = math.evaluate(eq, scope);
            z1 = Math.round(result * 10000) / 10000;
            //z[i].push(z1);
            newZOne.push(result);
        }
        newZ.push(newZOne);
    }


    var data_z1 = {
        x: newX,
        y: newY,
        z: newZ,
        type: 'surface',
        opacity: 0.8,
        colorscale: 'Viridis',
        showscale: false,
        hovertemplate:
            firstFactor.title + ": %{x}<br>" +
            secondFactor.title + ": %{y}<br>" +
            responseTitle + ": %{z}<br>"
    };
    let unit = 'МПа'
    if(responseTitle == 'm'){
        unit = 'кг/м³ · 10⁶';
    }
    var layout = {
        hoverlabel: { bgcolor: "#FFF" },
        scene: {
            xaxis: {
                title: firstFactor.title + ", °C",
                ticks: 'outside',
                color: 'red',
            },
            zaxis: {
                title: responseTitle + ", " + unit,
                color: 'green',
                nticks: 10,
                ticks: 'outside',
            },
            yaxis: {
                title: secondFactor.title + ", %",
                ticks: 'outside',
                color: 'blue',
            }
        },
        autosize: true,
        margin: {
            t: 0,
            r: 0,
            l: 0,
            b: 0,
        }
    }
    console.log(data_z1);


    Plotly.newPlot('myDiv', [data_z1], layout);
    let div = document.querySelector('#myDiv');
    show.style.display = 'none';
    div.style.display = 'block';
})
