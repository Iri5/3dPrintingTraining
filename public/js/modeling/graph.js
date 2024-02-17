
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

    for (let i = +firstFactor.min; i < +firstFactor.max; i++) {
        for (let j = +secondFactor.min; j < +secondFactor.max; j++) {
            x.push(i);
            y.push(j);
            scope[firstFactor.title] = i;
            scope[secondFactor.title] = j;
            let eq = localStorage.currentEquip
            let result = math.evaluate(eq, scope);
            z1 = Math.round(result * 10000) / 10000;
            //z[i].push(z1);
            z.push(z1);
        }
    }
    console.log(scope);
    console.log('x');
    console.log(x);
    console.log('y');
    console.log(y);
    console.log('z');
    console.log(z);


    var data_z1 = {
        x: x,
        y: y,
        z: z,
        type: 'mesh3d',
        colorscale: [
            ['0.0', '#051923'],
            ['0.222222222222', '#003554'],
            ['0.444444444444', '#006494'],
            ['0.666666666667', '#0582ca'],
            ['0.888888888889', '#00a6fb'],
            ['1.0', '#07beb8']
        ],
        showscale: false,
        hovertemplate:
            firstFactor.title + ": %{x}<br>" +
            secondFactor.title + ": %{y}<br>" +
            responseTitle + ": %{z}<br>"
    };
    let unit = 'МПа'
    if(responseTitle == 'm'){
        unit = 'кг';
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
