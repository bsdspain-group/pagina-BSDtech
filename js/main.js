/* Funcionalidad compartida: navegación, chat widget, contador, año de footer */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNavLink();
  initFooterYear();
  initChatWidget();
  initConsultaForm();
  initCounters();
});

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.classList.toggle("is-active", isOpen);
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a[data-page]").forEach((link) => {
    if (link.dataset.page === path) {
      link.classList.add("is-active");
    }
  });
}

function initFooterYear() {
  const el = document.getElementById("footer-year");
  if (el) el.textContent = new Date().getFullYear();
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

/* ---------- Chat widget ---------- */

const CHAT_RESPONSES = [
  {
    keywords: ["precio", "coste", "cuanto", "cuánto", "presupuesto"],
    reply:
      "El precio depende del equipo y los consumibles necesarios. Déjanos tu email en el formulario de contacto y te enviamos un presupuesto personalizado.",
  },
  {
    keywords: ["calzado", "marroquineria", "marroquinería", "cuero", "piel"],
    reply:
      "Para calzado y marroquinería trabajamos con tampografía sobre cuero y sintéticos, ideal para logos, personalización y detalles decorativos. Más info en la sección Calzado y Marroquinería.",
  },
  {
    keywords: ["metal", "metalurgia", "metalico", "metálico"],
    reply:
      "En metalurgia ofrecemos tampografía para marcaje e identificación de piezas metálicas, con tintas de alta resistencia. Puedes verlo en la sección Metalurgia.",
  },
  {
    keywords: ["plastico", "plástico", "inyeccion", "inyección"],
    reply:
      "Para plástico contamos con soluciones de tampografía sobre piezas inyectadas, envases y artículos promocionales. Consulta la sección Plástico.",
  },
  {
    keywords: ["tampografia", "tampografía", "tampon", "tampón", "cliché", "cliche"],
    reply:
      "La tampografía es nuestra especialidad: máquinas, tampones, clichés y tintas para marcar prácticamente cualquier superficie. Tienes toda la info en la sección Tampografía.",
  },
  {
    keywords: ["instalacion", "instalación", "entrega", "plazo"],
    reply:
      "Los plazos de instalación y puesta en marcha dependen del equipo. Indícanoslo en el formulario de contacto para darte una fecha exacta.",
  },
  {
    keywords: ["contacto", "llamar", "telefono", "teléfono", "email", "correo"],
    reply:
      "Puedes escribirnos desde la página de Contacto o llamarnos al +34 900 000 000. Te responderemos en menos de 24 horas laborables.",
  },
  {
    keywords: ["hola", "buenas", "hey"],
    reply: "¡Hola! Soy el asistente de BSDtech. Cuéntame en qué sector trabajas (calzado, metalurgia, plástico...) y te ayudo a encontrar la solución adecuada.",
  },
];

const CHAT_DEFAULT_REPLY =
  "Gracias por tu mensaje. Un especialista de BSDtech revisará tu consulta y te contactará en menos de 24 horas laborables. Si lo prefieres, visita la página de Contacto para dejarnos tu teléfono.";

function initChatWidget() {
  const widget = document.getElementById("chat-widget");
  if (!widget) return;

  const bubble = widget.querySelector(".chat-bubble");
  const panel = widget.querySelector(".chat-panel");
  const closeBtn = widget.querySelector(".chat-close");
  const form = widget.querySelector(".chat-form");
  const input = widget.querySelector(".chat-input");
  const messages = widget.querySelector(".chat-messages");
  const quickReplies = widget.querySelectorAll(".chat-quick-reply");
  const badge = widget.querySelector(".chat-badge");

  function openPanel() {
    panel.classList.add("is-open");
    bubble.setAttribute("aria-expanded", "true");
    if (badge) badge.style.display = "none";
    input.focus();
  }

  function closePanel() {
    panel.classList.remove("is-open");
    bubble.setAttribute("aria-expanded", "false");
  }

  bubble.addEventListener("click", () => {
    panel.classList.contains("is-open") ? closePanel() : openPanel();
  });
  closeBtn.addEventListener("click", closePanel);

  function addMessage(text, from) {
    const msg = document.createElement("div");
    msg.className = "chat-msg chat-msg-" + from;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function respondTo(text) {
    const lower = text.toLowerCase();
    const match = CHAT_RESPONSES.find((r) => r.keywords.some((k) => lower.includes(k)));
    const reply = match ? match.reply : CHAT_DEFAULT_REPLY;
    setTimeout(() => addMessage(reply, "bot"), 500);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    respondTo(text);
    input.value = "";
  });

  quickReplies.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();
      addMessage(text, "user");
      respondTo(text);
    });
  });
}

/* ---------- Formulario de consulta / contacto ---------- */

function initConsultaForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const confirmation = document.getElementById("contact-confirmation");

  const params = new URLSearchParams(window.location.search);
  const sector = params.get("sector");
  if (sector) {
    const mensaje = form.querySelector("[name='mensaje']");
    const interes = form.querySelector("[name='interes']");
    if (interes) interes.value = sector;
    if (mensaje) {
      mensaje.value = `Estoy interesado/a en soluciones de tampografía para el sector ${sector}. Me gustaría recibir más información y un presupuesto.`;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = data.get("nombre");
    form.hidden = true;
    if (confirmation) {
      confirmation.hidden = false;
      confirmation.textContent = `Gracias, ${name}. Hemos recibido tu consulta y te contactaremos en menos de 24 horas laborables.`;
    }
  });
}
