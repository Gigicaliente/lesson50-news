const BASE_URL = "https://webfinalapi.mobydev.kz/news"

async function fetchAndRenderNews() {
    try {
        const response = await fetch("https://webfinalapi.mobydev.kz/news");
        if (!response.ok) throw new Error(`Ошибка HTTP: {response.status}`)

            const newsArray = await response.json();
            document.querySelector('.news-grid').innerHTML = newsArray.map(news => `
                <article class="news-card">
                <div class="news-card__image">
                    <img src="${BASE_URL}${news.thumbnail.startsWith('/') ? '' : '/'}${news.thumbnail}" alt="${news.title}" />
                </div>
                
                <div class="news-card__content">
                    <a class="news-card__link" href="./detail-news.html?id= ${news.id}">
                        <h2 class="news-card__title">
                            ${news.title}
                        </h2>
                        <p class="news-card__attributes">
                            ${news.createadAt}  ${news.category.name || "Категория"}
                        </p>
                    </a>
                </div>
                <div class="news-card__author">
                    <div class="user">
                        <div class="user__avatar">
                            <img src= "./img/avatar.jpeg" alt="avatar" 
                            />
                        </div>
                        <p class="user__name"> ${news.author.name|| "Unknown"}</p>
                    </div>
                </div>

                <div class="news-card__actions">
                    <a href="./edit-news.html?id= ${news.id}" class="button button--blue button--small">Редактировать</a>
                    <button type="button" class="button button--small button--red" onclick="deleteNews(${news.id})"> Удалить </button>
                </div>
             </div>
            </div>
            </article>
                `).join('')
    } catch (error) {
        console.error('Ошибка при получении новостей', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchAndRenderNews)