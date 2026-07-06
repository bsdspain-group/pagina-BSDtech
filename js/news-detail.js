/* Página de detalle de noticia */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const article = getNewsById(id);
  const container = document.getElementById("news-detail");
  if (!container) return;

  if (!article) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Artículo no encontrado</h2>
        <p>El artículo que buscas no existe o ha sido movido.</p>
        <a class="btn btn-primary" href="noticias.html">Volver a noticias</a>
      </div>`;
    return;
  }

  document.title = `${article.title} — BSDtech`;
  container.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">Inicio</a> &gt;
      <a href="noticias.html">Noticias</a> &gt;
      <span>${article.title}</span>
    </nav>
    <article class="news-article">
      <span class="news-date">${formatDate(article.date)}</span>
      <h1>${article.title}</h1>
      <div class="news-body">${article.body}</div>
    </article>
    <a class="btn btn-outline" href="noticias.html">&lt; Volver a noticias</a>
  `;
});
