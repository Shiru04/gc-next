export type PostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // display
  sections: PostSection[];
  related: Array<{ href: string; label: string }>;
};

export const POSTS: Post[] = [
  {
    slug: "how-to-know-if-your-ac-needs-repair",
    title: "Cómo saber si tu aire acondicionado necesita reparación",
    description:
      "Señales de advertencia comunes, qué verificar y cuándo programar el servicio.",
    date: "2026-02-22",
    sections: [
      {
        heading: "Por qué son importantes las señales de alerta temprana",
        paragraphs: [
          "La mayoría de las fallas del aire acondicionado no ocurren de la nada. Un compresor que se apaga durante una ola de calor en julio generalmente pasa semanas, a veces meses, enviando señales de que algo anda mal: tiempos de funcionamiento más prolongados, aire más cálido, nuevos ruidos, una factura eléctrica progresiva. Detectar esas señales a tiempo es la diferencia entre una reparación modesta y un reemplazo de emergencia en el peor momento posible.",
          "En Los Ángeles y el condado de Orange, el patrón es predecible. Los sistemas se utilizan ligeramente durante la primavera y luego se presionan con fuerza cuando llega el primer tramo caluroso. Esa primera semana de carga pesada es cuando fallan los componentes débiles. La buena noticia: casi todas las señales de advertencia que aparecen a continuación son algo que usted mismo puede notar, sin necesidad de herramientas.",
        ],
      },
      {
        heading: "Señal de advertencia 1: el aire ya no está tan frío como antes",
        paragraphs: [
          "Si su aire acondicionado funciona pero el aire de las rejillas de ventilación se siente débil o ligeramente frío, no espere a que se apague por completo. Las causas comunes incluyen una fuga de refrigerante, un capacitor defectuoso que impide que el compresor arranque correctamente, un serpentín del evaporador congelado o restricciones en el flujo de aire debido a un filtro obstruido o un serpentín sucio.",
          "Una autocomprobación rápida: sostenga la mano en un respiradero de suministro mientras el sistema funciona. El aire debe sentirse claramente frío, no sólo “en movimiento”. Si las habitaciones alejadas de la unidad nunca se enfrían, o el sistema funciona durante horas sin alcanzar la configuración del termostato, está trabajando más de lo debido y quemando dinero al hacerlo.",
        ],
      },
      {
        heading: "Señal de advertencia 2: Nuevos ruidos u olores",
        paragraphs: [
          "Un sistema sano es aburrido: un zumbido constante de la unidad exterior y un flujo de aire silencioso en el interior. Los cambios merecen atención. Los chirridos o chirridos pueden indicar desgaste de los cojinetes del motor. Los zumbidos a menudo indican un problema eléctrico, como un contactor defectuoso. Hacer clic repetidamente sin iniciar normalmente significa que un componente está intentando activarse y no logra hacerlo.",
          "Los olores cuentan su propia historia. Un olor a humedad cuando el sistema arranca a menudo indica humedad o crecimiento microbiano en los conductos o en la bandeja de drenaje. Un olor a quemado o eléctrico justifica apagar el sistema y llamar al servicio técnico; eso no debe esperar.",
        ],
      },
      {
        heading: "Señal de advertencia 3: ciclismo corto o carrera constante",
        paragraphs: [
          "Su aire acondicionado debe funcionar en ciclos completos, el tiempo suficiente para enfriar el espacio y eliminar la humedad, y luego descansar. Dos patrones indican problemas. Los ciclos cortos, en los que el sistema arranca y se detiene cada pocos minutos, sobrecargan el compresor (el componente más caro del sistema) y, a menudo, se deben a una unidad de gran tamaño, un problema de refrigerante o una falla eléctrica. El funcionamiento constante, donde el sistema nunca parece apagarse, sugiere que ya no puede mantener el ritmo, debido a la pérdida de refrigerante, serpentines sucios, componentes defectuosos o aumento de calor para el que el sistema no estaba diseñado.",
        ],
      },
      {
        heading: "Señal de advertencia 4: su factura de electricidad aumentó",
        paragraphs: [
          "Si sus hábitos de uso no han cambiado pero su factura de verano es notablemente más alta que la del mismo mes del año pasado, es posible que su sistema esté perdiendo eficiencia. Los componentes defectuosos obligan a tiempos de funcionamiento más prolongados para ofrecer la misma refrigeración. Un aumento en la factura junto con cualquier otro signo en esta lista es un fuerte indicador de que es hora de un diagnóstico profesional.",
        ],
      },
      {
        heading: "Qué puedes comprobar antes de llamar",
        paragraphs: [
          "Unos pocos minutos de comprobación pueden descartar cosas simples:",
        ],
        bullets: [
          "Filtro de aire: un filtro muy obstruido puede provocar un flujo de aire débil, hielo en el serpentín y ciclos cortos por sí solo. Si está gris y mate, reemplácelo.",
          "Termostato: confirme que esté configurado para enfriar, que las baterías estén en buen estado y que el punto de ajuste esté por debajo de la temperatura ambiente.",
          "Disyuntores: verifique que los disyuntores de CA no se hayan disparado. Si un disyuntor se dispara nuevamente después de restablecerse, deténgase y llame; eso es una falla electrica",
          "Unidad exterior: asegúrese de que el condensador no esté obstruido por hojas, tierra o plantas. Necesita espacio despejado para mover el aire.",
        ],
      },
      {
        heading: "Cuando llamar a un profesional",
        paragraphs: [
          "Si los conceptos básicos funcionan y los síntomas persisten (aire caliente, ruidos, ciclos cortos, facturas en aumento), las causas restantes (refrigerante, componentes eléctricos, motores, bobinas) necesitan equipo de diagnóstico y capacitación para confirmarlas de manera segura. Adivinar resulta caro: sustituir las piezas una por una hasta que algo funcione suele costar más que un diagnóstico adecuado por adelantado.",
          "Nuestro enfoque en GC Heating & Cooling es primero el diagnóstico: probamos los componentes eléctricos, medimos las presiones del refrigerante y verificamos el flujo de aire, luego explicamos lo que encontramos y cuánto cuestan sus opciones antes de comenzar cualquier trabajo. Y si su sistema es lo suficientemente antiguo como para que una reparación no tenga sentido financiero, se lo diremos directamente y le explicaremos las opciones de reemplazo.",
          "Una cosa más que vale la pena saber: la reparación más barata es la que nunca necesitas. La mayoría de las fallas en esta lista comienzan siendo pequeñas y quedan detectadas durante el mantenimiento de rutina, que es exactamente para lo que sirve una puesta a punto estacional.",
        ],
      },
    ],
    related: [
      { href: "/residencial/reparacion-de-aire-acondicionado-residencial", label: "Reparación de aire acondicionado" },
      {
        href: "/residencial/mantenimiento-climatizacion-residencial",
        label: "Mantenimiento de climatización",
      },
      {
        href: "/residencial/instalacion-ac-residencial",
        label: "Instalación de CA",
      },
      { href: "/promociones", label: "Promociones actuales" },
    ],
  },
  {
    slug: "hvac-maintenance-checklist",
    title: "Lista de verificación de mantenimiento de HVAC para Los Ángeles y OC",
    description:
      "Pasos sencillos para reducir el riesgo de averías y mejorar la eficiencia.",
    date: "2026-02-22",
    sections: [
      {
        heading: "Por qué el mantenimiento es más importante aquí de lo que piensas",
        paragraphs: [
          "El sur de California es tolerante con los sistemas de calefacción y difícil con los sistemas de refrigeración. Las largas temporadas de enfriamiento, el aire polvoriento del interior, el aire salado cerca de la costa y las olas de calor que llevan a los sistemas al límite durante días seguidos: todo esto agrega desgaste. La mayoría de las llamadas de emergencia que recibimos en julio y agosto se remontan a problemas que se estaban desarrollando silenciosamente en abril: un condensador que se debilita, una bobina cubierta de polvo, una línea de drenaje que se obstruye lentamente.",
          "El objetivo del mantenimiento no es sólo evitar averías. Un sistema limpio y afinado simplemente utiliza menos electricidad para realizar el mismo trabajo. Los serpentines sucios y los filtros obstruidos obligan a tiempos de funcionamiento más largos, y estos tiempos de funcionamiento aparecen en su factura todos los meses.",
        ],
      },
      {
        heading: "Mensual: los controles de dos minutos",
        paragraphs: [
          "Estos casi no toman tiempo y previenen los problemas más comunes:",
        ],
        bullets: [
          "Revise el filtro de aire; sosténgalo hacia la luz; Si no puedes ver a través de él, reemplázalo. Durante períodos de uso intensivo o de humo de incendios forestales, verifique con más frecuencia.",
          "Escuche y observe: nuevos ruidos, un flujo de aire débil o hielo en las líneas de refrigerante son advertencias tempranas sobre las que vale la pena actuar.",
          "Mantenga las rejillas de ventilación despejadas: los muebles y alfombras que bloquean las rejillas de ventilación de suministro o retorno desequilibran todo el sistema.",
        ],
      },
      {
        heading: "Estacionalmente: lo que pueden hacer los propietarios",
        paragraphs: [
          "Algunas veces al año, dale al sistema quince minutos:",
        ],
        bullets: [
          "Enjuague suavemente el serpentín del condensador exterior con una manguera (sistema apagado) para limpiar el polvo y los escombros, especialmente después de eventos de viento de Santa Ana.",
          "Recorte las plantas y limpie las hojas al menos dos pies alrededor de la unidad exterior para que pueda respirar.",
          "Verifique que la salida de la línea de drenaje de condensado no gotee cuando el aire acondicionado esté funcionando; un drenaje bloqueado puede apagar el sistema o causar daños por agua.",
          "Pruebe el termostato cambiando de modo y confirmando que el sistema responde; reemplace las baterías anualmente.",
          "Cerca de la costa: busque corrosión en el gabinete de la unidad exterior y en las aletas del serpentín; el aire salado la acelera.",
        ],
      },
      {
        heading: "Dos veces al año: la puesta a punto profesional",
        paragraphs: [
          "Las comprobaciones de propietarios anteriores mantienen el sistema respirando, pero no pueden detectar las fallas que en realidad dejan a las personas atrapadas en las olas de calor: son eléctricas y mecánicas, y necesitan equipos de prueba. Una puesta a punto profesional mide lo que usted no puede ver: valores de condensadores, consumos de amperaje del motor, presiones de refrigerante, división de temperatura en el serpentín y controles de seguridad.",
          "El ritmo que funciona para nuestro clima: un ajuste de enfriamiento en primavera, antes del primer tramo caluroso, y un control de calefacción en otoño, antes de la primera noche fría. La primavera es lo más importante aquí: es cuando un condensador débil o una carga baja de refrigerante se detecta en un momento conveniente en lugar de fallar durante una semana de 100 grados cuando todas las empresas de HVAC del condado están agotadas.",
          "Una visita de puesta a punto adecuada debe incluir inspección del filtro y del flujo de aire, pruebas eléctricas bajo carga, inspección del serpentín y de la línea de drenaje, verificación de la carga de refrigerante y medición del rendimiento, todo ello terminado con un resumen en lenguaje sencillo de lo que es saludable y lo que está desgastado. Esa última parte es el valor real: saber que un componente se está debilitando le permite reemplazarlo según su cronograma, no según el de la falla.",
        ],
      },
      {
        heading: "¿Qué mantenimiento realmente ahorra?",
        paragraphs: [
          "Las matemáticas favorecen la prevención. Una puesta a punto de temporada comienza en $99. Las reparaciones que previene con mayor frecuencia (daños en el compresor debido a un condensador defectuoso, daños por agua debido a un drenaje obstruido, reemplazo de la bobina después de años de funcionamiento sucio) ascienden a cientos o miles. Si a eso le sumamos la pérdida de eficiencia de un sistema descuidado que infla silenciosamente cada factura mensual, saltarnos el mantenimiento suele ser la opción más costosa, solo distribuye el costo donde es más difícil de ver.",
          "El mantenimiento también protege la cuestión de la vida útil. Los sistemas bien mantenidos comúnmente brindan años de servicio adicional en comparación con los descuidados, y cuando llega el momento de reemplazarlos, un historial de servicio documentado lo ayuda a realizar esa llamada deliberadamente en lugar de hacerlo durante una interrupción.",
          "Si prefiere no realizar un seguimiento de nada de esto usted mismo, para eso están los paquetes de mantenimiento: programamos las visitas de primavera y otoño, y usted recibe un informe después de cada una. Su sistema permanece listo para las estaciones y usted permanece fuera de la lista de llamadas de emergencia en agosto.",
        ],
      },
    ],
    related: [
      {
        href: "/residencial/mantenimiento-climatizacion-residencial",
        label: "Mantenimiento de climatización",
      },
      { href: "/promociones/puestas a punto", label: "Promoción de puesta a punto de $99" },
      { href: "/residencial/reparacion-de-aire-acondicionado-residencial", label: "Reparación de aire acondicionado" },
      {
        href: "/residencial/aislamiento-ático-residencial",
        label: "Aislamiento del ático",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
