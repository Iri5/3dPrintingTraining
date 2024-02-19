let navCourse = document.querySelector('.nav__item_course');
let navStudents = document.querySelector('.nav__item_students');
let blockCourse = document.querySelector('.teach__content_course');
let blockStudents = document.querySelector('.teach__content_students');

navCourse.addEventListener('click', (e) => {
    let isSelected = navCourse.getAttribute('selectnav');
    if (isSelected) return;
    else {
        navStudents.removeAttribute('selectnav');
        navCourse.setAttribute('selectnav', '');
        blockCourse.style.display = 'block';
        blockStudents.style.display = 'none';
    }
})
navStudents.addEventListener('click', (e) => {
    let isSelected = navStudents.hasAttribute('selectnav');
    console.log(isSelected);
    if (isSelected) return;
    else {
        navCourse.removeAttribute('selectnav');
        navStudents.setAttribute('selectnav', '');
        blockCourse.style.display = 'none';
        blockStudents.style.display = 'block';
    }
})