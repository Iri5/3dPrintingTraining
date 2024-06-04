document.addEventListener('DOMContentLoaded', ()=>{
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

})