const authToken = localStorage.getItem("authToken");

const headerAuth = document.querySelector(".header__auth");
if (authToken) {
    headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;
}

document.querySelector('.button--blue').addEventListener('click', async (event) => {

    const name = document.getElementById('categoryName').value;

    if (!name) {
        alert('Пожалуйста, заполните поле');
        return;
    }

    const formData = new FormData();
    formData.append('categoryName', name);
    
    try {
        const response = await fetch('https://webfinalapi.mobydev.kz/category', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authToken}`,
                'Accept': 'application/json',
            },
            body: formData
        });

        if (response.ok) {
            alert('Категория успешно добавлена!');
            window.location.href = './categories.html';
        } else {
            alert("Ошибка при добавлении категории!");
        }
    } catch (error) {
        console.error('Ошибка', error);
    }
});