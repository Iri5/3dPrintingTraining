async function Delete(ob) {
    
    let data = {
        myId: ob[0]
    }
    let jso = JSON.stringify(data);
    
    fetch(`${ob[1]}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: jso
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
