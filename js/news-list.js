/* Página de listado de noticias */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("news-grid");
  if (!grid) return;
  grid.innerHTML = NEWS.map(
    (n) => `
    <a class="news-card" href="noticia.html?id=${n.id}">
      <span class="news-date">${formatDate(n.date)}</span>
      <h3>${n.title}</h3>
      <p>${n.excerpt}</p>
    </a>`
  ).join("");
});
