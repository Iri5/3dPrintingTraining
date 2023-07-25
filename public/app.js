//const { response } = require("express");

console.log("111")
document.querySelector('.new-button').addEventListener('click', () => {
    let request = new XMLHttpRequest();
    let d = tinymce.get('mytextarea').getContent;
    let myContent = tinymce.activeEditor.getContent();

    request.open("POST", "/teac", true); // true = asynchronous
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(myContent);
});
tinymce.activeEditor.uploadImages().then(() => {
    document.forms[0].submit();
});