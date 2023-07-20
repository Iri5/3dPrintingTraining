
console.log("111")
document.querySelector('.new-button').addEventListener('click', () => {
    let d = tinymce.get('mytextarea').getContent;
    console.log(d);
    let myContent = tinymce.activeEditor.getContent();
    console.log(myContent);
let a = {
    
};
a.text = myContent;
    let response = fetch('/curse', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(a)
    });
    console.log("mmmmmmm");
});
tinymce.activeEditor.uploadImages().then(() => {
    document.forms[0].submit();
});