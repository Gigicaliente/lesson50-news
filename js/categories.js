const BASE_URL = "https://webfinalapi.mobydev.kz";

async function deleteCategory(id) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Авторизуйтесь для удаления!");
        return;
    }

    const isConfirmed = confirm("Вы уверены что хотите удалить данную категорию?");
    if(!isConfirmed) return;

    try {
        const response = await fetch(`${BASE_URL}/categoty/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            alert('Категория успешно удалена.');
            fetchAndRenderCategories();
        } else {
            alert('Ошибка при удалении категории.');
        }
    } catch (error) {
        console.error('Ошибка', error);
    }
}


async function fetchAndRenderCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const categoriesArray = await response.json();
        document.querySelector('.categories__box').innerHTML = categoriesArray.map(categories => `
              <div class="categories">
            <h3 class="categories__title">${categories.name}</h3>
            <div class="categories__actions">
                <a
                href="./editCategory.html?id=${categories.id}"
                class="button button--blue button--small"
            >
                Редактировать
            </a>
            <button
                type="button"
                class="button button--red button--small"
                onclick="deleteCategory(${categories.id})"
            >
                Удалить
            </button>
            </div>
            </div>
            `).join('');

    } catch (error) {
        console.error('Ошибка при получении категорий', error);
    }
};


function setupActionButtons() {
    const authToken = localStorage.getItem("authToken");

    const headerAuth = document.querySelector(".header__auth");
    if (authToken) {
        headerAuth.innerHTML = `<button class="button button--red" onclick="logout()">Выйти</button>`;
    }

    document.querySelectorAll(".categories__actions .button--blue").forEach(link => {
        link.addEventListener("click", event => {
            if (!authToken) {
                event.preventDefault();
                alert("Авторизуйтесь для редактирования.");
            }
        });
    });

    document.querySelectorAll(".categories__actions .button--red").forEach(button => {
        button.addEventListener("click", () => {
            if (!authToken) return alert("Авторизуйтесь для удаления.");
        });
    });
}

function displayCreateCategory() {
    if (localStorage.getItem("authToken")) {
        const createButton = document.createElement("button");
        createButton.className = "button button--green";
        createButton.textContent = "+";
        createButton.onclick = () => (window.location.href = "./createCategory.html");
        document.querySelector('.categories__box').before(createButton);

    }
}

function logout() {
    localStorage.removeItem("authToken");
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    setupActionButtons();
    fetchAndRenderCategories();
    displayCreateCategory();
   
});