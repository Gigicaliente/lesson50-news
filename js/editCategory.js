function getCategoriesIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const categoriesId = getCategoriesIdFromUrl();

const BASE_URL = "https://webfinalapi.mobydev.kz";

async function fetchAndRenderCategoriesById(categoriesId) {
    try {
        const response = await fetch(`${BASE_URL}/categories/${categoriesId}`);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const news = await response.json();
       
        document.querySelector('#categoryName').textContent = categories.name;
    

    } catch (error) {
        console.error('Ошибка при получении категории', error);
        }
    }


document.addEventListener('DOMContentLoaded', () => {
    const categoriesId = getCategoriesIdFromUrl();
    if (categoriesId) {
    fetchAndRenderCategoriesById(categoriesId)
    } else {
     console.error('Id категории не найден');
    }

    })


