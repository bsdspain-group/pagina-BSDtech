/* Página de catálogo: filtrado por categoría */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get("cat") || "todos";
  initCatalogFilters(initialCat);
});

function initCatalogFilters(initialCat) {
  const filters = document.querySelectorAll(".filter-chip");
  const grid = document.getElementById("product-grid");
  const heading = document.getElementById("catalog-heading");
  if (!filters.length || !grid) return;

  function render(slug) {
    const products = getProductsByCategory(slug);
    heading.textContent = slug === "todos" ? "Todos los productos" : getCategoryName(slug);
    grid.innerHTML = products
      .map(
        (p) => `
      <a class="product-card" href="producto.html?id=${p.id}">
        <div class="product-card-icon">${categoryIcon(
          CATEGORIES.find((c) => c.slug === p.category).icon
        )}</div>
        <h3>${p.name}</h3>
        <p class="product-card-tagline">${p.tagline}</p>
        <ul class="product-card-specs">
          <li><strong>Potencia:</strong> ${p.power}</li>
          <li><strong>Área de trabajo:</strong> ${p.area}</li>
        </ul>
        <span class="btn btn-outline btn-small">Ver detalle &gt;</span>
      </a>`
      )
      .join("");
  }

  filters.forEach((chip) => {
    chip.addEventListener("click", () => {
      filters.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      render(chip.dataset.cat);
      history.replaceState(null, "", chip.dataset.cat === "todos" ? "productos.html" : `productos.html?cat=${chip.dataset.cat}`);
    });
  });

  const activeChip = Array.from(filters).find((c) => c.dataset.cat === initialCat) || filters[0];
  filters.forEach((c) => c.classList.remove("is-active"));
  activeChip.classList.add("is-active");
  render(activeChip.dataset.cat);
}
