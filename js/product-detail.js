/* Página de detalle de producto */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id);
  const container = document.getElementById("product-detail");
  if (!container) return;

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido retirado del catálogo.</p>
        <a class="btn btn-primary" href="productos.html">Volver al catálogo</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — BSDtech`;
  const catInfo = CATEGORIES.find((c) => c.slug === product.category);

  container.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">Inicio</a> &gt;
      <a href="productos.html?cat=${product.category}">${catInfo.name}</a> &gt;
      <span>${product.name}</span>
    </nav>
    <div class="product-detail-layout">
      <div class="product-detail-visual">
        ${categoryIcon(catInfo.icon, "product-detail-icon")}
      </div>
      <div class="product-detail-info">
        <span class="tag">${catInfo.name}</span>
        <h1>${product.name}</h1>
        <p class="product-detail-tagline">${product.tagline}</p>
        <p>${product.description}</p>
        <ul class="spec-list">
          <li><strong>Potencia</strong><span>${product.power}</span></li>
          <li><strong>Área de trabajo</strong><span>${product.area}</span></li>
          <li><strong>Espesor de corte</strong><span>${product.thickness}</span></li>
        </ul>
        <div class="product-detail-actions">
          <a class="btn btn-primary" href="contacto.html?producto=${encodeURIComponent(product.name)}">Solicitar presupuesto</a>
          <a class="btn btn-outline" href="productos.html?cat=${product.category}">Ver gama completa</a>
        </div>
      </div>
    </div>
    <div class="product-features">
      <h2>Características principales</h2>
      <ul>
        ${product.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
    </div>
  `;
});
