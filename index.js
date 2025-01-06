// Select elements
const newsFeed = document.getElementById('news-feed');
const loadMoreButton = document.getElementById('load-more');
const categories = document.querySelectorAll('.categories li');

// API Configuration
const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '0702c796940f409099c232c1c508c81d'; // Replace with your API key
let currentPage = 1;
let currentCategory = 'all';

// Fetch News Function
async function fetchNews(category = 'all', page = 1) {
  const categoryParam = category !== 'all' ? `&category=${category}` : '';
  const response = await fetch(`${API_URL}?country=us${categoryParam}&page=${page}&apiKey=${API_KEY}`);
  const data = await response.json();
  return data.articles;
}

// Render News
function renderNews(articles) {
  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card');

    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
      <div class="content">
        <h3>${article.title}</h3>
        <p>${article.description || 'No description available.'}</p>
      </div>
    `;

    newsFeed.appendChild(newsCard);
  });
}

// Load Initial News
async function loadInitialNews() {
  const articles = await fetchNews(currentCategory, currentPage);
  renderNews(articles);
}
loadInitialNews();

// Load More News
loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  const articles = await fetchNews(currentCategory, currentPage);
  renderNews(articles);
});

// Category Filtering
categories.forEach(category => {
  category.addEventListener('click', async () => {
    categories.forEach(cat => cat.classList.remove('active'));
    category.classList.add('active');
    currentCategory = category.dataset.category;
    currentPage = 1;
    newsFeed.innerHTML = ''; // Clear current feed
    const articles = await fetchNews(currentCategory, currentPage);
    renderNews(articles);
  });
});
