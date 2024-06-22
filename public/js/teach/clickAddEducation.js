const addEducationButton = document.querySelector('.add_education_btn');

addEducationButton.addEventListener('click', ClickAddEducation);
async function ClickAddEducation() {
    const form = document.querySelector('#add_education_form');
    form.innerHTML = `<input type="number" name="id" style="display: none;">
    <button type="button" class="select_course_btn">Выбрать курс</button>
    <button type="button" class="select_practic_btn">Выбрать практическое задание</button>`;
    let selectCourseBtn = form.querySelector('.select_course_btn');
    selectCourseBtn.addEventListener('click', ClickSelectCourseBtn);
    let selectPracticBtn = form.querySelector('.select_practic_btn');
    selectPracticBtn.addEventListener('click', ClickSelectPracticBtn);
    let studentId = localStorage.studentid;
    let info = {
        id: studentId
    }
    let Jinfo = JSON.stringify(info);
    const result = await fetch(`/education`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: Jinfo
    })
    const result1 = await result.json();
    console.log(result1.insert);
    let inputId = form.querySelector('input[name=id]');
    inputId.value = result1.insert;
    ModalWorkWithoutBtn('modal_add_education')
}
async function ClickSelectCourseBtn1(e) {
    ModalWorkWithoutBtn('modal_add_education_course');
    const form = document.querySelector('#add_course_education_form');
    let courses = await GetCoursesFetch();
    let selectCourse = form.querySelector('select');
    selectCourse.innerHTML = '';
    courses.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.title;
        selectCourse.append(option);
    });
    let inputIdCourse = form.querySelector('input[name=id]');
    inputIdCourse.value = document.querySelector('#education_id_on_show').value;
}
async function ClickSelectPracticBtn1(e) {
    ModalWorkWithoutBtn('modal_add_education_practic');
    const form = document.querySelector('#add_practic_education_form');
    let practics = await GetPracticsFetch();
    let selectPractics = form.querySelector('select');
    selectPractics.innerHTML = '';
    practics.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = '№' + element.number;
        option.title = element.text
        selectPractics.append(option);
    });
    let inputIdPractic = form.querySelector('input[name=id]');
    inputIdPractic.value = document.querySelector('#education_id_on_show').value;
}
async function ClickSelectCourseBtn(e) {
    ModalWorkWithoutBtn('modal_add_education_course');
    const form = document.querySelector('#add_course_education_form');
    let courses = await GetCoursesFetch();
    let selectCourse = form.querySelector('select');
    selectCourse.innerHTML = '';
    courses.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.title;
        selectCourse.append(option);
    });
    let modalCommon = document.querySelector('#modal_add_education');
    let inputIdBefore = modalCommon.querySelector('input[name=id]');
    let inputIdCourse = form.querySelector('input[name=id]');
    inputIdCourse.value = inputIdBefore.value;
    /*e.target.after(selectCourse);
    e.target.remove();
    let formBtn = document.querySelector('.form_button_save_education');
    if (formBtn == undefined) {
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.classList.add('form_button');
        saveBtn.classList.add('form_button_save_education');
        saveBtn.innerHTML = 'Сохранить';
        saveBtn.addEventListener('click', ClickSaveEducationBtn);
        form.append(saveBtn);
    }*/
}
save_select_course_btn = document.querySelector('.save_select_course_btn');
save_select_course_btn.addEventListener('click', ClickSaveCourseEducationBtn);
save_select_practic_btn = document.querySelector('.save_select_practic_btn');
save_select_practic_btn.addEventListener('click', ClickSavePracticEducationBtn)
async function GetCoursesFetch() {
    const result = await fetch(`/course`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
    const courses = await result.json();
    return courses;
}


async function ClickSelectPracticBtn(e) {
    ModalWorkWithoutBtn('modal_add_education_practic');
    const form = document.querySelector('#add_practic_education_form');
    let practics = await GetPracticsFetch();
    let selectPractics = form.querySelector('select');
    selectPractics.innerHTML = '';
    practics.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = '№' + element.number;
        option.title = element.text
        selectPractics.append(option);
    });
    let modalCommon = document.querySelector('#modal_add_education');
    let inputIdBefore = modalCommon.querySelector('input[name=id]');
    let inputIdPractic = form.querySelector('input[name=id]');
    inputIdPractic.value = inputIdBefore.value;
}
async function GetPracticsFetch() {
    const result = await fetch(`/tasks/select`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
    const practics = await result.json();
    return practics;
}
async function ClickSavePracticEducationBtn() {
    const form = document.querySelector('#add_practic_education_form');
    let selectPractic = form.querySelector('select[name=practic]');
    let inputIdForm = form.querySelector('input[name=id]');
    let info = {
        id: inputIdForm.value,
        practic: null,
    }
    if (selectPractic != undefined) {
        info.practic = selectPractic.value;
    }
    let Jinfo = JSON.stringify(info);
    FetchPutPracticEducation(Jinfo);
}
async function ClickSaveCourseEducationBtn() {
    const form = document.querySelector('#add_course_education_form');
    let selectCourse = form.querySelector('select[name=course]');
    let inputIdForm = form.querySelector('input[name=id]');
    let info = {
        id: inputIdForm.value,
        course: null,
    }
    if (selectCourse != undefined) {
        info.course = selectCourse.value;
    }
    let Jinfo = JSON.stringify(info);
    FetchPutCourseEducation(Jinfo);
}
async function FetchPutPracticEducation(info) {
    const result = await fetch(`/education/practic`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: info
    })
    if (result.status == 200) {
        let modal = document.querySelector("#modal_add_education_practic");
        let close = modal.querySelector('.modal_close');
        close.click();
        let courseBtn = document.querySelector('.select_practic_btn');
        courseBtn.setAttribute('disabled', true);
    }
}
async function FetchPutCourseEducation(info) {
    const result = await fetch(`/education/course`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: info
    })
    if (result.status == 200) {
        let modal = document.querySelector("#modal_add_education_course");
        let close = modal.querySelector('.modal_close');
        close.click();
        let courseBtn = document.querySelector('.select_course_btn');
        courseBtn.setAttribute('disabled', true);
    }
}

let modal_add_education = document.querySelector('#modal_add_education');
let close_modal_add_education = modal_add_education.querySelector('.modal_close');
close_modal_add_education.addEventListener('click', ()=>{
    modal_add_education.style.display = 'none';
    window.location.reload();
})
window.onclick = function (event) {
    if (event.target == modal_add_education) {
        modal_add_education.style.display = 'none';
    window.location.reload();

    }
}
