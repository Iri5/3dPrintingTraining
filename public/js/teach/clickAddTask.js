const addTaskButton = document.querySelector('#add-practical-task');
addTaskButton.addEventListener('click', LoadModels);
async function LoadModels(){
    let form = document.querySelector('#add-task');
    let select = form.querySelector('select');
    select.innerHTML = '';
    let models = await GetDataModels();
    models.forEach(elem => {
        let option = document.createElement('option');
        option.innerHTML = elem.title;
        option.value = elem.id;
        select.append(option);
    });
    let factors = await GetFactors(select.value);
    console.log(factors);
    let first_factor_legend = form.querySelector('.first_factor_legend');
    first_factor_legend.innerHTML = `${factors.first_title}, ${factors.first_units}`;
    let second_factor_legend = form.querySelector('.second_factor_legend');
    second_factor_legend.innerHTML = `${factors.second_title}, ${factors.second_units}`;

}
async function GetDataModels (){
    const result = await fetch('/model', {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
    const info = await result.json();
    if (localStorage.getItem('taskModels') != null){
        localStorage.taskModels = JSON.stringify(info);
    }
    else {
        localStorage.setItem('taskModels', JSON.stringify(info))
    }
    return info;
}
async function GetFactors(modelId){
    const result = await fetch(`/model/factors/${modelId}`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
    const factors = await result.json();

    return factors;
}