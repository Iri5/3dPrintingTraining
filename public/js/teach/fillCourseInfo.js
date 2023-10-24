async function GetDescAndTitleCourse(id) {
    fetch('/course-info', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            currentId: id
        },
    })
        .then(res => res.json())
        .then(function (res) {
            let title = res[0].title;
            let description = res[0].description;
            fillCourseInfo(title, description);
        });
}
function fillCourseInfo(title, description){
    let divTitle = document.querySelector('.course-info__title');
    let divDesc = document.querySelector('.course-info__description');
    let btn = document.querySelector('.course-info__button_hidden');
    btn.style.display = "block";
    divTitle.innerHTML = title;
    divDesc.innerHTML =description;
}