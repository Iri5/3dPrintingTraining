//const { response } = require("express");

console.log("111")
document.querySelector('.new-button').addEventListener('click', () => {
    let d = tinymce.get('mytextarea').getContent;
    console.log(d);
    let myContent = tinymce.activeEditor.getContent();
    console.log(myContent);
    
    let a = myContent;
    fetch('/curse', {

        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        },
        body: "fufufu",
    }).then(response => response.json())
    .then(function (response) {
        console.log(response);});
    console.log("mmmmmmm");
    console.log(myContent);
});
tinymce.activeEditor.uploadImages().then(() => {
    document.forms[0].submit();
});