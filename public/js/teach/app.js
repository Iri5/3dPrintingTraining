//const { response } = require("express");

console.log("111");
/*let id = null;
let title = document.querySelector('#title_course');
console.log("я тут"+title.innerHTML);
fetch('/teach-getcoursebyid', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: title.innerHTML
})
.then(response => response.json())
.then(function (response) {
    id = response[0];
    console.log(response[0]);
})*/
let newButton = document.querySelector('.new-button')
newButton.addEventListener('click', () => {
    let request = new XMLHttpRequest();
    let d = tinymce.get('mytextarea').getContent;

    let myContent = tinymce.activeEditor.getContent();
    let obj = {};
    obj.content = myContent;
    obj.course = localStorage.currentId;
    console.log("myuuyuy"+ obj.course)
    request.open("POST", "/teach-addmaterial", true); // true = asynchronous
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(JSON.stringify(obj));
    document.location.href = '/teach';
});
tinymce.activeEditor.uploadImages().then(() => {
    document.forms[0].submit();
});