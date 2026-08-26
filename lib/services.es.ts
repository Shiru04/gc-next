export type ServiceAudience = "residential" | "commercial";

export type Service = {
  slug: string;
  audience: ServiceAudience;
  name: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  overview: string[];
  process: Array<{ step: string; desc: string }>;
  bullets: string[];
  faqs: Array<{ q: string; a: string }>;
};

export const SERVICES: Service[] = [
  {
    slug: "residential-ac-repair",
    audience: "residential",
    name: "Reparación de aire acondicionado residencial",
    short: "Diagnósticos rápidos y reparaciones confiables de aire acondicionado para hogares en Los Ángeles y OC.",
    seoTitle: "Reparación de aire acondicionado residencial en Los Ángeles y el condado de Orange",
    seoDescription:
      "¿El aire acondicionado no enfría? GC Heating & Cooling ofrece reparación rápida y confiable de aire acondicionado residencial en Los Ángeles y el condado de Orange. Llama o reserva online.",
    h1: "Reparación de aire acondicionado residencial",
    intro:
      "Si el aire acondicionado de su hogar no enfría, hace un ruido inusual o sus facturas de energía se dispararon, nuestros técnicos pueden diagnosticar el problema rápidamente y hacer que se sienta cómodo nuevamente.",
    overview: [
      "La temporada de enfriamiento del sur de California ejerce una presión real sobre los sistemas de aire acondicionado residenciales. Cuando un sistema falla durante una ola de calor, la causa suele ser uno de varios problemas: un condensador o contactor defectuoso, nivel bajo de refrigerante debido a una fuga lenta, una línea de condensado obstruida o un problema de flujo de aire oculto en los conductos. Nuestros técnicos prueban los componentes eléctricos, miden las presiones del refrigerante y verifican el flujo de aire antes de recomendar algo, por lo que usted paga para solucionar el problema real, no para cambiar piezas hasta que algo funcione.",
      "Reparamos la mayoría de las principales marcas residenciales, incluidos los sistemas que no instalamos. Después de cada reparación, hacemos funcionar el sistema durante un ciclo completo y verificamos las temperaturas de suministro y retorno, para que usted sepa que se está enfriando como debería antes de partir. Si una reparación no tiene sentido financiero debido a la antigüedad o el estado del sistema, se lo informaremos directamente y le guiaremos a través de las opciones de reemplazo, sin presión de ninguna manera.",
    ],
    process: [
      {
        step: "Cuéntanos los síntomas",
        desc: "Llame o reserve en línea y describa lo que está notando: falta de enfriamiento, flujo de aire débil, ruidos o facturas en aumento.",
      },
      {
        step: "Diagnóstico in situ",
        desc: "Un técnico prueba los componentes eléctricos, las presiones del refrigerante y el flujo de aire para encontrar la causa raíz.",
      },
      {
        step: "Opciones claras antes de comenzar el trabajo",
        desc: "Obtendrá una explicación sencilla del problema y las opciones de reparación con precios, antes de que toquemos nada.",
      },
      {
        step: "Reparar y verificar",
        desc: "Completamos la reparación, ejecutamos el sistema durante un ciclo completo y confirmamos que se está enfriando correctamente.",
      },
    ],
    bullets: [
      "Sin aire frío, flujo de aire débil o temperaturas desiguales",
      "Problemas con el refrigerante, fallas eléctricas, reemplazo de capacitores y contactores",
      "Solución de problemas del termostato y comprobaciones de seguridad del sistema",
      "Recomendaciones claras y opciones de reparación.",
    ],
    faqs: [
      {
        q: "¿Qué tan rápido puede acudir a reparar el aire acondicionado?",
        a: "Priorizamos las llamadas sin enfriamiento y programamos la cita más temprana disponible. Llame ahora o utilice Reservar ahora para reservar una hora.",
      },
      {
        q: "¿Reparan todas las marcas de aire acondicionado?",
        a: "Sí, damos servicio a la mayoría de las principales marcas de HVAC residenciales. Si se necesitan piezas, confirmaremos la disponibilidad y los plazos.",
      },
      {
        q: "¿Por qué mi aire acondicionado funciona pero no enfría?",
        a: "Las causas comunes incluyen nivel bajo de refrigerante debido a una fuga, un capacitor fallado, un serpentín del evaporador congelado o flujo de aire restringido debido a un filtro sucio. Un diagnóstico adecuado identifica cuál; ​​adivinar suele costar más a largo plazo.",
      },
      {
        q: "¿Cuánto cuesta la reparación del aire acondicionado?",
        a: "Depende del componente fallido. Primero diagnosticamos y le brindamos precios y opciones claros antes de comenzar cualquier trabajo, para que no haya sorpresas en la factura.",
      },
      {
        q: "¿Debo reparar o reemplazar mi aire acondicionado?",
        a: "Si las reparaciones son frecuentes, la unidad es más antigua o la eficiencia es deficiente, el reemplazo puede ser más rentable. Te explicamos la mejor opción para tu hogar.",
      },
    ],
  },
  {
    slug: "residential-heating-repair",
    audience: "residential",
    name: "Reparación de calefacción residencial",
    short: "Reparación de calefacción segura y confiable para restaurar rápidamente el confort en el hogar.",
    seoTitle: "Reparación de calefacción residencial en Los Ángeles y el condado de Orange",
    seoDescription:
      "¿El calentador no funciona? GC Heating & Cooling ofrece reparación de calefacción residencial segura y confiable en Los Ángeles y el condado de Orange. Llama o reserva online.",
    h1: "Reparación de calefacción residencial",
    intro:
      "Cuando el sistema de calefacción de su hogar no funciona, necesita una solución rápida y segura. Solucionamos la causa raíz y restauramos el calor de manera eficiente.",
    overview: [
      "En Los Ángeles y el condado de Orange, las calderas permanecen sin uso durante la mayor parte del año y luego se les pide que funcionen en la primera noche fría. Ahí es exactamente cuando aparecen fallas de encendido, sensores de llama sucios y componentes desgastados del ventilador. Debido a que las calderas de gas implican combustión, tratamos cada reparación de calefacción como una visita de seguridad primero: revisamos el intercambiador de calor, las conexiones de gas y los interruptores de seguridad antes de centrarnos en la comodidad.",
      "Damos servicio a sistemas de calefacción residenciales comunes, incluidos hornos de gas y bombas de calor. La mayoría de las reparaciones se reducen a componentes de encendido, sensores de llama, tableros de control o restricciones del flujo de aire, y la mayoría se completan en una sola visita una vez que se confirma la causa. Si su sistema es antiguo y las reparaciones se están convirtiendo en un patrón, le daremos una lectura honesta sobre si el reemplazo tiene más sentido, con opciones que se ajustan a su presupuesto.",
    ],
    process: [
      {
        step: "Describe el problema",
        desc: "Sin calor, ciclos cortos, olores extraños ni funcionamiento ruidoso: cuéntenos qué cambió y cuándo comenzó.",
      },
      {
        step: "Diagnóstico centrado en la seguridad",
        desc: "Antes que nada, inspeccionamos el encendido, el sensor de llama, los interruptores de seguridad y el intercambiador de calor.",
      },
      {
        step: "Opciones iniciales",
        desc: "Obtendrá la causa, la solución y un precio claro antes de comenzar el trabajo, con consejos honestos si el reemplazo tiene más sentido.",
      },
      {
        step: "Reparación y prueba",
        desc: "Completamos la reparación y ejecutamos ciclos de calentamiento completos para confirmar un funcionamiento seguro y estable.",
      },
    ],
    bullets: [
      "Sin calor, ciclos cortos, olores extraños ni funcionamiento ruidoso",
      "Diagnóstico de encendido, sensor de llama e interruptor de seguridad.",
      "Comprobaciones del termostato y del flujo de aire.",
      "Recomendaciones iniciales con opciones",
    ],
    faqs: [
      {
        q: "¿Es normal sentir olor a quemado al encender la calefacción?",
        a: "Un breve olor a polvo quemado puede ser normal al principio. Si persiste o huele a gas, apague el sistema y llame de inmediato.",
      },
      {
        q: "¿Da mantenimiento a calderas y bombas de calor?",
        a: "Sí, damos servicio a sistemas de calefacción residenciales comunes, incluidos hornos y bombas de calor.",
      },
      {
        q: "¿Por qué mi horno se enciende y apaga repetidamente?",
        a: "Los ciclos cortos a menudo son causados ​​por un sensor de llama sucio, un flujo de aire restringido o un interruptor de límite de sobrecalentamiento. Desperdicia energía y desgasta componentes, por lo que vale la pena diagnosticarlo antes de que cause una falla mayor.",
      },
      {
        q: "¿Cuánto tiempo lleva una reparación de calefacción?",
        a: "La mayoría de las reparaciones se completan en una sola visita una vez que se confirma la causa. Si se necesita una pieza de pedido especial, confirmaremos la disponibilidad y los plazos por adelantado.",
      },
    ],
  },
  {
    slug: "residential-hvac-maintenance",
    audience: "residential",
    name: "Mantenimiento de HVAC residencial",
    short:
      "Mantenimiento doméstico programado para mejorar la eficiencia y extender la vida útil del equipo.",
    seoTitle: "Mantenimiento de HVAC residencial en Los Ángeles y el condado de Orange",
    seoDescription:
      "Evite averías y reduzca los costos de energía con el mantenimiento de HVAC residencial en Los Ángeles y OC. GC Heating & Cooling ofrece planes de servicio programados.",
    h1: "Mantenimiento de HVAC residencial",
    intro:
      "El mantenimiento ayuda a que el sistema de su hogar funcione de manera eficiente, reduce las averías inesperadas y puede prolongar la vida útil del equipo. Ideal antes de las temporadas altas de verano e invierno.",
    overview: [
      "La mayoría de las llamadas de reparación de emergencia que recibimos en julio y agosto se remontan a problemas que se habrían detectado con una puesta a punto de primavera: condensadores débiles, bobinas del condensador sucias, líneas de drenaje obstruidas, nivel bajo de refrigerante. Una visita de mantenimiento es una inspección sistemática: probamos los componentes eléctricos bajo carga, limpiamos lo que restringe el rendimiento y medimos cómo está funcionando realmente el sistema en comparación con cómo debería funcionar.",
      "Para los hogares del sur de California, el ritmo ideal es una puesta a punto del enfriamiento en primavera y una revisión de la calefacción en otoño. Las puestas a punto comienzan en $99 y nuestros paquetes de mantenimiento cubren ambas visitas para que su sistema esté listo antes de que cada temporada alcance su punto máximo. Después de cada visita, obtienes conclusiones y recomendaciones en lenguaje sencillo: qué está bien, qué se usa y qué vale la pena abordar antes de que se convierta en una avería.",
    ],
    process: [
      {
        step: "Elige una hora",
        desc: "Reserve en línea o llame: primavera para refrescarse, otoño para calentarse o un paquete que cubra ambos.",
      },
      {
        step: "Inspección de todo el sistema",
        desc: "Filtros, flujo de aire, componentes eléctricos, serpentines, líneas de drenaje, carga de refrigerante y controles de seguridad.",
      },
      {
        step: "Pruebas de rendimiento",
        desc: "Medimos cómo funciona el sistema frente a cómo debería funcionar, en condiciones reales de funcionamiento.",
      },
      {
        step: "Hallazgos y recomendaciones",
        desc: "Un informe en lenguaje sencillo: qué es saludable, qué se usa y qué vale la pena abordar con anticipación.",
      },
    ],
    bullets: [
      "Afinaciones desde $99",
      "Paquetes de mantenimiento desde $99: proteja su sistema durante todo el año",
      "Inspección de filtros y flujo de aire.",
      "Comprobaciones eléctricas y de seguridad.",
      "Inspección del serpentín y de la línea de drenaje",
      "Pruebas de rendimiento y recomendaciones.",
    ],
    faqs: [
      {
        q: "¿Con qué frecuencia se debe realizar el mantenimiento de HVAC?",
        a: "Por lo general, 1 o 2 veces al año (en primavera para enfriar, en otoño para calentar), según el uso y las condiciones del hogar.",
      },
      {
        q: "¿El mantenimiento ayuda a reducir las facturas de energía?",
        a: "Sí, un sistema optimizado puede funcionar de manera más eficiente y reducir la tensión en los componentes.",
      },
      {
        q: "¿Qué incluye la puesta a punto de $99?",
        a: "Una inspección y puesta a punto completa de su sistema de refrigeración o calefacción: filtros, flujo de aire, comprobaciones eléctricas, inspección de serpentines y drenajes y pruebas de rendimiento, con los resultados explicados en un lenguaje sencillo.",
      },
      {
        q: "¿Realmente vale la pena el mantenimiento si mi sistema parece estar bien?",
        a: "Los condensadores débiles, las bobinas sucias y los desagües obstruidos no muestran síntomas hasta que fallan, generalmente durante la temporada alta. Detectarlos a tiempo es significativamente más barato que una reparación de emergencia durante una ola de calor.",
      },
    ],
  },
  {
    slug: "residential-ac-installation",
    audience: "residential",
    name: "Instalación y reemplazo de aire acondicionado residencial",
    short:
      "Nuevas instalaciones y reemplazos de aire acondicionado para hogares: opciones de eficiencia y financiamiento.",
    seoTitle: "Instalación de aire acondicionado residencial en Los Ángeles y el condado de Orange",
    seoDescription:
      "Mejore la comodidad de su hogar con una instalación de aire acondicionado residencial en Los Ángeles y OC. GC Heating & Cooling ofrece estimaciones y opciones de financiación gratuitas. Llama o reserva ahora.",
    h1: "Instalación y reemplazo de aire acondicionado residencial",
    intro:
      "Si el sistema de su hogar tiene dificultades para mantenerse al día o necesita reparaciones frecuentes, un reemplazo puede mejorar la comodidad y la eficiencia. Le ayudaremos a elegir el ajuste adecuado.",
    overview: [
      "La parte más importante de una instalación de aire acondicionado ocurre antes de que llegue cualquier equipo: el dimensionamiento. Un sistema de gran tamaño realiza ciclos cortos y deja las habitaciones húmedas; uno de tamaño insuficiente corre constantemente y nunca lo alcanza. Evaluamos los metros cuadrados, el aislamiento, los conductos y la exposición al sol de su casa para recomendar un sistema del tamaño adecuado para cómo su casa realmente retiene el calor, no solo un intercambio similar de lo que había antes.",
      "Los sistemas modernos de alta eficiencia pueden reducir significativamente los costos de refrigeración en comparación con los equipos de hace diez o quince años, y lo guiaremos a través de las compensaciones realistas entre eficiencia y comodidad en cada nivel de precio. El equipo comienza en $6,800 con la instalación cotizada por separado, los estimados son gratuitos y hay opciones de financiamiento disponibles, para que pueda decidir basándose en números claros en lugar de presión.",
    ],
    process: [
      {
        step: "Consulta gratuita en el sitio",
        desc: "Evaluamos su hogar, el equipo existente, los conductos y los objetivos de comodidad, y respondemos a sus preguntas.",
      },
      {
        step: "Opciones y cotización",
        desc: "Recomendaciones de sistemas del tamaño adecuado a precios claros, con compensaciones de eficiencia explicadas.",
      },
      {
        step: "Día de instalación",
        desc: "Retiro del equipo antiguo e instalación limpia y profesional del nuevo sistema.",
      },
      {
        step: "Tutorial",
        desc: "Probamos el sistema, lo guiamos a través del funcionamiento y la configuración del termostato, y revisamos la cobertura de la garantía.",
      },
    ],
    bullets: [
      "Equipo desde $6,800 (la instalación se cotiza por separado)",
      "Recomendaciones de sistemas con el tamaño adecuado (comodidad + eficiencia)",
      "Desmontaje e instalación profesional.",
      "Consideraciones sobre conductos y flujo de aire",
      "Opciones de financiación disponibles",
    ],
    faqs: [
      {
        q: "¿Ofrecen presupuestos gratuitos para las instalaciones?",
        a: "Sí, reserve una consulta en el sitio y revisaremos las opciones según sus objetivos de espacio y comodidad.",
      },
      {
        q: "¿Puedo financiar un nuevo sistema?",
        a: "Sí, ofrecemos opciones de financiación. Lo guiaremos a través de los términos disponibles durante la consulta.",
      },
      {
        q: "¿Cuánto tiempo lleva una instalación de aire acondicionado?",
        a: "Por lo general, un reemplazo sencillo se completa en aproximadamente un día. Los trabajos que implican cambios en los conductos o componentes agregados pueden llevar más tiempo; le brindaremos un cronograma claro con su cotización.",
      },
      {
        q: "¿Qué tamaño de aire acondicionado necesita mi casa?",
        a: "Depende de los metros cuadrados, el aislamiento, los conductos y la exposición al sol, no solo de lo que se instaló antes. Dimensionamos los sistemas según la carga de calor real de su hogar para que usted obtenga comodidad sin desperdiciar energía.",
      },
    ],
  },
  {
    slug: "residential-attic-insulation",
    audience: "residential",
    name: "Aislamiento de ático residencial",
    short: "Mejore la comodidad y la eficiencia del hogar con aislamiento del ático.",
    seoTitle: "Aislamiento de áticos residenciales en Los Ángeles y el condado de Orange",
    seoDescription:
      "El aislamiento del ático residencial puede mejorar la comodidad y la eficiencia. Sirviendo a Los Ángeles y el Condado de Orange. Llame o reserve una consulta in situ.",
    h1: "Aislamiento de ático residencial",
    intro:
      "El aislamiento del ático puede ayudar a mantener estable la temperatura interior y reducir la carga de trabajo de HVAC, especialmente durante las estaciones calurosas.",
    overview: [
      "En una tarde calurosa del sur de California, un ático con aislamiento insuficiente puede irradiar calor hacia los espacios habitables durante horas después del atardecer, razón por la cual algunas casas permanecen calientes toda la noche sin importar qué tan fuerte funcione el aire acondicionado. Muchas casas de la región, especialmente las construidas hace décadas, todavía tienen su aislamiento original, comprimido y degradado muy por debajo de los niveles recomendados hoy.",
      "Debido a que trabajamos tanto en el aislamiento como en el sistema HVAC, analizamos el panorama completo: cuánto calor deja pasar su ático, qué tan duro trabaja su sistema para compensar y dónde está el mejor retorno de la inversión. A veces, la respuesta correcta es el aislamiento antes que un aire acondicionado más grande: un ático adecuadamente aislado puede permitir que un sistema del tamaño correcto haga el trabajo con el que el anterior tenía problemas.",
    ],
    process: [
      {
        step: "Evaluación del ático",
        desc: "Inspeccionamos la profundidad, la cobertura y el estado de su aislamiento actual, e identificamos fugas de aire.",
      },
      {
        step: "Recomendación",
        desc: "Opciones claras para los niveles de aislamiento objetivo, explicando el impacto esperado en la comodidad y la eficiencia.",
      },
      {
        step: "Instalación",
        desc: "Instalación limpia y profesional al nivel recomendado con atención a las ventilaciones y espacios libres.",
      },
      {
        step: "Revisar",
        desc: "Confirmamos la cobertura y le explicamos los cambios y lo que puede esperar.",
      },
    ],
    bullets: [
      "Evaluación y recomendaciones de aislamiento.",
      "Mayor comodidad en estaciones frías y calientes.",
      "Reducción de la tensión HVAC y ahorro potencial de energía.",
    ],
    faqs: [
      {
        q: "¿Vale la pena aislar el ático en el sur de California?",
        a: "A menudo, sí: puede reducir la ganancia de calor y ayudar a su HVAC a mantener la comodidad de manera más eficiente.",
      },
      {
        q: "¿Cómo sé si el aislamiento de mi ático es suficiente?",
        a: "Si su aislamiento tiene décadas de antigüedad, está visiblemente comprimido o su piso de arriba permanece caliente hasta la noche, vale la pena evaluarlo. Inspeccionamos la profundidad, la cobertura y el estado y le damos una respuesta directa.",
      },
      {
        q: "¿Debo aislar antes de reemplazar mi aire acondicionado?",
        a: "A veces sí. Un mejor aislamiento reduce la carga de calor en su sistema, lo que puede significar un reemplazo más pequeño y menos costoso que aún lo mantiene cómodo. Evaluamos ambos juntos para que invierta en el orden correcto.",
      },
    ],
  },
  {
    slug: "commercial-repair",
    audience: "commercial",
    name: "Reparación de HVAC comercial",
    short:
      "Reparaciones rápidas de HVAC comerciales para mantener su negocio cómodo y operativo.",
    seoTitle: "Reparación de HVAC comercial en Los Ángeles y el condado de Orange",
    seoDescription:
      "Reparación de HVAC comercial para oficinas, tiendas minoristas y propiedades comerciales ligeras en Los Ángeles y OC. GC Heating & Cooling responde rápidamente. Llama o reserva ahora.",
    h1: "Reparación de HVAC comercial",
    intro:
      "Cuando el sistema HVAC de su empresa falla, la comodidad y la productividad se ven afectadas. Respondemos rápidamente, diagnosticamos la causa raíz y ponemos su sistema nuevamente en línea con recomendaciones claras.",
    overview: [
      "Un sistema HVAC fallido en una empresa no sólo es incómodo: hace que los clientes se vayan y hace que el personal se sienta miserable. Damos servicio a los equipos con los que realmente funcionan las propiedades comerciales livianas: unidades de paquete en la azotea, sistemas divididos y unidades de paquete que sirven a oficinas, espacios comerciales y áreas de restaurantes en Los Ángeles y el condado de Orange.",
      "Los diagnósticos comerciales siguen la misma disciplina que nuestro trabajo residencial, pero a escala comercial: pruebas eléctricas y de compresores, resolución de problemas de flujo de aire y refrigerante, y comprobaciones de control y economizador en unidades de techo. Obtendrá un presupuesto claro antes de que comience el trabajo y coordinaremos la programación según sus horas de funcionamiento para que la reparación no le cueste más negocio que la avería.",
    ],
    process: [
      {
        step: "Llamar con sintomas",
        desc: "Díganos el tipo de equipo y qué está sucediendo; priorizaremos en consecuencia.",
      },
      {
        step: "Diagnóstico in situ",
        desc: "Pruebas de compresores, electricidad, refrigerante y flujo de aire en sistemas de techo, divididos o en paquete.",
      },
      {
        step: "Estimar antes del trabajo.",
        desc: "Hallazgos y precios claros, con orientación de reparación versus reemplazo cuando la antigüedad del equipo lo amerite.",
      },
      {
        step: "Reparación e informe",
        desc: "Completamos el trabajo, verificamos el desempeño y documentamos lo que se hizo.",
      },
    ],
    bullets: [
      "Unidades de techo, sistemas divididos y unidades de paquete",
      "Diagnóstico eléctrico, de compresores, condensadores y contactores.",
      "Solución de problemas de refrigerante y flujo de aire",
      "Programación alineada con el horario comercial para minimizar el tiempo de inactividad.",
      "Presupuestos claros antes de comenzar el trabajo.",
    ],
    faqs: [
      {
        q: "¿Da servicio a oficinas, comercio minorista y comercio ligero?",
        a: "Sí, brindamos soporte para oficinas, comercios minoristas, restaurantes (comodidad en el frente del establecimiento) y otras instalaciones comerciales livianas. Llama para confirmar tu equipo.",
      },
      {
        q: "¿Puedes venir fuera del horario comercial?",
        a: "Intentamos alinearnos con su horario de atención para que el servicio no interrumpa a los clientes ni al personal. Llame para discutir la programación.",
      },
      {
        q: "¿Reparan unidades de techo (RTU)?",
        a: "Sí, las unidades de paquete de techo son una parte fundamental de nuestro trabajo comercial, incluido el diagnóstico de compresores, electricidad, refrigerante y economizador.",
      },
    ],
  },
  {
    slug: "commercial-maintenance",
    audience: "commercial",
    name: "Mantenimiento comercial de HVAC",
    short:
      "Planes de mantenimiento preventivo de propiedades comerciales para reducir averías y costes energéticos.",
    seoTitle: "Mantenimiento comercial de HVAC en Los Ángeles y el condado de Orange",
    seoDescription:
      "Mantenga su negocio cómodo durante todo el año con planes de mantenimiento de HVAC comerciales en Los Ángeles y OC. GC Heating & Cooling ofrece servicio programado.",
    h1: "Mantenimiento comercial de HVAC",
    intro:
      "El mantenimiento programado mantiene el sistema HVAC de su empresa eficiente, protege la inversión en equipos y reduce el tiempo de inactividad sorpresivo que perjudica sus resultados.",
    overview: [
      "Los equipos HVAC comerciales funcionan muchas más horas que los sistemas residenciales, y una falla a mediados de verano en un edificio ocupado es una forma costosa de descubrir que el mantenimiento estaba atrasado. Nuestros planes comerciales se basan en cronogramas de visitas múltiples (generalmente primavera y otoño) que detectan componentes desgastados, bobinas sucias y problemas de drenaje antes de que se conviertan en tiempo de inactividad.",
      "Para los administradores de propiedades, la documentación es tan importante como el trabajo en sí. Cada visita del plan produce un informe de servicio escrito (qué se inspeccionó, qué se encontró, qué se hizo y qué presupuesto se debe presupuestar), de modo que tenga un registro de mantenimiento para propietarios e inquilinos. Los miembros del plan también obtienen una respuesta prioritaria cuando surge algo entre visitas.",
    ],
    process: [
      {
        step: "Diseño de planos",
        desc: "Estructuramos la frecuencia de las visitas en función de su equipo, horario de funcionamiento y necesidades de la propiedad.",
      },
      {
        step: "Visitas programadas",
        desc: "Verificaciones de filtro, serpentín, drenaje, electricidad y rendimiento, coordinadas según sus horas de funcionamiento.",
      },
      {
        step: "Informes escritos",
        desc: "Hallazgos documentados y trabajo completado después de cada visita, listos para propietarios e inquilinos.",
      },
      {
        step: "Apoyo prioritario",
        desc: "Los miembros del plan obtienen una respuesta prioritaria cuando surgen problemas entre las visitas programadas.",
      },
    ],
    bullets: [
      "Planes de mantenimiento de visitas múltiples (primavera + otoño)",
      "Inspección de filtros, serpentines y líneas de drenaje.",
      "Comprobaciones de seguridad y rendimiento eléctrico.",
      "Informes documentados para administradores de propiedades.",
      "Respuesta prioritaria a los miembros del plan.",
    ],
    faqs: [
      {
        q: "¿Ofrecen acuerdos de mantenimiento?",
        a: "Sí, podemos estructurar un plan en función de sus necesidades de equipo, horario y propiedad. Llame para discutir.",
      },
      {
        q: "¿Trabaja con administradores de propiedades?",
        a: "Sí, proporcionamos informes de servicio documentados y podemos coordinar el acceso para propiedades de múltiples inquilinos.",
      },
      {
        q: "¿Con qué frecuencia se debe realizar el mantenimiento de HVAC comercial?",
        a: "La mayoría de los equipos comerciales ligeros se benefician de al menos dos visitas al año: antes de la temporada de refrigeración y antes de la temporada de calefacción. Los equipos con muchas horas de funcionamiento o los entornos polvorientos pueden requerir un servicio más frecuente del filtro y del serpentín.",
      },
    ],
  },
  {
    slug: "commercial-installation",
    audience: "commercial",
    name: "Instalación y reemplazo de HVAC comercial",
    short:
      "Nuevas instalaciones y reemplazos para propiedades comerciales: sistemas eficientes adaptados a su espacio.",
    seoTitle: "Instalación comercial de HVAC en Los Ángeles y el condado de Orange",
    seoDescription:
      "Instalación y reemplazo de HVAC comercial en Los Ángeles y OC. Sistemas del tamaño adecuado para oficinas y comercio ligero. Consulta gratuita en el sitio.",
    h1: "Instalación y reemplazo de HVAC comercial",
    intro:
      "Si su sistema comercial está obsoleto, es demasiado grande o ya no es eficiente, un reemplazo puede reducir los costos operativos y mejorar la comodidad. Diseñamos para su espacio y horario de operación.",
    overview: [
      "Reemplazar los equipos comerciales de HVAC es una oportunidad para solucionar los problemas que generó el antiguo sistema: dimensionamiento incorrecto para cómo se usa realmente el espacio, zonificación deficiente que deja algunas áreas calientes y otras frías, y niveles de eficiencia que tenían sentido hace quince años pero que aumentan los costos operativos hoy. Comenzamos con una evaluación de la carga y el equipo en el sitio (ocupación, horarios, diseño y conductos existentes) antes de recomendar algo.",
      "Instalamos sistemas de paquetes, divididos y de techo del tamaño adecuado para oficinas y espacios comerciales livianos, y planificamos la logística en torno a su negocio: puesta en escena, acceso a equipos y tiempos que minimicen las interrupciones para el personal y los clientes. Los presupuestos son gratuitos y hay opciones de financiación disponibles para proyectos que califiquen.",
    ],
    process: [
      {
        step: "Evaluación in situ",
        desc: "Cálculo de carga y revisión de equipos en función de su espacio, ocupación y horario de funcionamiento.",
      },
      {
        step: "Propuesta",
        desc: "Opciones de sistemas del tamaño adecuado con precios claros y expectativas de eficiencia realistas.",
      },
      {
        step: "Instalación coordinada",
        desc: "Puesta en escena, acceso y cronograma planificados para minimizar la interrupción de sus operaciones.",
      },
      {
        step: "Inicio y transferencia",
        desc: "Pruebas completas del sistema, recorrido de controles y documentación del equipo instalado.",
      },
    ],
    bullets: [
      "Evaluación de carga y equipos en sitio.",
      "Sistemas de paquete, divididos o de techo del tamaño adecuado",
      "Desmontaje e instalación profesional.",
      "Consideraciones sobre conductos y zonificación",
      "Opciones de financiación para proyectos calificados",
    ],
    faqs: [
      {
        q: "¿Ofrecen presupuestos comerciales gratuitos?",
        a: "Sí, revisaremos su espacio, equipo actual y objetivos antes de cotizar opciones.",
      },
      {
        q: "¿Se pueden programar las instalaciones alrededor del horario comercial?",
        a: "A menudo sí: coordinamos el tiempo para minimizar las interrupciones para el personal y los clientes.",
      },
      {
        q: "¿Cuánto tiempo lleva un reemplazo de HVAC comercial?",
        a: "Depende del tipo de equipo y del acceso: un cambio sencillo de unidad en la azotea se realiza rápidamente, mientras que los proyectos multizona toman más tiempo. Su propuesta incluye un cronograma claro antes de programar el trabajo.",
      },
    ],
  },
];

export const RESIDENTIAL_SERVICES = SERVICES.filter(
  (s) => s.audience === "residential",
);
export const COMMERCIAL_SERVICES = SERVICES.filter(
  (s) => s.audience === "commercial",
);

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Maps old flat /services/<slug> URLs to their new audience-scoped path.
 * Used by the legacy /services/[slug] route to render SEO-safe redirects.
 */
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  "ac-repair": "/residencial/reparacion-de-aire-acondicionado-residencial",
  "heating-repair": "/residencial/reparación-de-calefacción-residencial",
  "hvac-maintenance": "/residencial/mantenimiento-climatizacion-residencial",
  "ac-installation": "/residencial/instalacion-ac-residencial",
  "attic-insulation": "/residencial/aislamiento-ático-residencial",
  "commercial-hvac": "/comercial",
};
