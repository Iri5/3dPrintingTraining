const { format } = require("mysql2");

let f = 123;
f = document.querySelector('.form_addperson_style');
console.log("xcfgbhj");
console.log(f);
f.onsubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(f) // Сборка формы 
    console.log(data);
    let url = '/addpersone';
}
    /*function sub(){
    let data = new FormData(f) // Сборка формы
    console.log(data);
    let url = '/addpersone';
    /*fetch(url, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: data // Отправка самой формы
    })
        .then(response => response.json())
        .then((json) => { // Ответ
            if (json.id === 101) { // Для примера проверка пройдена если id === 101
                // Добавление поля
                let info = document.querySelector('.info');
                info.style.display = 'block';
                info.innerText = 'Удачно Отправлено'
            }
            // Дебаг узнать что прошла форма
            console.log(json)
        })
        .catch(err => console.log(err));
        return false;
        */
    //}*/
/*f.addEventListener('onsubmit', function (e) {
    console.log("xcfgbhj");
    e.preventDefault();
    })*/