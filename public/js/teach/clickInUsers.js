let courseTable = document.querySelector('#courses');

let btnClick = document.querySelector('.course-info__button');
courseTable.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName != 'DIV') {
        return;
    } else if (target.dataset.action == "show") {
      
        let id = target.parentElement.parentElement.getAttribute("userId");
       
        if(!localStorage.hasOwnProperty('currentId')){
            localStorage.setItem('currentId', id);
        }
        else {
            localStorage.currentId = id;
        }
       let a = btnClick.querySelector('a');
       a.href = `/detailcourse?courseID=${localStorage.currentId}`;
        GetDescAndTitleCourse(id);
        
    } else if (target.dataset.action == "delete") {
        let id = target.parentElement.parentElement.getAttribute("userId")
        if(!localStorage.hasOwnProperty('currentId')){
            localStorage.setItem(currentId, id);
        }
        else {
            localStorage.currentId = id;
        }
        DeleteCourse(id);
    }
})