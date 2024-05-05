let editForm = document.querySelector("#edit-form");
editForm.addEventListener('submit', CourseEdit);
async function CourseEdit(e) {
    e.preventDefault();
    let form = e.target;
    let dataToSend = {};
    dataToSend.title = form.title.value;
    dataToSend.description = form.description.value;
    dataToSend.id = localStorage.currentId;
    fetch('/course', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(dataToSend)
    })
        .then(function (res) {
            if (res.status == 200) {
                let modal = document.querySelector("#editCourse");
                modal.style.display = 'none';
                location.reload();
            }
        })
}