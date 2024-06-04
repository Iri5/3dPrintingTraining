const tasksTable = document.querySelector('.tasks');
tasksTable.addEventListener('click', ClickInTasksTable)
async function ClickInTasksTable(e){
    const target = e.target;
    if (target.hasAttribute('data-action')){
        const action = target.getAttribute('data-action');
        if (action == 'show'){
            const taskId = target.getAttribute('taskId');

            let info = await GetDataTaskModel(taskId);
            FillEditTask(info);
            ModalWorkWithoutBtn("modal_edit_task")
        }
        else if (action == 'delete'){
            const taskId = target.getAttribute('taskId');
            DeleteTask(taskId);
        }
    }
}
function FillEditTask(task){
    console.log(task)
    let modal = document.querySelector('#modal_edit_task');
    let modalHeader = modal.querySelector('.modal_header');
    modalHeader.innerHTML = `
    <div class="modal_close modal_close_white"></div>
                    Практическое задание № ${task.number}`;
    let inputId = modal.querySelector('input[name=id]');
    inputId.value = task.id;
    let textarea = modal.querySelector('textarea');
    textarea.innerHTML = task.text;
    let modelTitle = modal.querySelector('.model_title');
    modelTitle.innerHTML = task.title;
    let firstFactorLegend = modal.querySelector('.first_factor_legend');
    firstFactorLegend.innerHTML = `${task.ftitle}`;
    let secondFactorLegend = modal.querySelector('.second_factor_legend')
    secondFactorLegend.innerHTML = task.stitleж
    let first_factor_from = modal.querySelector('input[name=first_factor_from]');
    first_factor_from.value = task.answers.firstfactor.min;
    let first_factor_to = modal.querySelector('input[name=first_factor_to]');
    first_factor_to.value = task.answers.firstfactor.max;
    let second_factor_from = modal.querySelector('input[name=second_factor_from]');
    second_factor_from.value = task.answers.secondfactor.min;
    let second_factor_to = modal.querySelector('input[name=second_factor_to]');
    second_factor_to.value = task.answers.secondfactor.max;
;}
async function GetDataTaskModel (taskId){
    const result = await fetch('/task', {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            currentId: taskId
        },
    })
    const info = await result.json();
    return info;
}
async function DeleteTask (taskId){
    const result = await fetch('/task', {
        method: 'delete',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            currentId: taskId
        },
    })
    
    console.log(result.status);
    window.location.reload();
}

const editForm = document.querySelector('#edit_practical_task_form');
editForm.addEventListener('submit', FetchPutTask)

async function FetchPutTask(e){
    e.preventDefault();
    let target = e.target;
    let idInput = target.querySelector('input[name=id]');
    let textarea = target.querySelector('textarea');
    let first_factor_from = target.querySelector('input[name=first_factor_from]');
    let first_factor_to = target.querySelector('input[name=first_factor_to]');
    let second_factor_from = target.querySelector('input[name=second_factor_from]');
    let second_factor_to = target.querySelector('input[name=second_factor_to]');
    let answers = {
        firstfactor: {
            max: first_factor_to.value,
            min: first_factor_from.value
        },
        secondfactor: {
            max: second_factor_to.value,
            min: second_factor_from.value
        }
    }
    let Janswers = JSON.stringify(answers);
    let info = {
        text: textarea.value,
        id: idInput.value,
        answers: Janswers
    }
    const result = await fetch('/task', {
        method: 'put',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(info)
    })
    if (result.status == 200){
        window.location.reload();
    }
}