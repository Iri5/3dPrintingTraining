function serializeForm(formNode) {
    let dataToServer = {};
    dataToServer.login = formNode.auth_login.value;
    dataToServer.pass = formNode.auth_pass.value;
    dataToServer = JSON.stringify(dataToServer);
    return dataToServer;
}
async function sendData(data) {
    return await fetch('/auth', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: data
    })
}
function onError() {
    ModalWorkWithoutBtn("my-modal-auth");
}
async function handleFormSubmit(event) {
    event.preventDefault();
    const data = serializeForm(event.target);
    
    const response = await sendData(data);
    if (response.status === 403) {
        onError();
    } else if (response.status === 200) {
        let user = await response.json();
        console.log(user);
        if (user.role == 3){
            const {url} = await fetch('/admin');
            //console.log(redirected);
            console.log(url);
            window.location.href = url;
        } else if (user.role == 2){
            const {url} = await fetch('/teach');
            //console.log(redirected);
            console.log(url);
            window.location.href = url;
        }

        if (response.redirected) {
            window.location.href = url;
        }
    } else if (response.status === 205){
        alert('Запрос прошел');
    }
}
const form = document.querySelector(".auth__form");
form.addEventListener("submit", handleFormSubmit);