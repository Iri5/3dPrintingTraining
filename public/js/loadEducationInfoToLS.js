/*document.addEventListener('DOMContentLoaded', () => {
    const a = document.querySelector('#apractic');
    const taskText = a.getAttribute('tasktext');
    const educationId = a.getAttribute('edid');
    const answerId = a.getAttribute('ansid');
    const taskId = a.getAttribute('taskid');
    const userId = a.getAttribute('userid');

    localStorage.setItem('taskText', taskText);
    localStorage.setItem('educationId', educationId);
    localStorage.setItem('answerId', answerId);
    localStorage.setItem('taskId', taskId);
    localStorage.setItem('userId', userId);

})*/
let links = document.querySelectorAll('.apractic');
links.forEach(elem => {
    elem.addEventListener('click', (e) => {
        let target = e.target;
        const taskText = target.getAttribute('tasktext');
        const educationId = target.getAttribute('edid');
        const answerId = target.getAttribute('ansid');
        const taskId = target.getAttribute('taskid');
        const userId = target.getAttribute('userid');
        const courseId = target.getAttribute('courseId');

        localStorage.setItem('taskText', taskText);
        localStorage.setItem('educationId', educationId);
        localStorage.setItem('answerId', answerId);
        localStorage.setItem('taskId', taskId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('courseId', courseId);
    })
})