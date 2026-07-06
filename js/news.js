/* Noticias y artículos BSDtech */

const NEWS = [
  {
    id: "corte-materiales-construccion",
    title: "Avanzando en el corte de materiales de construcción con láser de fibra",
    date: "2026-06-18",
    excerpt:
      "Cómo las cortadoras láser de fibra están sustituyendo a los métodos tradicionales en perfiles y chapa para construcción metálica.",
    body: `<p>El sector de la construcción metálica ha adoptado el corte láser de fibra como método principal para perfiles y chapa gruesa, sustituyendo procesos como el oxicorte o el plasma en aplicaciones donde la precisión del canto es crítica.</p>
    <p>En BSDtech trabajamos con talleres que han reducido hasta un 30% el tiempo de preparación de pieza al pasar a corte láser, gracias a la eliminación de rebabas y a la reducción de operaciones secundarias.</p>
    <p>Las claves de esta transición son la potencia del cabezal, la calidad del gas de asistencia y un software de anidado que aproveche al máximo la chapa disponible.</p>`,
  },
  {
    id: "eficiencia-fabricacion-metalica",
    title: "El corte láser aumenta la eficiencia en la fabricación metálica",
    date: "2026-06-05",
    excerpt:
      "Datos reales de talleres que han incorporado corte láser de chapa y tubo en sus líneas de producción.",
    body: `<p>La incorporación de corte láser en líneas de producción metálica no solo mejora la precisión, también permite reorganizar el flujo de trabajo al reducir tiempos de cambio de útil.</p>
    <p>Talleres que combinan corte de chapa y de tubo en la misma planta han encontrado en los equipos combinados una forma de rentabilizar la inversión sin duplicar máquinas.</p>
    <p>El siguiente paso habitual es la automatización de carga y descarga, que libera al operario de tareas repetitivas y permite turnos con menor supervisión directa.</p>`,
  },
  {
    id: "guia-principiantes-corte-laser",
    title: "Guía esencial para principiantes: máquinas de corte láser",
    date: "2026-05-22",
    excerpt:
      "Qué mirar antes de comprar tu primera cortadora láser: potencia, área de trabajo, software y mantenimiento.",
    body: `<p>Elegir una primera cortadora láser implica valorar más allá de la potencia del cabezal: el área de trabajo real que necesita tu producción, el coste de mantenimiento a medio plazo y el soporte técnico disponible en tu zona.</p>
    <p>Recomendamos empezar por definir el espesor y material que se va a cortar de forma habitual, y dimensionar la máquina para ese uso principal, dejando margen para picos ocasionales.</p>
    <p>El software de anidado y la facilidad de programación también son determinantes en el retorno de inversión, especialmente en talleres con piezas variadas.</p>`,
  },
  {
    id: "mantenimiento-preventivo-laser",
    title: "Mantenimiento preventivo: alargando la vida útil de tu cortadora láser",
    date: "2026-05-02",
    excerpt:
      "Rutinas de mantenimiento que reducen las paradas no planificadas en máquinas de corte láser de fibra.",
    body: `<p>Un plan de mantenimiento preventivo bien definido puede reducir de forma notable las paradas no planificadas de una cortadora láser de fibra.</p>
    <p>Las rutinas básicas incluyen la limpieza de la lente protectora, la revisión de la boquilla de corte y la comprobación del sistema de refrigeración con una periodicidad semanal.</p>
    <p>En BSDtech ofrecemos contratos de mantenimiento con revisiones programadas para minimizar el impacto en la producción del taller.</p>`,
  },
  {
    id: "automatizacion-talleres-metalicos",
    title: "Automatización en talleres metálicos: por dónde empezar",
    date: "2026-04-14",
    excerpt:
      "Carga automática, torres de almacenamiento y células robotizadas: opciones para dar el salto a la producción desatendida.",
    body: `<p>La automatización de un taller metálico no tiene por qué ser un salto de una sola vez. Muchos talleres empiezan incorporando un cargador automático de chapa antes de dar el paso a una célula robotizada completa.</p>
    <p>Las torres de almacenamiento automático son una opción intermedia interesante: optimizan el espacio de planta y alimentan directamente a la máquina de corte sin intervención manual.</p>
    <p>El paso final, la célula robotizada de carga y descarga, permite turnos de producción desatendida y suele justificarse en talleres con alta repetición de referencias.</p>`,
  },
];

function getNewsById(id) {
  return NEWS.find((n) => n.id === id);
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
