/* Lógica específica de la página de inicio: pestañas de categorías y noticias destacadas */

document.addEventListener("DOMContentLoaded", () => {
  initCategoryTabs();
  renderFeaturedNews();
  initCounters();
});

function initCategoryTabs() {
  const tabs = document.querySelectorAll(".cat-tab");
  const panel = document.getElementById("cat-panel");
  if (!tabs.length || !panel) return;

  function renderCategory(slug) {
    const products = getProductsByCategory(slug).slice(0, 2);
    const catName = getCategoryName(slug);
    panel.innerHTML = `
      <div class="cat-panel-inner">
        <div class="cat-panel-info">
          <h3>${catName}</h3>
          <p>${products[0] ? products[0].description : ""}</p>
          <a class="btn btn-outline" href="productos.html?cat=${slug}">Ver toda la gama ${catName.toLowerCase()} &gt;</a>
        </div>
        <div class="cat-panel-products">
          ${products
            .map(
              (p) => `
            <a class="product-mini-card" href="producto.html?id=${p.id}">
              <div class="product-mini-icon">${categoryIcon(
                CATEGORIES.find((c) => c.slug === p.category).icon
              )}</div>
              <div>
                <h4>${p.name}</h4>
                <p>${p.tagline}</p>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </div>
    `;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderCategory(tab.dataset.cat);
    });
  });

  renderCategory(tabs[0].dataset.cat);
}

function renderFeaturedNews() {
  const container = document.getElementById("featured-news");
  if (!container) return;
  const items = NEWS.slice(0, 3);
  container.innerHTML = items
    .map(
      (n) => `
    <a class="news-card" href="noticia.html?id=${n.id}">
      <span class="news-date">${formatDate(n.date)}</span>
      <h3>${n.title}</h3>
      <p>${n.excerpt}</p>
    </a>`
    )
    .join("");
}

function initCounters() {
  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = parseInt(el.dataset.counter, 10);
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 25);
  });
}
