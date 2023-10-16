function IsLoginNew(currentLogin) {
    let logins = document.querySelectorAll('.login');
    let loginsArray = [];
    for (let login of logins) {
        loginsArray.push(login.innerHTML.trim());
    }
    if (loginsArray.includes(currentLogin)) {
        return false;
    } else {
        return true;
    }
}