async function DeleteTest(id) {
    alert('deleteee');
    fetch('/test', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            currentId: id
        },
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