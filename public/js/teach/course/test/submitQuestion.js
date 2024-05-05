const questionForms = document.querySelectorAll('.question__container > form');
questionForms.forEach(form => AddELSubmitFormQue(form))
function AddELSubmitFormQue(form){
    form.addEventListener('submit', e => {
        e.preventDefault();
        let submitter = e.submitter;
        if (submitter.value == 'save') {
            const typeInput = form.querySelector('input[name="type"]');
            const type = typeInput.value;
            let data = null;
            if (type == 1) data = getDataSingleAnsQue(form);
            if (type == 2) data = getDataMultipleAnsQue(form);
            if (type == 3) data = getDataShortAnsQue(form);
            console.log(data)
            UpdateQuestion(data)
        }
        if (submitter.value == 'delete') {
            const idInput = form.querySelector('input[name="id"]');
            const id = idInput.value;
            DeleteQuestion(id)
        };
    })
}
async function DeleteQuestion(id){
    const result = await fetch('/question', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({id: id})
    }) 
    console.log('result');
    console.log(result.status);
}
async function UpdateQuestion(data){
    const result = await fetch('/question', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    })
    console.log('result');
    console.log(result.status);
}
function getDataSingleAnsQue(form) {
    const inputs = form.querySelectorAll('input[class="simple"');
    let data = {}
    inputs.forEach(input => {
        data[input.name] = input.value;
    })
    const textarea = form.querySelector('textarea');
    data[textarea.name] = textarea.value;
    const radioContainers = form.querySelectorAll('.radio-container');
    data.count_var = radioContainers.length;
    let ans = [];
    radioContainers.forEach(cont => {
        let answer = {
            text: null,
            right: null
        };
        const radio = cont.querySelector('input[type="radio"]');
        if (radio.checked) answer.right = 1
        else answer.right = 0
        const input = cont.querySelector('input[forradio]');
        answer.text = input.value;
        ans.push(answer)
    })
    data.ans = ans;
    console.log(data)
    return data;
}
function getDataMultipleAnsQue(form) {
    const inputs = form.querySelectorAll('input[class="simple"]');
    let data = {}
    inputs.forEach(input => {
        data[input.name] = input.value;
    })
    const textarea = form.querySelector('textarea');
    data[textarea.name] = textarea.value;
    const checkContainers = form.querySelectorAll('.check-container');
    data.count_var = checkContainers.length;
    let ans = [];
    checkContainers.forEach(cont => {
        let answer = {
            text: null,
            right: null
        };
        const check = cont.querySelector('input[type="checkbox"]');
        if (check.checked) answer.right = 1
        else answer.right = 0
        const input = cont.querySelector('input[forcheck]');
        answer.text = input.value;
        ans.push(answer)
    })
    data.ans = ans;
    console.log(data)
    return data;
}
function getDataShortAnsQue(form) {
    const inputs = form.querySelectorAll('input[class="simple"]');
    let data = {}
    inputs.forEach(input => {
        data[input.name] = input.value;
    })
    const textarea = form.querySelector('textarea');
    data[textarea.name] = textarea.value;
    data.count_var = 1;
    const answerInput = form.querySelector('input[answer]');
    
    let ans = [
        {
            text: answerInput.value,
            right: 1
        }
    ];
    data.ans = ans;
    console.log(data)
    return data;
}