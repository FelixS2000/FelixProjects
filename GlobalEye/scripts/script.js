const apiKey = "b861bc848f6246f093e7c6bf3aee81c5";

// Fetch breaking news
fetch(`https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const breakingNewsList = document.getElementById("breaking-news-list");
    data.articles.forEach(article => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="${article.url}">${article.title}</a>`;
      breakingNewsList.appendChild(listItem);
    });
  });

// Fetch featured articles (replace with desired category)
fetch(`https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const featuredArticlesList = document.getElementById("featured-articles-list");
    data.articles.forEach(article => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="${article.url}">
          <img src="${article.urlToImage}" alt="${article.title}">
          <h3>${article.title}</h3>
        </a>`;
      featuredArticlesList.appendChild(listItem);
    });
  });
