const BASE_URL = "https://webfinalapi.mobydev.kz"

async function fetchAndRenderCategories() {
    try {
        const response = await fetch(`https://webfinalapi.mobydev.kz/categories`);
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
                onclick="deleteNews(${categories.id})"
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
document.addEventListener('DOMContentLoaded', fetchAndRenderCategories)


const del = document.querySelector('.button--delete');

del.addEventListener('click', () => {
    alert('Вы уверены что хотите удалить данную категорию?');
})

