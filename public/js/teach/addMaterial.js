let addMaterial = document.querySelector('.course-material__add-icon');
addMaterial.addEventListener('click', () => {
    let titleCourse = document.querySelector('.course__title');
    titleCourse = titleCourse.innerHTML.trim();
    localStorage.titleCourse = titleCourse;
    let a = addMaterial.querySelector('a');
    a.click();
})