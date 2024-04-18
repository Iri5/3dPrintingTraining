const input = document.querySelector('[name="courseid"]');
const addTestBtn = document.querySelector('.course-test__addbtn');
const addTestBtnModal = document.querySelector('#add-test');
addTestBtn.addEventListener('click', ()=>{
    input.value = localStorage.currentId; 
    addTestBtnModal.click();
})