/* Catálogo de productos BSDtech */

const CATEGORIES = [
  { slug: "corte-chapas", name: "Corte de chapas", icon: "sheet" },
  { slug: "corte-tubos", name: "Corte de tubos", icon: "tube" },
  { slug: "chapa-tubo", name: "Chapa y tubo", icon: "combo" },
  { slug: "soldadura", name: "Máquina de soldar", icon: "weld" },
  { slug: "automaticos", name: "Automáticos", icon: "robot" },
];

const PRODUCTS = [
  {
    id: "bt-cut-3015",
    category: "corte-chapas",
    name: "BT Cut 3015",
    tagline: "Cortadora láser de fibra para chapa",
    power: "1-12 kW",
    area: "3000 x 1500 mm",
    thickness: "hasta 25 mm en acero al carbono",
    description:
      "Cortadora láser de fibra de alta velocidad pensada para talleres que trabajan chapa de acero, inoxidable y aluminio. Estructura de fundición estabilizada y cabezal autoenfocable para minimizar el mantenimiento.",
    features: [
      "Cabezal autofocus con protección anticolisión",
      "Sistema de doble intercambiador de mesas (opcional)",
      "Software de anidado incluido",
      "Control remoto de estado vía app",
    ],
  },
  {
    id: "bt-cut-1530",
    category: "corte-chapas",
    name: "BT Cut 1530 Compact",
    tagline: "Entrada de gama para talleres pequeños",
    power: "1-3 kW",
    area: "1500 x 3000 mm",
    thickness: "hasta 12 mm en acero al carbono",
    description:
      "Versión compacta orientada a talleres que empiezan en el corte láser, con la misma fiabilidad de la gama BT Cut a un coste de entrada reducido.",
    features: [
      "Chasis compacto de bajo mantenimiento",
      "Consumo eléctrico reducido",
      "Instalación en menos de 48 horas",
      "Garantía de 2 años en el cabezal",
    ],
  },
  {
    id: "bt-tube-220",
    category: "corte-tubos",
    name: "BT Tube 220",
    tagline: "Corte láser de tubo redondo, cuadrado y perfilado",
    power: "1-6 kW",
    area: "Ø 220 mm x 6-12 m",
    thickness: "hasta 20 mm en acero al carbono",
    description:
      "Máquina dedicada al corte de tubo con carga automática, ideal para fabricantes de mobiliario metálico, estructuras y carrocerías.",
    features: [
      "Cargador automático de barras hasta 12 m",
      "Mordazas de sujeción sin marcar el material",
      "Corte de perfiles especiales bajo pedido",
      "Extracción de humos integrada",
    ],
  },
  {
    id: "bt-tube-165",
    category: "corte-tubos",
    name: "BT Tube 165",
    tagline: "Compacta para series cortas",
    power: "1-3 kW",
    area: "Ø 165 mm x 6 m",
    thickness: "hasta 12 mm en acero al carbono",
    description:
      "Diseñada para talleres de cerrajería y fabricación de series cortas que necesitan precisión sin ocupar grandes espacios de planta.",
    features: [
      "Huella reducida en planta",
      "Cambio de formato de tubo en minutos",
      "Interfaz de control simplificada",
      "Bajo coste de mantenimiento",
    ],
  },
  {
    id: "bt-combo-4020",
    category: "chapa-tubo",
    name: "BT Combo 4020",
    tagline: "Corte combinado de chapa y tubo en una sola máquina",
    power: "3-12 kW",
    area: "4000 x 2000 mm / tubo hasta Ø 220 mm",
    thickness: "hasta 25 mm chapa / 20 mm tubo",
    description:
      "Una sola inversión para cubrir corte de chapa y de tubo, con cambio de configuración ágil y sin perder precisión en ninguno de los dos modos.",
    features: [
      "Cambio chapa/tubo sin herramientas",
      "Doble sistema de sujeción intercambiable",
      "Software unificado de programación",
      "Ideal para talleres con producción mixta",
    ],
  },
  {
    id: "bt-weld-1500",
    category: "soldadura",
    name: "BT Weld Pro 1500",
    tagline: "Soldadura láser portátil con autoenfriamiento",
    power: "1.5 kW",
    area: "Portátil, cable de 10 m",
    thickness: "hasta 8 mm en acero inoxidable",
    description:
      "Equipo de soldadura láser manual con sistema de autoenfriamiento, sin necesidad de grupo de refrigeración externo. Reduce deformaciones y acabados con mínimo pulido posterior.",
    features: [
      "Autoenfriamiento integrado, sin chiller externo",
      "Peso reducido para uso prolongado",
      "Modos soldadura, limpieza y corte en un solo equipo",
      "Antorcha ergonómica intercambiable",
    ],
  },
  {
    id: "bt-weld-2000",
    category: "soldadura",
    name: "BT Weld Pro 2000",
    tagline: "Mayor potencia para espesores gruesos",
    power: "2 kW",
    area: "Portátil, cable de 10 m",
    thickness: "hasta 12 mm en acero al carbono",
    description:
      "Versión de mayor potencia de la gama Weld Pro, pensada para talleres de caldereria y construcción metálica con espesores más exigentes.",
    features: [
      "Mayor penetración en espesores gruesos",
      "Refrigeración reforzada de ciclo continuo",
      "Compatible con accesorios de limpieza láser",
      "Formación de uso incluida en la instalación",
    ],
  },
  {
    id: "bt-auto-cell",
    category: "automaticos",
    name: "BT AutoCell",
    tagline: "Célula robotizada de carga y descarga",
    power: "Según máquina asociada",
    area: "Adaptable a BT Cut y BT Tube",
    thickness: "N/A",
    description:
      "Célula de automatización para integrar carga y descarga de material en las cortadoras de la gama BSDtech, pensada para producción continua sin operario permanente.",
    features: [
      "Brazo robótico de carga/descarga",
      "Integración con almacenes de chapa",
      "Funcionamiento desatendido por turnos",
      "Retorno de inversión estimado en el estudio previo",
    ],
  },
  {
    id: "bt-auto-tower",
    category: "automaticos",
    name: "BT Tower Storage",
    tagline: "Almacenamiento automático de chapa",
    power: "N/A",
    area: "Modular, desde 8 hasta 20 posiciones",
    thickness: "N/A",
    description:
      "Torre de almacenamiento automático que alimenta directamente a la cortadora láser, optimizando el espacio de planta y el tiempo de manipulación de material.",
    features: [
      "Gestión de stock por software",
      "Alimentación directa a la máquina de corte",
      "Diseño modular ampliable",
      "Reducción de manipulación manual",
    ],
  },
];

function getProductsByCategory(slug) {
  if (!slug || slug === "todos") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === slug);
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCategoryName(slug) {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat ? cat.name : "";
}

function categoryIcon(icon, className) {
  const cls = className || "cat-icon";
  const icons = {
    sheet: `<svg class="${cls}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="40" height="36" rx="2" stroke="currentColor" stroke-width="3"/>
      <path d="M48 14 L56 22 V50 H16" stroke="currentColor" stroke-width="3"/>
      <path d="M14 22 L34 42" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    tube: `<svg class="${cls}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="32" rx="8" ry="20" stroke="currentColor" stroke-width="3"/>
      <path d="M16 12 H44" stroke="currentColor" stroke-width="3"/>
      <path d="M16 52 H44" stroke="currentColor" stroke-width="3"/>
      <ellipse cx="44" cy="32" rx="8" ry="20" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    combo: `<svg class="${cls}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="26" height="26" rx="2" stroke="currentColor" stroke-width="3"/>
      <ellipse cx="46" cy="44" rx="6" ry="14" stroke="currentColor" stroke-width="3"/>
      <path d="M40 30 H52" stroke="currentColor" stroke-width="3"/>
      <path d="M40 58 H52" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    weld: `<svg class="${cls}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 52 L30 34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M26 38 L38 26 L46 34 L34 46 Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
      <path d="M42 22 L52 12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 8 L56 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    robot: `<svg class="${cls}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="6" stroke="currentColor" stroke-width="3"/>
      <path d="M18 24 V36 H40 V48" stroke="currentColor" stroke-width="3"/>
      <circle cx="40" cy="52" r="5" stroke="currentColor" stroke-width="3"/>
      <path d="M12 46 H24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  };
  return icons[icon] || "";
}
