

async function Delete(login) {
    let lJson = JSON.stringify(login);
    fetch('/admin', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(login)
    })
        .then(function (res) {
            if (res.status == 500) {
                ModalWorkWithoutBtn("modalServerError");
            } else if (res.status == 200) {
                location.reload();

            }
            document.location.reload;
        });

}
