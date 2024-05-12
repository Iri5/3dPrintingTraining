const tasksTable = document.querySelector('.tasks');
tasksTable.addEventListener('click', (e)=>{
    const target = e.target;
    if (target.hasAttribute('data-action')){
        const action = target.getAttribute('data-action');
        if (action == 'show'){
            const taskId = target.getAttribute('taskId');
            alert(taskId);
            GetDataTaskModel(taskId)
        }
    }
})

async function GetDataTaskModel (taskId){
    const result = await fetch('/task', {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            currentId: taskId
        },
    })
    const info = await result.json();
    console.log(info)
}