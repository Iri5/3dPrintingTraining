let tableStudents = document.querySelector('#students');
tableStudents.addEventListener('click', (e)=>{
    let target = e.target;
    if (target.hasAttribute('studId')){
        const id = target.getAttribute('studId');
        localStorage.studentid = id;
        const a = target.querySelector('a');
        a.click();
    }
})