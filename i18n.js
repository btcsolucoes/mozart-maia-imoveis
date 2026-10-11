(() => {
  "use strict";

  const supported = new Set(["pt", "en", "es"]);
  const storageKey = "mozart-language";
  const attributeBindings = [
    ["data-i18n", null],
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-alt", "alt"],
    ["data-i18n-aria-label", "aria-label"],
    ["data-i18n-content", "content"],
  ];
  const bindings = [];
  const pt = Object.create(null);

  // Capture each original before any translation, including repeated keys whose
  // Portuguese metadata differs. Returning to PT restores every original value.
  for (const [marker, attribute] of attributeBindings) {
    for (const element of document.querySelectorAll(`[${marker}]`)) {
      const key = element.getAttribute(marker);
      const original = attribute
        ? element.getAttribute(attribute) || ""
        : element.textContent;
      bindings.push({ element, key, attribute, original });
      if (!Object.prototype.hasOwnProperty.call(pt, key)) pt[key] = original;
    }
  }

  Object.assign(pt, {
    menuOpen: "Menu",
    menuClose: "Fechar",
    menuLabel: "Abrir menu",
    menuCloseLabel: "Fechar menu",
    nameError: "Digite seu nome para preparar a mensagem.",
    messageIntro: "Olá, Mozart! Meu nome é {name}. Gostaria de ",
    intentComprar: "comprar um imóvel",
    intentVender: "vender meu imóvel",
    intentAvaliar: "solicitar uma avaliação imobiliária",
    intentPericia: "conversar sobre perícia imobiliária",
    recoveryPrefix: "Sua mensagem está pronta. Se o WhatsApp não abriu, ",
    recoveryLink: "abra por este link",
    floorGround: "Térreo",
    floorNumber: "Andar {floor}",
    motionEnable: "Ativar movimento",
  });

  const en = {
    pageTitle: "Mozart Maia | Buy, sell and value property in Recife",
    description:
      "Buying, selling or valuing a property in Recife? Speak directly with Mozart Maia, a real estate agent since 1990. CRECI-PE 6826 and CNAI 5829. Office in Pina.",
    skip: "Skip to content",
    brand: "REAL ESTATE",
    navigation: "Main navigation",
    navServices: "Services",
    navAbout: "About Mozart",
    navContact: "Contact",
    motion: "Reduce motion",
    motionEnable: "Enable motion",
    language: "Language",
    filmLabel: "From the Boa Viagem waterfront to meeting Mozart",
    heroLine1: "Your property.",
    heroLine2: "In good hands.",
    heroText:
      "Buy, sell or value property in Recife. Speak directly with Mozart Maia, a real estate agent since 1990.",
    heroLink: "Find the service you need",
    descentTitle: "Every property has a context.",
    descentText:
      "Location, documentation and market value are all part of the conversation.",
    welcomeTitle: "Mozart Maia. A personal approach.",
    welcomeText:
      "Speak directly with the professional who will take the time to understand your goals.",
    cityTitle: "Recife on the horizon. Your plans in focus.",
    cityFact1Title: "Working in real estate since 1990.",
    cityFact1Text:
      "Real estate brokerage and valuation. CRECI-PE 6826 · CNAI 5829.",
    cityFact2Title: "Meet us in Pina.",
    cityFact2Text:
      "Empresarial JCPM, 7th floor. Av. Antônio de Góes, 60, Recife.",
    servicesTitle: "What do you need help with?",
    servicesIntro:
      "Buying, selling and valuing a property serve different purposes. We start by understanding yours and gathering the information you need to make a clearer decision.",
    coastAlt: "Aerial view of Boa Viagem beach and its buildings in Recife",
    coastCaption: "Boa Viagem, Recife",
    coastCaption2: "One city. Different ways to call it home.",
    buyTitle: "Buy a home that fits your life.",
    buyText:
      "The search starts with the everyday life you want. Location, budget and property features help you set priorities before viewings and negotiations.",
    buyPrompt: "Before our first conversation, think about:",
    buy1: "Neighbourhoods and your daily journeys",
    buy2: "Your budget and how you plan to pay",
    buy3: "Space, parking and your must-haves",
    sellTitle: "Sell with the full picture.",
    sellText:
      "Your asking price is a starting point. Understanding the location, condition and market helps us discuss how to position your property and plan the next steps in selling it.",
    sellPrompt: "If possible, have these ready:",
    sell1: "The address, floor area and property features",
    sell2: "Current photos and condominium information",
    sell3: "Available documents and your preferred timeline",
    valueTitle: "A valuation with a clear purpose.",
    valueText:
      "Understanding a price for negotiation and needing a formal valuation are different requests. Tell Mozart the purpose so you can agree on the scope, documents and fees.",
    valuePrompt: "A valuation can be a starting point for:",
    value1: "A decision to buy or sell",
    value2: "Organising and reviewing your property assets",
    value3: "A court case or an out-of-court matter",
    portraitAlt: "Mozart Maia, real estate agent, in his office",
    portraitCaption: "Real estate agent and expert property valuer",
    aboutTitle: "The person behind the conversation.",
    aboutLead:
      "Mozart Maia has been a real estate agent since 1990 and holds a postgraduate qualification in Real Estate Business Management.",
    aboutText:
      "His experience spans brokerage, valuation and expert property assessments. This background supports conversations about both your next address and technical questions about the value of your assets.",
    credential1: "Professional registration",
    credential2: "Property valuation",
    technicalNoteTitle: "Expert property assessments, too",
    technicalNote:
      "A member of CONPEJ and APJEP, Mozart carries out expert assessments for court and out-of-court matters. Expert assessments and technical assistance are arranged according to the needs of each case.",
    profileLink: "View Mozart’s professional profile on APJEP",
    technicalTitle: "When the question goes beyond a transaction.",
    technicalIntro:
      "Alongside brokerage, the office handles technical property matters. Tell us the purpose and deadline of your case so we can discuss the appropriate service.",
    tech1Title: "Expert assessment and technical assistance",
    tech1Text:
      "Expert assessments for court and out-of-court matters, and technical assistance in property-related proceedings. Share the subject of the case, the available documents and the deadlines to determine the support required.",
    tech2Title: "Valuation and rent review",
    tech2Text:
      "Services concerning property values and rent reviews. The purpose of the analysis and the property’s characteristics guide the scope of the work.",
    tech3Title: "Feasibility and property analysis",
    tech3Text:
      "The office also offers feasibility studies and legal analysis of property matters. Describe your proposed transaction to clarify the scope and the professionals involved.",
    processTitle: "From your first message to the next step.",
    step1Title: "Tell us your goal",
    step1Text:
      "Let us know whether you want to buy, sell, request a valuation or discuss an expert assessment. The neighbourhood, property type and timeframe help us start a useful conversation.",
    step2Title: "Gather the information",
    step2Text:
      "Mozart will discuss the context and the information needed with you. You can get started even if you do not have all the documents yet.",
    step3Title: "Arrange your appointment",
    step3Text:
      "The next steps, scope and terms of the service are agreed directly. The office is in Pina; arrange an appointment before visiting.",
    contactTitle: "Shall we talk about your property?",
    contactIntro:
      "Choose a topic and prepare your message. You can also call or email Mozart directly.",
    hours: "Monday to Friday, 8 am to 6 pm.",
    address: "Av. Antônio de Góes, 60, 7th floor",
    location: "View the location on the map",
    formLegend: "What would you like to discuss?",
    intentBuy: "Buy",
    intentSell: "Sell",
    intentValue: "Valuation",
    intentExpert: "Expert assessment",
    nameLabel: "Your name",
    namePlaceholder: "What should we call you?",
    messageLabel: "What do you have in mind?",
    optional: "(optional)",
    messagePlaceholder:
      "Tell us the neighbourhood, property type and your goal…",
    privacy:
      "WhatsApp will open with your message ready. You can review it before sending. This website does not store your form data.",
    submit: "Prepare a WhatsApp message",
    socialTitle: "Follow Mozart on social media.",
    socialText: "Posts about property, valuation and professional practice.",
    socialLabel: "Mozart’s social media profiles",
    faqTitle: "A few questions we can answer now.",
    faq1Title: "Does this website list properties for sale?",
    faq1Text:
      "This page presents Mozart’s services. To ask about opportunities and availability, tell Mozart directly what you are looking for. The city images illustrate Recife and do not depict properties being advertised.",
    faq2Title: "Do I need all the documents before getting in touch?",
    faq2Text:
      "You can start with the information you have. The address, floor area, photos and your goal help with the first conversation. The documents required will be discussed according to the service.",
    faq3Title: "Can I request a valuation on its own?",
    faq3Text:
      "Yes. You can request a valuation independently of a purchase or sale. Explain its purpose: the scope, timeframe and fees are agreed directly with Mozart.",
    faq4Title: "Does sending a message mean I am hiring a service?",
    faq4Text:
      "No. The form only prepares a WhatsApp conversation. You review the message before sending it, and the terms of any service are agreed directly with Mozart.",
    creditIntro: "Recife photograph:",
    creditText:
      "Cropped with a colour overlay. The opening uses artistic settings inspired by Boa Viagem and a character created from Mozart’s portrait; it is not live-action footage.",
    whatsappLabel: "Chat with Mozart on WhatsApp",
    menuOpen: "Menu",
    menuClose: "Close",
    menuLabel: "Open menu",
    menuCloseLabel: "Close menu",
    nameError: "Enter your name to prepare the message.",
    messageIntro: "Hello, Mozart! My name is {name}. I would like to ",
    intentComprar: "buy a property",
    intentVender: "sell my property",
    intentAvaliar: "request a property valuation",
    intentPericia: "discuss an expert property assessment",
    recoveryPrefix: "Your message is ready. If WhatsApp did not open, ",
    recoveryLink: "open it using this link",
    floorGround: "Ground floor",
    floorNumber: "Floor {floor}",
  };

  const es = {
    pageTitle: "Mozart Maia | Compra, venta y tasación de inmuebles en Recife",
    description:
      "¿Quiere comprar, vender o tasar un inmueble en Recife? Hable directamente con Mozart Maia, agente inmobiliario desde 1990. CRECI-PE 6826 y CNAI 5829. Oficina en Pina.",
    skip: "Saltar al contenido",
    brand: "NEGOCIOS INMOBILIARIOS",
    navigation: "Menú principal",
    navServices: "Servicios",
    navAbout: "Sobre Mozart",
    navContact: "Contacto",
    motion: "Reducir movimiento",
    motionEnable: "Activar movimiento",
    language: "Idioma",
    filmLabel: "Desde la costa de Boa Viagem hasta el encuentro con Mozart",
    heroLine1: "Su inmueble.",
    heroLine2: "En buenas manos.",
    heroText:
      "Compre, venda o tase un inmueble en Recife. Hable directamente con Mozart Maia, agente inmobiliario desde 1990.",
    heroLink: "Encuentre el servicio que necesita",
    descentTitle: "Cada inmueble tiene un contexto.",
    descentText:
      "La ubicación, la documentación y el valor de mercado forman parte de la conversación.",
    welcomeTitle: "Mozart Maia. Atención directa.",
    welcomeText:
      "Hable con el profesional que se tomará el tiempo de conocer su objetivo.",
    cityTitle: "Recife en el horizonte. Su plan en el centro.",
    cityFact1Title: "En el sector desde 1990.",
    cityFact1Text:
      "Intermediación y tasación inmobiliaria. CRECI-PE 6826 · CNAI 5829.",
    cityFact2Title: "Nos encontramos en Pina.",
    cityFact2Text:
      "Empresarial JCPM, 7.º piso. Av. Antônio de Góes, 60, Recife.",
    servicesTitle: "¿Qué necesita resolver?",
    servicesIntro:
      "Una compra, una venta y una tasación tienen objetivos diferentes. La atención comienza por entender el suyo y reunir la información que permita tomar una decisión más clara.",
    coastAlt:
      "Vista aérea de la playa y los edificios de Boa Viagem, en Recife",
    coastCaption: "Boa Viagem, Recife",
    coastCaption2: "Una ciudad. Distintas formas de vivir.",
    buyTitle: "Comprar pensando en su vida.",
    buyText:
      "La búsqueda empieza por la vida cotidiana que desea tener. La zona, el presupuesto y las características del inmueble ayudan a establecer prioridades antes de las visitas y la negociación.",
    buyPrompt: "Para la primera conversación, piense en:",
    buy1: "Barrios y desplazamientos cotidianos",
    buy2: "Presupuesto y forma de pago",
    buy3: "Espacio, estacionamiento y lo indispensable",
    sellTitle: "Vender con una visión completa.",
    sellText:
      "El precio deseado es el punto de partida. Conocer la ubicación, el estado del inmueble y el mercado ayuda a definir su posicionamiento y los próximos pasos de la venta.",
    sellPrompt: "Si es posible, tenga a mano:",
    sell1: "Dirección, superficie y características del inmueble",
    sell2: "Fotos actuales e información del condominio",
    sell3: "Documentación disponible y su plazo ideal",
    valueTitle: "Tasar con una finalidad.",
    valueText:
      "Conocer el valor para negociar y necesitar una tasación formal son solicitudes diferentes. Indique la finalidad para definir con Mozart el alcance, los documentos y los honorarios.",
    valuePrompt: "Puede ser un punto de partida para:",
    value1: "Una decisión de compra o venta",
    value2: "La organización y el análisis del patrimonio",
    value3: "Un asunto judicial o extrajudicial",
    portraitAlt: "Mozart Maia, agente inmobiliario, en su oficina",
    portraitCaption: "Agente inmobiliario y perito tasador",
    aboutTitle: "Quién está al otro lado de la conversación.",
    aboutLead:
      "Mozart Maia es agente inmobiliario desde 1990 y tiene un posgrado en Gestión de Negocios Inmobiliarios.",
    aboutText:
      "Su trayectoria reúne intermediación, tasación y peritaje inmobiliario. Esa experiencia permite conversar tanto sobre su próxima dirección como sobre cuestiones técnicas relacionadas con el valor de un patrimonio.",
    credential1: "Registro profesional",
    credential2: "Tasación inmobiliaria",
    technicalNoteTitle: "También en el ámbito pericial",
    technicalNote:
      "Miembro del CONPEJ y de la APJEP, Mozart realiza peritajes judiciales y extrajudiciales. La contratación de un peritaje o de asistencia técnica se define según las necesidades de cada caso.",
    profileLink: "Consultar el perfil profesional en la APJEP",
    technicalTitle: "Cuando la cuestión va más allá de la negociación.",
    technicalIntro:
      "Además de la intermediación, la oficina atiende asuntos técnicos inmobiliarios. Cuente la finalidad y el plazo de su caso para conversar sobre el servicio adecuado.",
    tech1Title: "Peritaje y asistencia técnica",
    tech1Text:
      "Peritajes judiciales y extrajudiciales y asistencia en procesos relacionados con inmuebles. Indique el objeto del asunto, los documentos disponibles y los plazos para definir la intervención necesaria.",
    tech2Title: "Tasación y revisión de alquiler",
    tech2Text:
      "Servicios relacionados con el valor de los inmuebles y la revisión de alquileres. La finalidad del análisis y las características del bien orientan la definición del trabajo.",
    tech3Title: "Viabilidad y análisis inmobiliario",
    tech3Text:
      "La oficina también ofrece estudios de viabilidad y análisis jurídico inmobiliario. Describa la operación prevista para aclarar el alcance y los profesionales involucrados.",
    processTitle: "Del primer mensaje al siguiente paso.",
    step1Title: "Cuente su objetivo",
    step1Text:
      "Indique si quiere comprar, vender, solicitar una tasación o tratar un peritaje. El barrio, el tipo de inmueble y el plazo ayudan a iniciar una conversación útil.",
    step2Title: "Reúna la información",
    step2Text:
      "Mozart conversa con usted sobre el contexto y la información necesaria. Puede empezar aunque todavía no tenga todos los documentos a mano.",
    step3Title: "Acuerde una cita",
    step3Text:
      "Los próximos pasos, el alcance y las condiciones del servicio se acuerdan directamente. La oficina está en Pina; coordine la atención antes de acudir.",
    contactTitle: "¿Hablamos de su inmueble?",
    contactIntro:
      "Elija el tema y prepare su mensaje. Si lo prefiere, llame o escriba un correo para conversar directamente con Mozart.",
    hours: "De lunes a viernes, de 8:00 a 18:00.",
    address: "Av. Antônio de Góes, 60, 7.º piso",
    location: "Ver ubicación en el mapa",
    formLegend: "¿Sobre qué vamos a conversar?",
    intentBuy: "Comprar",
    intentSell: "Vender",
    intentValue: "Tasar",
    intentExpert: "Peritaje",
    nameLabel: "Su nombre",
    namePlaceholder: "¿Cómo podemos llamarle?",
    messageLabel: "¿Qué tiene en mente?",
    optional: "(opcional)",
    messagePlaceholder: "Indique el barrio, el tipo de inmueble y su objetivo…",
    privacy:
      "WhatsApp se abrirá con el mensaje preparado. Puede revisar el texto antes de enviarlo. Este sitio no almacena los datos del formulario.",
    submit: "Preparar mensaje en WhatsApp",
    socialTitle: "Siga a Mozart en las redes.",
    socialText: "Contenidos sobre inmuebles, tasación y actividad profesional.",
    socialLabel: "Redes sociales de Mozart",
    faqTitle: "Preguntas que ya podemos aclarar.",
    faq1Title: "¿Este sitio tiene una lista de inmuebles en venta?",
    faq1Text:
      "Esta página presenta los servicios de Mozart. Para consultar oportunidades y disponibilidad, indique directamente qué está buscando. Las imágenes de la ciudad ilustran Recife y no representan inmuebles anunciados.",
    faq2Title: "¿Necesito toda la documentación para conversar?",
    faq2Text:
      "Puede empezar con la información que ya tiene. La dirección, la superficie, las fotos y su objetivo ayudan en el primer contacto. La documentación necesaria se tratará según el servicio.",
    faq3Title: "¿Puedo solicitar únicamente una tasación?",
    faq3Text:
      "Sí. La tasación puede solicitarse independientemente de una compra o venta. Indique la finalidad: el alcance, el plazo y los honorarios se definen directamente con Mozart.",
    faq4Title: "¿Enviar el mensaje supone contratar un servicio?",
    faq4Text:
      "No. El formulario solo prepara una conversación en WhatsApp. Usted revisa el mensaje antes de enviarlo, y las condiciones de cualquier servicio se acuerdan directamente con Mozart.",
    creditIntro: "Fotografía de Recife:",
    creditText:
      "Recorte y superposición de color. La apertura utiliza escenarios artísticos de Boa Viagem y un personaje creado a partir del retrato de Mozart; no es una filmación real.",
    whatsappLabel: "Conversar con Mozart en WhatsApp",
    menuOpen: "Menú",
    menuClose: "Cerrar",
    menuLabel: "Abrir menú",
    menuCloseLabel: "Cerrar menú",
    nameError: "Escriba su nombre para preparar el mensaje.",
    messageIntro: "¡Hola, Mozart! Me llamo {name}. Me gustaría ",
    intentComprar: "comprar un inmueble",
    intentVender: "vender mi inmueble",
    intentAvaliar: "solicitar una tasación inmobiliaria",
    intentPericia: "conversar sobre un peritaje inmobiliario",
    recoveryPrefix: "Su mensaje está listo. Si WhatsApp no se abrió, ",
    recoveryLink: "ábralo mediante este enlace",
    floorGround: "Planta baja",
    floorNumber: "Piso {floor}",
  };

  const dictionaries = { pt, en, es };
  let language = "pt";

  function t(key, params = {}) {
    const dictionary = dictionaries[language];
    const value = Object.prototype.hasOwnProperty.call(dictionary, key)
      ? dictionary[key]
      : Object.prototype.hasOwnProperty.call(pt, key)
        ? pt[key]
        : key;
    return String(value).replace(/\{([a-zA-Z0-9_]+)\}/g, (token, name) =>
      Object.prototype.hasOwnProperty.call(params, name)
        ? String(params[name])
        : token,
    );
  }

  function setLanguage(nextLanguage) {
    if (!supported.has(nextLanguage)) return language;
    language = nextLanguage;
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
    for (const binding of bindings) {
      const value = language === "pt" ? binding.original : t(binding.key);
      if (binding.attribute)
        binding.element.setAttribute(binding.attribute, value);
      else binding.element.textContent = value;
    }
    for (const button of document.querySelectorAll("[data-lang]")) {
      button.disabled = false;
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.lang === language),
      );
    }
    try {
      localStorage.setItem(storageKey, language);
    } catch (_) {
      /* Preference storage is optional. */
    }
    document.dispatchEvent(
      new CustomEvent("mozart:languagechange", {
        detail: { language },
        bubbles: true,
      }),
    );
    return language;
  }

  window.MozartI18n = Object.freeze({
    t,
    get language() {
      return language;
    },
    setLanguage,
  });
  for (const button of document.querySelectorAll("[data-lang]")) {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  }
  let initialLanguage = "pt";
  try {
    const stored = localStorage.getItem(storageKey);
    if (supported.has(stored)) initialLanguage = stored;
  } catch (_) {
    /* Use Portuguese when storage is unavailable. */
  }
  setLanguage(initialLanguage);
})();
