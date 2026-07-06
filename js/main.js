/* Funcionalidad compartida: navegación, chat widget, año de footer */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNavLink();
  initFooterYear();
  initChatWidget();
  initConsultaForm();
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

/* ---------- Chat widget ---------- */

const CHAT_RESPONSES = [
  {
    keywords: ["precio", "coste", "cuanto", "cuánto", "presupuesto"],
    reply:
      "El precio depende del modelo y la configuración. Déjanos tu email en el formulario de contacto y te enviamos un presupuesto personalizado.",
  },
  {
    keywords: ["tubo"],
    reply:
      "Para corte de tubo tenemos la gama BT Tube, con capacidad desde Ø 165 mm hasta Ø 220 mm. Puedes verla en Productos > Corte de tubos.",
  },
  {
    keywords: ["chapa"],
    reply:
      "Para corte de chapa recomendamos la gama BT Cut, disponible desde 1 kW hasta 12 kW según el grosor a cortar.",
  },
  {
    keywords: ["soldadura", "soldar"],
    reply:
      "Nuestra gama BT Weld Pro incluye soldadura láser portátil con autoenfriamiento, sin necesidad de chiller externo.",
  },
  {
    keywords: ["automatizacion", "automatización", "robot", "automatico", "automático"],
    reply:
      "Contamos con células robotizadas (BT AutoCell) y torres de almacenamiento automático (BT Tower Storage) para producción desatendida.",
  },
  {
    keywords: ["instalacion", "instalación", "entrega", "plazo"],
    reply:
      "Los plazos de instalación dependen del modelo, habitualmente entre 48 horas y 3 semanas. Indícanoslo en el formulario de contacto para darte una fecha exacta.",
  },
  {
    keywords: ["contacto", "llamar", "telefono", "teléfono", "email", "correo"],
    reply:
      "Puedes escribirnos desde la página de Contacto o llamarnos al +34 900 000 000. Te responderemos en menos de 24 horas laborables.",
  },
  {
    keywords: ["hola", "buenas", "hey"],
    reply: "¡Hola! Soy el asistente de BSDtech. Cuéntame qué tipo de máquina estás buscando y te ayudo a encontrarla.",
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
  const producto = params.get("producto");
  if (producto) {
    const mensaje = form.querySelector("[name='mensaje']");
    if (mensaje) {
      mensaje.value = `Estoy interesado/a en el modelo ${producto}. Me gustaría recibir más información y un presupuesto.`;
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
