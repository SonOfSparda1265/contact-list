console.log('скрипт работает');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
// JSON.parse — обратно из строки в массив
// || [] — если ничего нет в хранилище, берём пустой массив
saveContacts();
renderContacts();

function renderContacts(list) {
    list = list || contacts;
    document.querySelectorAll('.element__contacts').forEach(function(el) {
        el.innerHTML = '';
    });
    list.forEach(function(contact) { 
        let firstLetter = contact.name[0].toUpperCase();
        let folder = document.querySelector('#letter-' + firstLetter + ' .element__contacts');
        if (folder) {
            let div = document.createElement('div');
            div.innerHTML = `
                <p><b>Имя:</b> ${contact.name}</p>
                <p><b>Должность:</b> ${contact.vacancy}</p>
                <p><b>Телефон:</b> ${contact.phone}</p>
                <hr>
            `;
            folder.appendChild(div);
        }
    });
}


document.getElementById('btn-add').addEventListener('click', function() {
    let name = document.getElementById('name').value;
    let vacancy = document.getElementById('vacancy').value;
    let phone = document.getElementById('phone').value;

    let duplicate = contacts.find(function(c) {
        return c.phone === phone; // ищем контакт с таким же телефоном
    });

    if (duplicate) {
        alert('Контакт с таким номером уже существует');
        return; // прерываем выполнение, ничего не добавляем
    }
    contacts.push({ name: name, vacancy: vacancy, phone: phone });
    // push — добавляет элемент в конец массива
    // {} — объект, как словарь в Python

    renderContacts(); // смотрим что накопилось в массиве
    saveContacts();
});
document.querySelectorAll('.element__header').forEach(function(header) {
    header.addEventListener('click', function() {
        let contacts = header.nextElementSibling; // следующий элемент после заголовка
        contacts.classList.toggle('open'); // toggle — добавляет класс если нет, убирает если есть
    });
});

document.getElementById('btn-clear').addEventListener('click', function() {
    contacts = []; // очищаем массив
    renderContacts(); // перерисовываем — все папки опустеют
});
document.getElementById('btn-search').addEventListener('click', function() {
    let query = document.getElementById('name').value.toLowerCase();
    // toLowerCase — приводим к нижнему регистру чтобы поиск не зависел от регистра

    let filtered = contacts.filter(function(c) {
        return c.name.toLowerCase().includes(query);
        // includes — проверяет содержит ли строка подстроку
    });

    renderContacts(filtered); // передаём отфильтрованный массив
});
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // JSON.stringify — превращает массив в строку для хранения
}