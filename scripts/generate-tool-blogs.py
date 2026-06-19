import os
import re

blogs_dir = os.path.join(os.path.dirname(__file__), "..", "content", "blog")
os.makedirs(blogs_dir, exist_ok=True)

blogs = [
  {
    "filename": "analizador-cabeceras-email-detectar-phishing.md",
    "title": "Cómo analizar cabeceras de correo electrónico para detectar phishing y spoofing",
    "excerpt": "Aprende a inspeccionar las cabeceras técnicas de un email para verificar su autenticidad y protegerte de ataques de suplantación de identidad (spoofing).",
    "category": "seguridad",
    "tags": ["email", "seguridad", "phishing", "spf", "dkim", "dmarc"],
    "toolLink": "/tools/analizador-email",
    "toolName": "Analizador de Cabeceras de Email",
    "faqs": [
      { "q": "¿Qué es una cabecera de correo electrónico?", "a": "Es una sección oculta del correo que contiene metadatos de red detallados sobre el remitente, servidores de tránsito, destinatario e información de autenticación como SPF, DKIM y DMARC." },
      { "q": "¿Cómo sé si un correo es falso analizando su cabecera?", "a": "Debes buscar inconsistencias entre el dominio del remitente visible y el servidor de origen real (Return-Path), y comprobar si las validaciones de SPF o DKIM han fallado." },
      { "q": "¿Qué significan SPF, DKIM y DMARC?", "a": "Son protocolos de autenticación de email. SPF define qué servidores pueden enviar correos del dominio, DKIM añade una firma criptográfica de validación, y DMARC establece políticas para manejar correos que fallen SPF o DKIM." }
    ],
    "content": """El correo electrónico sigue siendo el principal vector de ataque para los ciberdelincuentes. Mediante técnicas de suplantación de identidad (**email spoofing**), los atacantes logran camuflar correos maliciosos haciéndolos pasar por notificaciones de tu banco, soporte técnico o jefes corporativos.

Para verificar la autenticidad real de un correo electrónico sospechoso sin hacer clic en sus enlaces, es indispensable examinar su **cabecera técnica** o *headers*.

### La importancia de los metadatos ocultos

La cabecera de un correo contiene el historial de viaje completo que siguió el mensaje desde el dispositivo emisor hasta tu bandeja de entrada. A diferencia del contenido visual, la cabecera es mucho más difícil de falsificar en su totalidad por un atacante.

Los tres pilares de autenticación que debes revisar son:
1.  **SPF (Sender Policy Framework):** Especifica qué servidores SMTP están autorizados para enviar correos en nombre de un dominio específico.
2.  **DKIM (DomainKeys Identified Mail):** Añade una firma criptográfica al mensaje que garantiza que el contenido no fue alterado durante el tránsito.
3.  **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** Indica al servidor receptor cómo actuar si las pruebas de SPF o DKIM fallan.

Para simplificar este análisis técnico, puedes utilizar nuestra herramienta interactiva:

**[Prueba nuestro Analizador de Cabeceras de Email](/tools/analizador-email)**

Copia la cabecera completa de tu gestor de correo (Outlook, Gmail, etc.) y pégala en nuestro analizador para descifrar al instante los servidores involucrados y verificar el estado de las firmas SPF, DKIM y DMARC."""
  },
  {
    "filename": "calculadora-entropia-matematica-contrasenas-seguras.md",
    "title": "La matemática de la seguridad: Cómo calcular la entropía de tus contraseñas",
    "excerpt": "Descubre el concepto de entropía criptográfica y por qué la longitud es mucho más importante que la complejidad al diseñar tus contraseñas.",
    "category": "seguridad",
    "tags": ["contraseñas", "entropía", "criptografía", "ciberseguridad", "matemáticas"],
    "toolLink": "/tools/calculadora-entropia",
    "toolName": "Calculadora de Entropía",
    "faqs": [
      { "q": "¿Qué es la entropía de una contraseña?", "a": "Es una medida matemática de la aleatoriedad e imprevisibilidad de una clave, expresada en bits. A mayor entropía, más difícil es descifrarla mediante ataques de fuerza bruta." },
      { "q": "¿Por qué la longitud importa más que los caracteres especiales?", "a": "Porque la longitud incrementa de manera exponencial el número total de combinaciones posibles, mientras que añadir caracteres especiales a una contraseña corta solo incrementa la base de la potencia de forma lineal." },
      { "q": "¿Cuántos bits de entropía se consideran seguros hoy en día?", "a": "Se considera que una contraseña con más de 80 bits de entropía es extremadamente difícil de descifrar por la tecnología de cómputo actual, requiriendo siglos de fuerza bruta." }
    ],
    "content": """La seguridad de una contraseña no se basa en lo "rara" que sea para ti, sino en cuánta resistencia matemática ofrece frente a un ataque de fuerza bruta automatizado. Esta medida se conoce en criptografía como **entropía de la contraseña**.

### La fórmula de la entropía

La entropía de la información (medida en bits) se calcula con la siguiente ecuación:

$$E = L \\times \\log_2(R)$$

Donde:
*   **L:** Es la longitud total de la contraseña (número de caracteres).
*   **R:** Es el tamaño del repertorio de caracteres disponibles (ej. minúsculas = 26, minúsculas + mayúsculas = 52, con números = 62, etc.).

Como la longitud ($L$) actúa como multiplicador directo sobre el logaritmo del tamaño del repertorio, incrementar el número de caracteres tiene un impacto drásticamente mayor sobre la seguridad que añadir símbolos extraños a una clave de 8 caracteres.

Para analizar tus credenciales y estimar de forma matemática el tiempo de descifrado, puedes utilizar nuestra herramienta local:

**[Prueba nuestra Calculadora de Entropía](/tools/calculadora-entropia)**

Introduce cualquier frase o contraseña y descubre al instante sus bits de entropía exactos y el nivel de seguridad real frente a supercomputadores."""
  },
  {
    "filename": "decodificar-jwt-seguridad-tokens-autenticacion.md",
    "title": "Guía del estándar JWT: Cómo decodificar y analizar JSON Web Tokens de forma segura",
    "excerpt": "Aprende a examinar JSON Web Tokens (JWT), entender su estructura de tres partes y verificar sus claims de seguridad de forma local.",
    "category": "seguridad",
    "tags": ["JWT", "autenticación", "seguridad", "JSON", "web", "desarrollo"],
    "toolLink": "/tools/decodificador-jwt",
    "toolName": "Decodificador JWT",
    "faqs": [
      { "q": "¿Qué es un JSON Web Token (JWT)?", "a": "Es un estándar abierto (RFC 7519) que define un método compacto y autónomo para transmitir de forma segura información entre dos partes como un objeto JSON." },
      { "q": "¿Un token JWT cifra mis datos?", "a": "Por defecto no. Un JWT estándar está firmado y codificado en Base64Url, lo que significa que cualquiera puede leer el payload. Nunca debes poner información sensible como contraseñas dentro del token." },
      { "q": "¿Cómo se previene la manipulación de un JWT?", "a": "El token contiene una firma criptográfica en su tercera sección. Si un cliente altera los datos del payload, la firma deja de coincidir y el servidor rechaza el token." }
    ],
    "content": """En el desarrollo web moderno, los **JSON Web Tokens (JWT)** son el estándar dominante para gestionar sesiones de usuario y autenticación en APIs y microservicios. Permiten que los servidores verifiquen la identidad de un cliente sin necesidad de consultar bases de datos de sesión constantemente.

### Anatomía de un JWT

Un token JWT consta de tres partes separadas por puntos (\`.\`):

1.  **Header (Cabecera):** Contiene el tipo de token y el algoritmo de firma utilizado (ej. HS256 o RS256).
2.  **Payload (Cuerpo):** Contiene las reclamaciones o *claims*, que son datos del usuario (como ID, rol y tiempo de expiración \`exp\`).
3.  **Signature (Firma):** El hash criptográfico del header y payload combinado con una clave secreta del servidor.

Es crucial recordar que las dos primeras partes están simplemente codificadas en Base64Url, por lo que son legibles por cualquier persona.

Para inspeccionar el contenido y las fechas de expiración de tus tokens de forma segura y local, puedes usar nuestro decodificador:

**[Prueba nuestro Decodificador JWT](/tools/decodificador-jwt)**

Decodifica al instante tus tokens para verificar sus claims, verificar firmas y analizar su estructura sin enviar ningún dato a través de internet."""
  },
  {
    "filename": "generador-claves-criptograficas-publicas-privadas-rsa-ecdsa.md",
    "title": "Criptografía asimétrica: Generación segura de pares de claves RSA y ECDSA en local",
    "excerpt": "Entiende los principios de la criptografía asimétrica y aprende las diferencias entre los algoritmos de firmas RSA y ECDSA.",
    "category": "seguridad",
    "tags": ["criptografía", "RSA", "ECDSA", "claves", "seguridad", "SSH"],
    "toolLink": "/tools/generador-claves",
    "toolName": "Generador de Claves",
    "faqs": [
      { "q": "¿Qué es la criptografía asimétrica?", "a": "Es un método criptográfico que utiliza un par de claves: una pública (para cifrar o verificar) y una privada (para descifrar o firmar) que se mantienen en secreto." },
      { "q": "¿Cuáles son las diferencias entre RSA y ECDSA?", "a": "RSA se basa en la dificultad de factorizar números primos grandes y requiere claves más largas (ej. 2048 o 4096 bits). ECDSA se basa en curvas elípticas, ofreciendo el mismo nivel de seguridad con claves mucho más pequeñas y rápidas." },
      { "q": "¿Es seguro generar claves SSH u OpenSSL online?", "a": "Solo si se generan de manera local en tu navegador mediante la API Web Crypto de JavaScript, sin enviar las claves a ningún servidor. Nuestra herramienta funciona bajo este principio de seguridad local." }
    ],
    "content": """La base de la seguridad moderna en internet (desde certificados HTTPS hasta conexiones SSH y transacciones en la blockchain) reside en la **criptografía asimétrica** o de clave pública.

### El principio de dos llaves

A diferencia de la criptografía simétrica (donde se usa la misma contraseña para cifrar y descifrar), el modelo asimétrico utiliza dos claves matemáticamente conectadas:
*   **Clave Pública:** Se comparte libremente y permite a cualquiera cifrar mensajes para ti o verificar tu firma.
*   **Clave Privada:** Se mantiene oculta y te permite descifrar la información o firmar digitalmente documentos demostrando tu autoría.

### RSA vs. ECDSA

Al configurar sistemas, las dos opciones dominantes son:
*   **RSA:** El algoritmo tradicional de confianza. Aunque es sumamente seguro, requiere longitudes de clave de al menos 2048 o 4096 bits para resistir la potencia de cómputo moderna.
*   **ECDSA (Criptografía de Curva Elíptica):** La alternativa moderna. Con solo 256 bits, ECDSA iguala la seguridad de una clave RSA de 3072 bits, consumiendo menos recursos y acelerando las transacciones.

Para generar tus pares de claves criptográficas de forma segura desde la privacidad de tu navegador, puedes utilizar nuestra herramienta:

**[Prueba nuestro Generador de Claves Criptográficas](/tools/generador-claves)**

Genera al instante claves RSA y ECDSA en formato PEM listas para configurar tus servidores SSH, certificados o firmas criptográficas."""
  },
  {
    "filename": "eliminador-rastreo-urls-evitar-seguimiento-marketing.md",
    "title": "Limpieza de URLs: Cómo eliminar parámetros UTM y rastreadores de tus enlaces",
    "excerpt": "Descubre cómo los enlaces web recopilan información sobre tus hábitos de navegación mediante parámetros UTM y aprende a limpiar tus URLs para proteger tu privacidad.",
    "category": "privacidad",
    "tags": ["privacidad", "rastreadores", "UTM", "URLs", "marketing", "navegación"],
    "toolLink": "/tools/eliminador-rastreo",
    "toolName": "Eliminador de Rastreo",
    "faqs": [
      { "q": "¿Qué son los parámetros UTM?", "a": "Son etiquetas de texto añadidas al final de una URL (como utm_source, utm_medium) utilizadas por las agencias de marketing para identificar de dónde proviene un visitante." },
      { "q": "¿Cómo afectan los rastreadores en URLs a mi privacidad?", "a": "Permiten que las plataformas (como Facebook o Google) rastreen qué enlaces compartes con tus amigos y vinculen tus perfiles de usuario a través de múltiples páginas." },
      { "q": "¿El eliminador de rastreo rompe el enlace?", "a": "No. Solo remueve las variables innecesarias de marketing y rastreo que van después del signo de interrogación (?), dejando el enlace original intacto para cargar el sitio de forma idéntica." }
    ],
    "content": """Cada vez que compartes un enlace de un producto que te interesa, o haces clic en una noticia en redes sociales, la dirección web suele estar plagada de etiquetas largas. Estos parámetros, como \`utm_source\`, \`fbclid\` o \`gclid\`, son herramientas de **rastreo web**.

### La cadena de seguimiento invisible

Cuando visitas una URL con estos identificadores, los scripts de analítica recopilan información valiosa:
*   En qué red social hiciste clic.
*   Qué campaña publicitaria te motivó.
*   Quién te compartió el enlace (en el caso de identificadores únicos).

Esto crea una huella de tus interacciones personales que las agencias de publicidad digital explotan para construir perfiles de comportamiento comercial detallados.

Para compartir enlaces con tus amigos de forma limpia y mantener tu privacidad de navegación, puedes usar nuestro limpiador local:

**[Prueba nuestro Eliminador de Rastreo en URLs](/tools/eliminador-rastreo)**

Pega cualquier enlace largo con parámetros publicitarios y obtén al instante una URL limpia y libre de rastreadores para compartir con seguridad."""
  },
  {
    "filename": "generador-alias-proteger-correo-electronico-spam.md",
    "title": "Correos desechables y alias: Protege tu bandeja de entrada contra el spam y filtraciones",
    "excerpt": "Descubre el uso de alias de correo y credenciales deterministas para identificar qué empresas venden tus datos y evitar el spam masivo.",
    "category": "privacidad",
    "tags": ["privacidad", "alias", "email", "spam", "seguridad", "filtraciones"],
    "toolLink": "/tools/generador-alias",
    "toolName": "Generador de Alias",
    "faqs": [
      { "q": "¿Qué es un alias de correo electrónico?", "a": "Es una dirección de correo alternativa que redirige los mensajes recibidos a tu bandeja de entrada principal sin revelar tu dirección real." },
      { "q": "¿Cómo ayuda un alias a detectar filtraciones de datos?", "a": "Si te registras en un sitio usando un alias único (ej. miusuario+sitioA@dominio.com) y empiezas a recibir spam en esa dirección, sabes exactamente qué sitio filtró o vendió tu información." },
      { "q": "¿Qué son las credenciales deterministas?", "a": "Son sistemas de generación de nombres de usuario y contraseñas basados en algoritmos deterministas a partir de una palabra clave, haciendo que sean recuperables pero únicos por plataforma." }
    ],
    "content": """Dar tu dirección de correo electrónico personal en cada servicio web en el que te registras es una de las principales fuentes de **spam masivo** y riesgos de suplantación. Si uno de esos sitios es hackeado, tu dirección de correo se añade a listas de phishing globales.

### La defensa basada en alias

Una de las mejores estrategias de seguridad es la compartimentación. En lugar de dar tu correo único, puedes emplear alias dedicados para cada sitio web.

Existen varios tipos de alias:
1.  **Alias de etiquetado (Plus Addressing):** Usar el formato \`tuusuario+nombre_servicio@gmail.com\`. La mayoría de servicios de correo ignoran lo que va después del signo \`+\` y lo entregan en tu bandeja principal.
2.  **Alias deterministas o enmascarados:** Crear alias aleatorios o codificados que no dejen rastro de tu nombre de usuario principal.

Esta técnica te permite crear reglas de filtrado en tu buzón para archivar o borrar correos automáticamente si un alias específico empieza a recibir correos no deseados.

Para generar esquemas de registro seguros y gestionar alias lógicos, puedes utilizar nuestra herramienta:

**[Prueba nuestro Generador de Alias y Credenciales](/tools/generador-alias)**

Crea alias de correo y nombres de usuario estructurados por plataforma para proteger tu identidad principal en cada registro en línea."""
  },
  {
    "filename": "generador-credenciales-seguridad-cuentas-desarrollo.md",
    "title": "Creación de entornos seguros: Cómo generar credenciales y perfiles aleatorios para testing",
    "excerpt": "Aprende por qué nunca debes usar datos reales o credenciales de producción en tus entornos de pruebas y cómo generar perfiles seguros.",
    "category": "privacidad",
    "tags": ["testing", "desarrollo", "credenciales", "seguridad", "base-de-datos"],
    "toolLink": "/tools/generador-credenciales",
    "toolName": "Generador de Credenciales",
    "faqs": [
      { "q": "¿Por qué es peligroso usar credenciales reales en entornos de pruebas?", "a": "Porque los entornos de pruebas suelen ser menos seguros y más propensos a filtraciones o accesos no autorizados. Exponer contraseñas o emails reales pone en riesgo a los usuarios." },
      { "q": "¿Qué debe incluir una credencial de prueba segura?", "a": "Nombres aleatorios, nombres de usuario ficticios, correos de prueba simulados y contraseñas de alta entropía que no se utilicen en ningún servicio real." },
      { "q": "¿Cómo ayuda la generación local a los desarrolladores?", "a": "Garantiza que ningún perfil de prueba generado se envíe a internet, cumpliendo con las regulaciones de protección de datos durante el desarrollo local." }
    ],
    "content": """Durante el ciclo de desarrollo de software, la creación de bases de datos de prueba y la validación de interfaces de usuario requiere el ingreso constante de información personal: nombres, correos electrónicos, contraseñas y claves API.

Un error común entre desarrolladores es utilizar datos reales de clientes en entornos de testing para simular el uso real. Esta práctica viola normativas como la **GDPR** y expone datos críticos si el servidor de desarrollo es vulnerado.

### La importancia de perfiles de prueba realistas

Para realizar auditorías y pruebas funcionales de manera segura, se deben generar perfiles con credenciales ficticias pero válidas (que cumplan con validaciones de longitud, formatos de email y robustez de clave).

Esto garantiza:
*   Cumplimiento normativo absoluto de privacidad.
*   Evita fugas accidentales de datos de producción.
*   Permite automatizar pruebas de software de manera robusta.

Para crear rápidamente conjuntos de credenciales y perfiles de usuario seguros de forma aleatoria, puedes utilizar nuestro generador:

**[Prueba nuestro Generador de Credenciales de Prueba](/tools/generador-credenciales)**

Genera al instante identidades ficticias y claves de prueba locales para agilizar tus desarrollos sin poner en riesgo la privacidad."""
  },
  {
    "filename": "generador-datos-ficticios-pruebas-privacidad-bases-datos.md",
    "title": "Testing ético: Generación de datos ficticios realistas para proteger la privacidad",
    "excerpt": "Conoce las mejores técnicas de enmascaramiento de datos y cómo poblar tus bases de datos de prueba con información ficticia segura.",
    "category": "privacidad",
    "tags": ["privacidad", "datos", "Faker", "bases-de-datos", "desarrollo"],
    "toolLink": "/tools/generador-datos",
    "toolName": "Generador de Datos",
    "faqs": [
      { "q": "¿Qué es el enmascaramiento de datos?", "a": "Es el proceso de reemplazar datos sensibles en bases de datos por caracteres de relleno o información ficticia, manteniendo el formato original de la estructura." },
      { "q": "¿Para qué sirve un generador de datos ficticios?", "a": "Permite rellenar formularios de prueba, bases de datos o interfaces en desarrollo con nombres, direcciones y teléfonos ficticios para verificar su funcionamiento sin usar datos reales." },
      { "q": "¿Los datos generados localmente son seguros?", "a": "Sí, ya que al procesarse en tu propio navegador web no se transmiten datos privados a servidores externos, garantizando el anonimato de tus pruebas." }
    ],
    "content": """En la era del Big Data y el cumplimiento estricto de la privacidad, proteger la información que manejan tus aplicaciones durante las fases de desarrollo y demostraciones comerciales es obligatorio. 

El uso de datos personales reales en entornos no controlados es una de las causas más frecuentes de multas regulatorias y fugas de datos corporativos.

### Enmascaramiento y Generación Sintética

Para resolver este desafío, los ingenieros utilizan dos metodologías:
1.  **Enmascaramiento de datos (Data Masking):** Cifrar u ofuscar datos de producción existentes.
2.  **Generación de Datos Sintéticos:** Crear registros desde cero que imiten el comportamiento humano real (como direcciones postales válidas, números de tarjetas de prueba y teléfonos ficticios estructurados).

Utilizar datos sintéticos asegura que tus analistas y probadores de software tengan material realista para trabajar, sin que exista ninguna posibilidad física de comprometer identidades reales.

Para generar colecciones estructuradas de datos simulados en formato JSON o CSV de manera rápida, puedes usar nuestro generador local:

**[Prueba nuestro Generador de Datos Ficticios](/tools/generador-datos)**

Personaliza los campos que necesitas y exporta información de prueba segura para tus bases de datos al instante."""
  },
  {
    "filename": "generador-user-agent-evitar-huella-digital-navegador.md",
    "title": "Evasión del Fingerprinting: Cómo usar User-Agents para proteger tu privacidad de navegación",
    "excerpt": "Aprende qué es la cabecera User-Agent, cómo los sitios web la utilizan para identificarte y cómo alterarla ayuda a mitigar el rastreo en línea.",
    "category": "privacidad",
    "tags": ["privacidad", "User-Agent", "rastreo", "fingerprinting", "navegación"],
    "toolLink": "/tools/generador-useragent",
    "toolName": "Generador de User-Agent",
    "faqs": [
      { "q": "¿Qué es la cabecera User-Agent?", "a": "Es una cadena de texto que tu navegador envía a cada sitio web indicando tu sistema operativo, motor de renderizado y versión del navegador." },
      { "q": "¿Cómo se utiliza el User-Agent para el rastreo?", "a": "Al combinarse con otras variables (como resolución de pantalla y tipografías), los rastreadores construyen una huella digital única (fingerprint) para identificarte sin usar cookies." },
      { "q": "¿Por qué cambiar o alternar mi User-Agent?", "a": "Permite simular que estás navegando desde un dispositivo o sistema diferente, confundiendo a los algoritmos de tracking y permitiendo acceder a versiones web restringidas." }
    ],
    "content": """Cada vez que accedes a un sitio web, tu navegador realiza una presentación formal enviando una cabecera de texto conocida como **User-Agent**. Esta cadena contiene detalles exactos sobre la arquitectura de tu computadora, tu sistema operativo y la versión exacta de tu navegador.

### La paradoja de la personalización y el Fingerprinting

Originalmente diseñado para servir contenido web adaptado a tu dispositivo, el User-Agent se ha convertido en una pieza clave de la **huella digital del navegador** (*browser fingerprinting*).

Los trackers publicitarios registran estas cabeceras. Si utilizas combinaciones poco comunes de software, tu User-Agent te hace destacar entre la multitud, facilitando que te identifiquen a través de múltiples páginas, incluso si borras tus cookies o usas navegación privada.

Modificar o alternar periódicamente tu User-Agent es una defensa activa muy recomendada para analistas de seguridad y entusiastas de la privacidad.

Para obtener cadenas de User-Agent actualizadas de diferentes dispositivos y sistemas operativos para tus scripts o extensiones de privacidad, puedes usar nuestro catálogo:

**[Prueba nuestro Generador de User-Agent](/tools/generador-useragent)**

Genera al instante cabeceras válidas y limpias de Chrome, Firefox, Safari, Android y dispositivos iOS para tus navegaciones seguras."""
  },
  {
    "filename": "ofuscador-texto-unicode-zalgo-seguridad-mensajeria.md",
    "title": "Ofuscación de caracteres: El arte de ocultar texto con Unicode y Zalgo",
    "excerpt": "Aprende cómo funciona el estándar Unicode y cómo los caracteres combinados te permiten ofuscar mensajes de texto y evitar filtros automáticos.",
    "category": "privacidad",
    "tags": ["ofuscación", "Unicode", "Zalgo", "seguridad", "filtros-de-texto"],
    "toolLink": "/tools/ofuscador-texto",
    "toolName": "Ofuscador de Texto",
    "faqs": [
      { "q": "¿Qué es el texto Zalgo?", "a": "Es texto que utiliza marcas de combinación Unicode de forma masiva hacia arriba, abajo y en medio, creando un efecto visual corrupto o distorsionado." },
      { "q": "¿Para qué sirve ofuscar un texto?", "a": "Permite ocultar caracteres de texto de los algoritmos de escaneo automáticos, protegiendo mensajes privados o evitando censuras de palabras clave en foros públicos." },
      { "q": "¿Cómo interpreta una computadora el texto ofuscado?", "a": "A nivel visual puede parecer distorsionado, pero la computadora lee los puntos de código Unicode individuales correspondientes a las letras base originales." }
    ],
    "content": """El estándar **Unicode** permite a las computadoras representar texto en casi cualquier idioma y símbolo del planeta. Sin embargo, este estándar incluye capacidades avanzadas que pueden usarse para fines creativos de privacidad: la **ofuscación de texto**.

### El misterio de los caracteres combinables

En Unicode, existen caracteres de espaciado cero y diacríticos combinables. Son caracteres especiales diseñados para colocarse encima o al lado del carácter anterior (como las tildes o la letra eñe).

Si se aplican decenas de estos modificadores a una sola letra, la representación gráfica se desborda verticalmente. Esto es lo que se conoce popularmente como **texto Zalgo** o texto corrupto.

Aparte de su impacto estético, la ofuscación de texto mediante la sustitución de caracteres por homóglifos o diacríticos es útil para:
*   Evitar el filtrado automatizado de palabras clave por parte de bots de redes sociales.
*   Proteger contraseñas o datos en texto plano de raspadores de datos web básicos.
*   Crear firmas digitales visualmente distintas.

Para experimentar con la conversión de texto normal a versiones ofuscadas, Unicode o formato Zalgo de forma local, puedes usar nuestra herramienta:

**[Prueba nuestro Ofuscador de Texto](/tools/ofuscador-texto)**

Transforma tus textos al instante con diferentes niveles de intensidad y filtros Unicode manteniendo tus datos seguros y locales en tu máquina."""
  },
  {
    "filename": "codificador-base32-crockford-sistemas-legados.md",
    "title": "Codificación Base32: Cuándo usarla frente a Base64 y cómo funciona su algoritmo",
    "excerpt": "Descubre las propiedades del algoritmo de codificación Base32 y sus ventajas de legibilidad humana en sistemas criptográficos y URLs.",
    "category": "desarrollo",
    "tags": ["Base32", "codificación", "algoritmos", "desarrollo", "TOTP"],
    "toolLink": "/tools/codificador-base32",
    "toolName": "Codificador Base32",
    "faqs": [
      { "q": "¿Qué es la codificación Base32?", "a": "Es una técnica de codificación binario a texto que utiliza un alfabeto de 32 caracteres (letras de la A a la Z y números del 2 al 7)." },
      { "q": "¿Qué ventajas tiene Base32 sobre Base64?", "a": "Es insensible a mayúsculas/minúsculas y omite caracteres confusos visualmente (como el 0, 1, O, I), haciéndolo ideal para que los humanos copien códigos de seguridad manualmente." },
      { "q": "¿Dónde se utiliza comúnmente Base32?", "a": "Su aplicación más famosa es la codificación de las claves semilla secreta en aplicaciones de autenticación de doble factor (2FA/TOTP) como Google Authenticator." }
    ],
    "content": """En el desarrollo de software y transmisión de datos, a menudo necesitamos representar datos binarios (como bytes de un archivo o claves criptográficas) en formato de texto para evitar que se corrompun en canales de comunicación estándar.

Aunque **Base64** es la opción más popular, la especificación **Base32** (RFC 4648) ofrece ventajas críticas de usabilidad en ciertos escenarios.

### El diseño inteligente del alfabeto Base32

Al utilizar un subconjunto limitado de caracteres, Base32 está diseñado para resolver errores humanos:
*   **Sin ambigüedad visual:** Se eliminan letras fáciles de confundir como la \`I\` mayúscula, la \`l\` minúscula y el número \`1\`, además de la \`O\` y el \`0\`.
*   **Seguro para cualquier sistema de archivos:** Al no depender de mayúsculas o minúsculas para distinguir valores (a diferencia de Base64), es seguro para URLs y nombres de archivos en Windows o macOS.

Para codificar o decodificar cadenas de texto a formato Base32 bajo diferentes variantes (incluida la versión Crockford de alta legibilidad), puedes utilizar nuestra herramienta local:

**[Prueba nuestro Codificador Base32](/tools/codificador-base32)**

Codifica y decodifica al instante datos binarios de forma rápida y segura en tu navegador sin enviar datos a la red."""
  },
  {
    "filename": "conversor-base64-archivos-texto-transmision-segura.md",
    "title": "Transmisión de datos en la web: Conversión de archivos e imágenes a Base64",
    "excerpt": "Aprende qué es la codificación Base64, cómo incrustar archivos e imágenes directamente en tu código HTML y los costes de rendimiento asociados.",
    "category": "desarrollo",
    "tags": ["Base64", "desarrollo", "imágenes", "HTML", "rendimiento", "codificación"],
    "toolLink": "/tools/conversor-base64",
    "toolName": "Conversor Base64",
    "faqs": [
      { "q": "¿Qué es Base64?", "a": "Es un sistema de codificación que representa datos binarios en un formato de texto ASCII utilizando 64 caracteres imprimibles." },
      { "q": "¿Cuándo es recomendable incrustar imágenes en Base64?", "a": "Es ideal para optimizar el rendimiento al incrustar pequeños iconos o imágenes en hojas de estilo CSS o HTML, reduciendo el número de peticiones HTTP del servidor." },
      { "q": "¿Cuánto aumenta el tamaño del archivo al convertirlo a Base64?", "a": "La codificación Base64 incrementa el tamaño del archivo en aproximadamente un 33% en comparación con su representación binaria original." }
    ],
    "content": """El transporte de datos binarios (como imágenes, audios o documentos PDF) a través de protocolos diseñados exclusivamente para texto plano (como JSON o HTML) representa un desafío clásico en el desarrollo de software. La solución estándar es la codificación **Base64**.

### Cómo funciona Base64

Base64 toma grupos de 3 bytes (24 bits) y los redistribuye en 4 grupos de 6 bits cada uno. Cada grupo de 6 bits se traduce a un carácter correspondiente dentro del alfabeto Base64 de 64 caracteres (letras, números y los símbolos \`+\` y \`/\`).

```
Proceso de Codificación:
[Datos Binarios (3 Bytes)] ➔ 24 Bits ➔ 4 bloques de 6 bits ➔ [Texto Base64 (4 Caracteres)]
```

### Casos de uso comunes
*   **Data URIs:** Incrustar imágenes directamente en etiquetas HTML usando \`src=\"data:image/png;base64,...\"\`.
*   **APIs REST:** Enviar archivos adjuntos dentro de payloads JSON estructurados.
*   **Seguridad:** Enviar credenciales de autorización básica en las cabeceras HTTP de forma segura.

Para convertir archivos e imágenes a Base64 (o decodificarlos) de forma local, instantánea y segura, utiliza nuestra herramienta:

**[Prueba nuestro Conversor Base64](/tools/conversor-base64)**

Procesa tus imágenes y archivos en local sin subirlos a servidores externos para mantener la privacidad de tu información."""
  },
  {
    "filename": "conversor-hexadecimal-binario-decimal-programacion.md",
    "title": "El lenguaje de la máquina: Conversión entre Hexadecimal, Binario y Decimal",
    "excerpt": "Comprende la importancia de los sistemas numéricos base 2, base 10 y base 16 y aprende a realizar conversiones numéricas de manera lógica.",
    "category": "desarrollo",
    "tags": ["desarrollo", "hexadecimal", "binario", "decimal", "sistemas-numéricos"],
    "toolLink": "/tools/conversor-hex",
    "toolName": "Conversor Hexadecimal",
    "faqs": [
      { "q": "¿Por qué los programadores usan el sistema Hexadecimal?", "a": "Porque es un formato compacto para representar cadenas de bytes. Cada dígito hexadecimal representa exactamente 4 bits (un nibble), permitiendo escribir un byte con solo dos dígitos (ej. FF = 11111111)." },
      { "q": "¿Cómo funciona el sistema Binario?", "a": "Es el sistema numérico de base 2, que utiliza únicamente los dígitos 0 y 1. Es el lenguaje natural de los transistores en la electrónica digital." },
      { "q": "¿Cómo convierto un número Hexadecimal a Binario?", "a": "Cada dígito hexadecimal se convierte directamente a su valor binario de 4 bits. Por ejemplo, el dígito '9' es '1001' y 'A' es '1010', por lo que '9A' en hexadecimal es '10011010' en binario." }
    ],
    "content": """En informática y electrónica digital, el uso del sistema decimal tradicional (base 10) es ineficiente para entender cómo fluyen los datos en la memoria. Los programadores y administradores de sistemas deben dominar la conversión entre los sistemas **Binario (base 2)** y **Hexadecimal (base 16)**.

### Los sistemas numéricos de la informática

*   **Binario (Base 2):** El estado puro del silicio. Formado por ceros y unos que representan el paso o bloqueo de corriente eléctrica.
*   **Decimal (Base 10):** El sistema humano estándar.
*   **Hexadecimal (Base 16):** La forma intermedia elegante. Utiliza los dígitos del 0 al 9 y las letras de la A a la F. 

El hexadecimal es muy valioso porque permite resumir cadenas binarias largas y difíciles de leer para los humanos en formatos compactos y legibles (por ejemplo, al definir colores web CSS o direcciones de memoria física).

Para realizar conversiones instantáneas y precisas entre sistemas numéricos de forma local, puedes usar nuestra herramienta de conversión:

**[Prueba nuestro Conversor Hexadecimal / Binario / Decimal](/tools/conversor-hex)**

Introduce cualquier valor en cualquier base y obtén la representación equivalente en tiempo real junto con desglose de bytes."""
  },
  {
    "filename": "validador-json-formatear-minificar-estructuras-datos.md",
    "title": "Depuración de APIs: Cómo validar, formatear y minificar archivos JSON sin errores",
    "excerpt": "Aprende las reglas estrictas de sintaxis de JSON, cómo detectar comas huérfanas y optimizar tus payloads mediante minificación.",
    "category": "desarrollo",
    "tags": ["JSON", "APIs", "desarrollo", "validación", "minificación"],
    "toolLink": "/tools/validador-json",
    "toolName": "Validador JSON",
    "faqs": [
      { "q": "/*¿Cuáles son los errores de sintaxis comunes en un archivo JSON?*/", "a": "Los errores más habituales son: dejar una coma al final del último elemento de un objeto o lista, usar comillas simples (') en lugar de comillas dobles (\"), o llaves y corchetes sin cerrar." },
      { "q": "/*¿Qué diferencia hay entre formatear y minificar un JSON?*/", "a": "Formatear añade sangrías y saltos de línea para facilitar la lectura a los programadores. Minificar elimina todos los espacios y líneas en blanco innecesarias para reducir el tamaño del archivo al transmitirlo por red." },
      { "q": "/*¿Es seguro validar archivos JSON online?*/", "a": "Solo si se hace de forma local en tu navegador mediante Javascript. Si envías el JSON a servidores remotos para su procesamiento, corres el riesgo de filtrar datos de clientes o claves API." }
    ],
    "content": """El formato **JSON** (JavaScript Object Notation) es el estándar omnipresente para el intercambio de datos en la web moderna. A pesar de su simplicidad, JSON tiene reglas sintácticas extremadamente estrictas que impiden que los parsers lean la información si existe el más mínimo error.

### Reglas básicas que rompen tu JSON

Al construir o depurar archivos de configuración o payloads de APIs, debes cuidar la sintaxis:
*   **Comillas Obligatorias:** Tanto las claves como las cadenas de texto deben ir entre comillas dobles (\`\"\`). Las comillas simples (\`'\`) no son válidas en JSON.
*   **Sin Comas Finales:** Dejar una coma al final de una lista u objeto antes del cierre provocaría un error fatal en la mayoría de lenguajes.
*   **Tipos de Datos Correctos:** Asegurar que los booleanos y números no lleven comillas para no convertirlos en texto plano.

Para validar rápidamente tus estructuras de datos, darles formato legible o minificarlas para mejorar el WPO de tus APIs, utiliza nuestra herramienta:

**[Prueba nuestro Validador y Formateador JSON](/tools/validador-json)**

Inspecciona tus JSON de forma instantánea y local para detectar errores sintácticos precisos con resaltado de sintaxis."""
  },
  {
    "filename": "generador-uuid-v4-v7-ulid-claves-primarias-unicas.md",
    "title": "Identificadores únicos: Diferencias entre UUID v4, v7 y ULID en bases de datos",
    "excerpt": "Descubre cómo elegir el identificador único adecuado para tus tablas de bases de datos. Comparativa de rendimiento entre UUID aleatorios y ordenados por tiempo.",
    "category": "desarrollo",
    "tags": ["UUID", "ULID", "bases-de-datos", "desarrollo", "rendimiento", "SQL"],
    "toolLink": "/tools/generador-uuid",
    "toolName": "Generador UUID",
    "faqs": [
      { "q": "¿Qué es un UUID?", "a": "Es un Identificador Único Universal de 128 bits de longitud, diseñado para garantizar la unicidad de las claves en sistemas distribuidos sin coordinación central." },
      { "q": "¿Por qué UUID v4 tiene problemas de rendimiento en bases de datos?", "a": "Al ser completamente aleatorio, fragmenta el índice primario (B-Tree) de las tablas SQL, provocando constantes escrituras en disco y ralentizando las consultas de inserción." },
      { "q": "¿Cómo soluciona UUID v7 y ULID este problema?", "a": "Integran un timestamp de milisegundos en la primera sección del identificador. Esto los hace ordenados cronológicamente (monotónicos), preservando la velocidad del indexado en la base de datos." }
    ],
    "content": """Al diseñar sistemas informáticos distribuidos, la asignación de claves primarias en bases de datos requiere identificadores que no colisionen nunca. Durante años, la solución estándar ha sido el **UUID v4**. Sin embargo, la computación moderna está adoptando alternativas más eficientes como **UUID v7** y **ULID**.

### La evolución de los IDs de 128 bits

*   **UUID v4 (Aleatorio):** Excelente para tokens efímeros. Sin embargo, su aleatoriedad total destruye el rendimiento del índice primario en bases de datos relacionales al insertar registros a gran escala.
*   **UUID v7 (Tiempo Ordenado):** El nuevo estándar oficial (RFC 9562). Combina 48 bits de timestamp con bits aleatorios, lo que significa que los IDs se insertan de forma secuencial mejorando drásticamente el rendimiento de lectura/escritura.
*   **ULID (Universally Unique Lexicographically Sortable Identifier):** Similar a UUID v7, pero utiliza codificación Base32 (26 caracteres) haciéndolo más compacto de almacenar y representar en URLs que los tradicionales guiones de UUID.

Para generar identificadores UUID v4, v7 o ULID de forma masiva y local para tus desarrollos de software, utiliza nuestra herramienta interactiva:

**[Prueba nuestro Generador de UUID y ULID](/tools/generador-uuid)**

Genera al instante IDs aleatorios o cronológicos listos para usar en tus scripts de migración o bases de datos."""
  },
  {
    "filename": "codificador-url-percent-encoding-seguridad-enlaces.md",
    "title": "Estructura web: Codificación de caracteres especiales en URLs (Percent-Encoding)",
    "excerpt": "Descubre cómo funciona la codificación URL o Percent-Encoding y por qué es indispensable para transmitir parámetros seguros en internet.",
    "category": "desarrollo",
    "tags": ["URL", "Percent-Encoding", "desarrollo", "seguridad", "enlaces"],
    "toolLink": "/tools/codificador-url",
    "toolName": "Codificador URL",
    "faqs": [
      { "q": "¿Qué es la codificación URL (Percent-Encoding)?", "a": "Es un mecanismo de codificación para traducir caracteres especiales y símbolos que no pertenecen al conjunto de caracteres permitidos en una URL a una representación segura usando signos de porcentaje (%)." },
      { "q": "¿Por qué el espacio se convierte en %20?", "a": "Las URLs estándar no pueden contener espacios en blanco. En el sistema de codificación, el espacio se reemplaza por su representación hexadecimal `%20` o por el signo más (+)." },
      { "q": "¿Qué caracteres se consideran reservados en una URL?", "a": "Los caracteres reservados tienen funciones sintácticas específicas (como ?, &, =, /, :, #). Si forman parte de un dato que queremos enviar como parámetro, deben codificarse para no romper la estructura de la URL." }
    ],
    "content": """El estándar que define la estructura de las direcciones en internet (RFC 3986) establece que una **URL** solo puede utilizar un conjunto limitado de caracteres seguros (letras alfanuméricas del alfabeto inglés y algunos símbolos no reservados). 

Si un enlace requiere enviar espacios, caracteres con acentos o símbolos especiales (como la ñ), debe aplicarse la codificación **Percent-Encoding** o codificación URL.

### El peligro de los caracteres mal procesados

Cuando un script o navegador web intenta procesar una URL que contiene caracteres reservados sin codificar (por ejemplo, enviar un parámetro que contenga el signo \`&\` o \`?\`), el navegador puede interpretar que se trata de un nuevo parámetro de la URL, provocando errores en las aplicaciones web o caídas de APIs.

Una codificación correcta garantiza que los servidores intercepten y procesen las cadenas de texto exactamente como el usuario las ingresó.

Para codificar o decodificar enlaces web de forma rápida y local desde la privacidad de tu navegador, puedes utilizar nuestra herramienta:

**[Prueba nuestro Codificador / Decodificador URL](/tools/codificador-url)**

Realiza traducciones instantáneas de parámetros y enlaces de forma limpia, segura y privada en tu dispositivo local."""
  },
  {
    "filename": "regex-tester-expresiones-regulares-validacion-patrones.md",
    "title": "El poder de las expresiones regulares: Cómo testear y construir patrones Regex",
    "excerpt": "Aprende los fundamentos de las expresiones regulares (Regex) y cómo testear tus patrones para evitar problemas de rendimiento y seguridad como ReDoS.",
    "category": "desarrollo",
    "tags": ["Regex", "desarrollo", "seguridad", "ReDoS", "validación", "patrones"],
    "toolLink": "/tools/regex-tester",
    "toolName": "Regex Tester",
    "faqs": [
      { "q": "¿Qué son las expresiones regulares (Regex)?", "a": "Es una secuencia de caracteres que forma un patrón de búsqueda, utilizada principalmente para la validación de formatos de texto (como emails o teléfonos) o la manipulación de strings." },
      { "q": "¿Qué es un ataque de Denegación de Servicio por Expresión Regular (ReDoS)?", "a": "Es una vulnerabilidad que ocurre cuando un patrón Regex ineficiente entra en un ciclo de evaluación exponencial (catastrophic backtracking) al recibir ciertas cadenas de texto, congelando los servidores por el consumo masivo de CPU." },
      { "q": "/*¿Qué significan los modificadores globales (Flags) en Regex?*/", "a": "Son parámetros que alteran la búsqueda: 'g' (global, busca todas las coincidencias), 'i' (case-insensitive, ignora mayúsculas/minúsculas) y 'm' (multiline, evalúa coincidencias por líneas)." }
    ],
    "content": """Las **expresiones regulares (Regex)** son una de las herramientas más potentes y versátiles para cualquier desarrollador de software. Permiten realizar búsquedas de texto avanzadas, validaciones de formatos de entrada complejos y reemplazo de caracteres en bases de código masivas en una sola línea de código.

### El peligro del Backtracking Catastrófico

A pesar de su utilidad, un patrón Regex mal diseñado puede convertirse en una pesadilla de seguridad. Si se utilizan cuantificadores anidados (como \`(a+)+\`) en un motor de expresiones regulares tradicional, el algoritmo puede sufrir **backtracking catastrófico** ante una cadena que no coincida con el patrón, consumiendo el 100% de la CPU de tu servidor. Esto se conoce en ciberseguridad como un ataque **ReDoS**.

Por este motivo, los desarrolladores deben probar y validar exhaustivamente la eficiencia de sus expresiones regulares antes de integrarlas en producción.

Para probar tus expresiones regulares, verificar coincidencias de texto en tiempo real y analizar su comportamiento de forma segura, puedes utilizar nuestra herramienta local:

**[Prueba nuestro Regex Tester Interactivo](/tools/regex-tester)**

Crea y depura tus patrones Regex con soporte para resaltado de grupos coincidentes sin enviar información a servidores de internet."""
  },
  {
    "filename": "formateador-sql-embellecer-consultas-bases-datos.md",
    "title": "Código limpio en bases de datos: Cómo formatear y embellecer consultas SQL",
    "excerpt": "Descubre los principios de la legibilidad en el código SQL y cómo el formato estructurado reduce las posibilidades de cometer errores lógicos.",
    "category": "desarrollo",
    "tags": ["SQL", "bases-de-datos", "desarrollo", "código-limpio", "formateo"],
    "toolLink": "/tools/formateador-sql",
    "toolName": "Formateador SQL",
    "faqs": [
      { "q": "/*¿Por qué es importante formatear las consultas SQL?*/", "a": "Porque las consultas de bases de datos complejas (con múltiples subconsultas, JOINs y WHERE clauses) se vuelven ilegibles si se escriben en una sola línea, dificultando las revisiones de código y el mantenimiento." },
      { "q": "/*¿El formateo de SQL afecta al rendimiento de la base de datos?*/", "a": "No. Los motores de bases de datos eliminan los espacios en blanco innecesarios antes de compilar y optimizar el plan de ejecución de la consulta. La mejora es puramente de legibilidad humana." },
      { "q": "/*¿Qué reglas estándar se aplican al formatear SQL?*/", "a": "Escribir las palabras clave en mayúsculas (SELECT, FROM, JOIN, WHERE), tabular los parámetros y organizar cada sección de filtro en líneas independientes para fácil lectura." }
    ],
    "content": """En la administración de bases de datos y desarrollo backend, escribir código estructurado y limpio es una regla de oro. Sin embargo, las consultas **SQL** complejas suelen convertirse rápidamente en extensas cadenas de texto de una sola línea difíciles de entender durante auditorías de rendimiento o revisiones de código.

### El impacto de la legibilidad en bases de datos

Mantener un formato SQL estructurado aporta ventajas definitivas:
*   **Mantenimiento Sencillo:** Facilita la comprensión de las uniones de tablas (\`JOINs\`) y las condiciones complejas del filtro (\`WHERE\`).
*   **Depuración Rápida:** Permite aislar errores de sintaxis y comas faltantes de forma visual inmediata.
*   **Colaboración Eficiente:** Estandariza la forma en que los equipos de ingeniería leen y optimizan la base de datos.

Para dar un formato profesional y legible a tus consultas de bases de datos de forma instantánea y local, utiliza nuestra herramienta:

**[Prueba nuestro Formateador SQL](/tools/formateador-sql)**

Embellece tus scripts y sentencias SQL al instante con la configuración de sangría ideal y conversión automática de palabras clave a mayúsculas."""
  },
  {
    "filename": "generador-cron-expresiones-automatizacion-tareas-servidor.md",
    "title": "Automatización de servidores: Guía práctica para crear expresiones Cron sin fallos",
    "excerpt": "Aprende la sintaxis de los planificadores de tareas cron y cómo generar expresiones precisas para automatizar tus respaldos y procesos.",
    "category": "desarrollo",
    "tags": ["Cron", "servidores", "automatización", "Linux", "desarrollo", "sysadmin"],
    "toolLink": "/tools/generador-cron",
    "toolName": "Generador Cron",
    "faqs": [
      { "q": "/*¿Qué es una tarea cron (Cron Job)?*/", "a": "Es un servicio en sistemas Linux/Unix que ejecuta de forma automática comandos o scripts en segundo plano a intervalos y fechas programadas." },
      { "q": "/*¿Cómo se compone una expresión cron?*/", "a": "Se compone de cinco o seis campos numéricos separados por espacios que indican: minuto, hora, día del mes, mes y día de la semana." },
      { "q": "/*¿Qué significan los caracteres especiales (*, /, ,) en cron?*/", "a": "El asterisco (*) significa 'cualquier valor', la barra (/) define pasos o intervalos (ej. */15 es cada 15 minutos), y la coma (,) separa valores específicos." }
    ],
    "content": """La automatización de procesos rutinarios (como la rotación de logs de servidores, el envío de reportes diarios, la sincronización de archivos o la realización de copias de seguridad de bases de datos) se gestiona tradicionalmente mediante **cron** en sistemas operativos Unix y Linux.

### Descifrando la sintaxis crontab

Una expresión cron clásica consta de 5 valores separados por espacios:

```
*  *  *  *  *
┬  ┬  ┬  ┬  ┬
│  │  │  │  └─ Día de la semana (0 - 6) (Domingo = 0)
│  │  │  └──── Mes (1 - 12)
│  │  └─────── Día del mes (1 - 31)
│  └────────── Hora (0 - 23)
└───────────── Minuto (0 - 59)
```

Un error común al escribir expresiones cron complejas es confundir el orden de los campos o configurar intervalos incorrectos, lo que puede provocar que procesos críticos se ejecuten repetidamente por error o nunca inicien.

Para construir y verificar tus expresiones cron de forma rápida y con traducción textual para evitar errores de programación, puedes utilizar nuestra utilidad interactiva:

**[Prueba nuestro Generador de Expresiones Cron](/tools/generador-cron)**

Genera al instante la expresión cron exacta para tus respaldos de servidor de forma visual y libre de fallas."""
  },
  {
    "filename": "minificador-css-js-optimizar-rendimiento-web.md",
    "title": "WPO avanzado: Cómo minificar CSS y Javascript para acelerar tu web",
    "excerpt": "Descubre cómo la minificación de recursos web mejora los tiempos de carga, reduce el ancho de banda consumido por tus servidores y optimiza tu posicionamiento SEO.",
    "category": "desarrollo",
    "tags": ["WPO", "minificación", "CSS", "Javascript", "rendimiento", "velocidad"],
    "toolLink": "/tools/minificador-css",
    "toolName": "Minificador CSS/JS",
    "faqs": [
      { "q": "/*¿Qué es la minificación de archivos?*/", "a": "Es el proceso de remover espacios en blanco, saltos de línea, comentarios y caracteres innecesarios del código fuente para reducir el peso del archivo sin alterar su funcionalidad lógica." },
      { "q": "/*¿Qué diferencia hay entre minificar y comprimir?*/", "a": "La minificación altera directamente el texto del código a nivel sintáctico. La compresión (como Gzip o Brotli) es un algoritmo de reducción de datos que ejecuta el servidor web al enviar el archivo comprimido a la red." },
      { "q": "/*¿La minificación puede romper mi código?*/", "a": "Solo si el código carece de sintaxis correcta (como la omisión de puntos y comas en JavaScript) o si los minificadores realizan ofuscación agresiva mal configurada. Un minificador básico estándar es seguro." }
    ],
    "content": """La velocidad de carga de un sitio web es uno de los factores más importantes tanto para retener a tus visitantes como para mejorar tu posicionamiento en motores de búsqueda. En la disciplina de Optimización del Rendimiento Web (**WPO**), la **minificación de archivos** es un paso obligatorio.

### El coste del código formateado

Mientras desarrollamos aplicaciones, utilizamos espaciados amplios, tabulaciones consistentes y comentarios descriptivos para hacer el código legible para otros ingenieros.

Sin embargo, a los navegadores no les importa la estética. Al subir estos archivos sin procesar a tu servidor de producción, estás forzando a los navegadores de tus usuarios a descargar kilobytes adicionales de caracteres vacíos, incrementando el tiempo de renderizado inicial (**First Contentful Paint**).

La minificación elimina este lastre, logrando reducciones de tamaño de hasta un **40%** en tus archivos de estilos y lógica.

Para optimizar y minificar tus fragmentos de código CSS y JavaScript de manera instantánea y privada, utiliza nuestra herramienta local:

**[Prueba nuestro Minificador CSS/JS](/tools/minificador-css)**

Pega tu código formateado y obtén al instante una versión minificada óptima lista para implementar en tu entorno de producción."""
  },
  {
    "filename": "contador-caracteres-palabras-limites-seo-redes-sociales.md",
    "title": "Redacción estratégica: Herramientas para contar palabras y respetar límites SEO",
    "excerpt": "Conoce los límites exactos de caracteres recomendados para tus publicaciones en redes sociales y etiquetas meta de SEO para evitar el truncamiento.",
    "category": "utilidades",
    "tags": ["redacción", "SEO", "caracteres", "redes-sociales", "marketing", "copywriting"],
    "toolLink": "/tools/contador-caracteres",
    "toolName": "Contador de Caracteres",
    "faqs": [
      { "q": "/*¿Por qué Google trunca los títulos SEO en el buscador?*/", "a": "Porque Google mide el tamaño del título en píxeles (aproximadamente 600px) en lugar de caracteres. En promedio, esto equivale a unos 55-60 caracteres máximo para evitar los puntos suspensivos." },
      { "q": "/*¿Qué límites de caracteres aplican a las principales redes sociales?*/", "a": "Los límites principales son: Twitter (280 caracteres), Instagram (2,200 en subtítulos), LinkedIn (3,000 en publicaciones) y Facebook (63,206)." },
      { "q": "/*¿Cuál es la velocidad de lectura humana promedio?*/", "a": "La velocidad de lectura media para un adulto es de 200 a 250 palabras por minuto, dato útil para calcular el tiempo estimado de lectura de tus artículos." }
    ],
    "content": """En la creación de contenidos digitales (ya sea escribiendo copys persuasivos para redes sociales o redactando etiquetas meta para optimizar el SEO de un artículo), la longitud de tus textos no es opcional.

Respetar los límites de longitud garantiza que tu mensaje se entregue completo y con impacto visual.

### Los límites clave del SEO y Marketing

*   **Meta Title de Google:** Debe oscilar entre 50 y 60 caracteres. Superar este límite causa que Google recorte tu título con puntos suspensivos (\`...\`), disminuyendo el CTR.
*   **Meta Description:** El rango recomendado es entre 150 y 160 caracteres.
*   **Publicidad Digital (Google/Facebook Ads):** Los títulos y descripciones de anuncios tienen límites de caracteres estrictos que impiden la publicación si se superan por una sola letra.

Para redactar y controlar las longitudes de tus textos en tiempo real de forma local y privada, puedes usar nuestro contador:

**[Prueba nuestro Contador de Caracteres y Palabras](/tools/contador-caracteres)**

Escribe o pega tus textos y analiza al instante métricas como palabras, párrafos, tiempo estimado de lectura y cumplimiento de límites de redes sociales."""
  },
  {
    "filename": "generador-lorem-ipsum-texto-relleno-maquetacion-diseno.md",
    "title": "Diseño y maquetación: El uso correcto de texto de relleno (Lorem Ipsum)",
    "excerpt": "Descubre el origen del texto de relleno Lorem Ipsum y cómo ayuda a los diseñadores a concentrarse en la estética visual de las interfaces.",
    "category": "utilidades",
    "tags": ["Lorem Ipsum", "diseño-web", "maquetación", "UX-UI", "maquetado"],
    "toolLink": "/tools/generador-lorem",
    "toolName": "Generador Lorem Ipsum",
    "faqs": [
      { "q": "/*¿Cuál es el origen de Lorem Ipsum?*/", "a": "Proviene de un tratado de ética escrito por Cicerón en el año 45 a.C., titulado 'De finibus bonorum et malorum' (Sobre los límites del bien y del mal)." },
      { "q": "/*¿Por qué se utiliza texto de relleno en diseño?*/", "a": "Para que el evaluador de un diseño se concentre en la composición tipográfica, la distribución espacial y los colores, en lugar de distraerse leyendo e interpretando el contenido del texto." },
      { "q": "/*¿Qué problemas puede causar un mal uso de Lorem Ipsum?*/", "a": "Puede ocultar necesidades reales de espacio si los textos reales finales son significativamente más largos o cortos que el relleno simulado, por lo que debe combinarse con pruebas de contenido real." }
    ],
    "content": """En la maquetación de periódicos, el diseño gráfico y el desarrollo de interfaces de usuario (**UI/UX**), el uso de textos de simulación es un estándar industrial. El fragmento de texto de relleno más conocido en todo el mundo es, sin duda, el **Lorem Ipsum**.

### El origen de un clásico

Aunque a primera vista parezca una combinación aleatoria de palabras en latín sin sentido, Lorem Ipsum tiene raíces históricas. El texto deriva de pasajes del tratado de ética del filósofo romano Cicerón, escrito en el año 45 a.C. El fragmento original analiza la búsqueda del dolor por el dolor en sí mismo: *"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet..."*.

### Beneficios prácticos en el diseño
*   **Elimina la distracción cognitiva:** Al evaluar una interfaz nueva, si el texto es legible, los evaluadores se concentran en el contenido y no en la distribución del espacio.
*   **Simulación de distribución natural:** A diferencia de repetir \`texto texto texto\`, Lorem Ipsum distribuye las longitudes de las palabras emulando de forma realista el flujo del lenguaje escrito.

Para generar párrafos, listas o palabras de relleno personalizadas de forma rápida para tus proyectos de diseño y maquetación, utiliza nuestra herramienta local:

**[Prueba nuestro Generador de Lorem Ipsum](/tools/generador-lorem)**

Define la cantidad de texto que necesitas y copia el relleno al portapapeles al instante sin anuncios ni esperas."""
  },
  {
    "filename": "comparador-archivos-diff-viewer-detectar-cambios-codigo.md",
    "title": "Control de cambios: Cómo usar visores Diff para comparar archivos línea por línea",
    "excerpt": "Aprende cómo los desarrolladores comparan versiones de archivos y detectan diferencias lógicas en el código mediante algoritmos de comparación (Diff).",
    "category": "utilidades",
    "tags": ["desarrollo", "Diff", "comparador", "control-de-versiones", "código"],
    "toolLink": "/tools/comparador-archivos",
    "toolName": "Comparador de Archivos",
    "faqs": [
      { "q": "/*¿Qué es un comparador de archivos (Diff)?*/", "a": "Es una herramienta de software que analiza dos versiones de un archivo y resalta visualmente las líneas que fueron agregadas, eliminadas o modificadas entre ambas." },
      { "q": "/*¿Cómo ayuda un visor de diferencias a los desarrolladores?*/", "a": "Permite inspeccionar cambios antes de guardarlos en el control de versiones (Git), revisar parches de código y localizar errores lógicos introducidos en actualizaciones recientes." },
      { "q": "/*¿Es seguro comparar archivos con datos sensibles online?*/", "a": "Solo si la comparación se realiza completamente del lado del cliente mediante JavaScript. Enviar tus archivos a un servidor web de terceros para hacer el 'diff' expone tu propiedad intelectual o datos confidenciales." }
    ],
    "content": """En el desarrollo de software y la administración de sistemas, el control de cambios es una tarea diaria. Al editar código fuente o actualizar archivos de configuración, saber exactamente qué caracteres se han modificado es crucial.

Para resolver esto, los programadores confían en las herramientas de **Diff** o visores de diferencias.

### Cómo funcionan los algoritmos de Diff

Los visores Diff analizan dos fuentes de datos (el archivo original y la versión modificada) buscando la secuencia de coincidencias más larga posible.

Posteriormente, organizan las diferencias en dos tipos de visualizaciones principales:
1.  **Vista Lado a Lado (Side-by-Side):** Muestra ambos archivos en columnas paralelas, ideal para inspeccionar cambios de estructura.
2.  **Vista Unificada (Inline):** Muestra los cambios en una sola columna consecutiva, marcando las eliminaciones en rojo y las adiciones en verde.

Esta inspección visual evita que errores accidentales de tipografía o código roto se suban a tus servidores de producción.

Para comparar de manera segura y privada dos textos o archivos de código sin enviar los datos a internet, puedes utilizar nuestra herramienta:

**[Prueba nuestro Comparador de Archivos (Diff Viewer)](/tools/comparador-archivos)**

Realiza análisis de diferencias línea por línea de forma 100% local en tu propio navegador web."""
  },
  {
    "filename": "conversor-colores-hex-rgb-hsl-diseno-web.md",
    "title": "Teoría del color digital: Conversión entre formatos HEX, RGB, HSL y Tailwind",
    "excerpt": "Aprende cómo representan las pantallas el espectro de colores y las diferencias clave entre los modelos de color digital más comunes.",
    "category": "utilidades",
    "tags": ["diseño-web", "colores", "HEX", "RGB", "HSL", "Tailwind"],
    "toolLink": "/tools/conversor-colores",
    "toolName": "Conversor de Colores",
    "faqs": [
      { "q": "/*¿Qué es el formato de color HEX?*/", "a": "Es la representación hexadecimal de color de 24 bits en formato hexadecimal (base 16). Los primeros dos dígitos representan el canal Rojo, los siguientes dos el Verde y los dos finales el Azul (ej. #FF0000 = Rojo puro)." },
      { "q": "/*¿En qué se diferencian los modelos RGB y HSL?*/", "a": "RGB representa la mezcla aditiva directa de luz (Red, Green, Blue). HSL define el color basándose en la percepción humana: Matiz (Hue, 0-360 grados), Saturación (Saturation, 0-100%) y Luminosidad (Lightness, 0-100%)." },
      { "q": "/*¿Por qué los diseñadores web prefieren usar HSL?*/", "a": "Porque es mucho más intuitivo para realizar ajustes visuales: por ejemplo, oscurecer o aclarar un color solo requiere modificar el porcentaje de Luminosidad (L), manteniendo el mismo tono (H) intacto." }
    ],
    "content": """El diseño de interfaces web atractivas y funcionales depende en gran medida de una buena gestión del color. Las computadoras y pantallas muestran colores combinando tres canales de luz (Rojo, Verde y Azul). Sin embargo, existen diferentes formas matemáticas de definir estas mezclas en el código fuente.

### Los principales formatos de color en desarrollo web

*   **HEX (Hexadecimal):** El formato tradicional en HTML/CSS. Representa los canales de color en tres pares hexadecimales (#RRGGBB). Es compacto pero difícil de editar mentalmente.
*   **RGB (Red, Green, Blue):** Define el color mediante valores enteros del 0 al 255 para cada canal (ej. \`rgb(255, 0, 0)\`).
*   **HSL (Hue, Saturation, Lightness):** El formato preferido por los diseñadores modernos. Al separar el tono de la intensidad y el brillo, facilita la creación de paletas armónicas y sistemas de diseño con modos oscuros dinámicos.
*   **Tailwind CSS Arbitrary values:** Colores vinculados al marco de diseño Tailwind.

Para realizar conversiones instantáneas entre formatos de color y obtener la paleta equivalente en tiempo real, puedes utilizar nuestro conversor:

**[Prueba nuestro Conversor de Colores Web](/tools/conversor-colores)**

Traduce al instante cualquier código HEX, RGB, HSL o Tailwind CSS de forma visual y local desde tu navegador."""
  },
  {
    "filename": "conversor-markdown-html-redaccion-contenido-estructurado.md",
    "title": "Formato simplificado: Cómo convertir textos Markdown a código HTML limpio",
    "excerpt": "Descubre las ventajas de redactar contenidos usando el estándar Markdown y aprende cómo se transforma en etiquetas HTML válidas.",
    "category": "utilidades",
    "tags": ["Markdown", "HTML", "redacción", "desarrollo", "conversor", "WPO"],
    "toolLink": "/tools/conversor-markdown",
    "toolName": "Conversor Markdown",
    "faqs": [
      { "q": "/*¿Qué es Markdown?*/", "a": "Es un lenguaje de marcado ligero creado por John Gruber en 2004, diseñado para escribir textos con formato fácil de leer y escribir en editores de texto plano, y que se pueda convertir fácilmente a HTML." },
      { "q": "/*¿Qué ventajas tiene escribir en Markdown frente a HTML?*/", "a": "Markdown evita tener que escribir decenas de etiquetas engorrosas como <h1>, <p> o <a> de forma manual, permitiendo concentrarse en la redacción y agilizando la creación de contenidos." },
      { "q": "/*¿Cómo se convierte un encabezado en Markdown?*/", "a": "Se utilizan signos de almohadilla (#). Una sola almohadilla representa un título principal \`<h1>\`, dos representan un \`<h2>\`, y así sucesivamente hasta seis niveles." }
    ],
    "content": """La redacción de documentación técnica, artículos de blog y correos electrónicos enriquecidos requiere una estructura HTML válida para ser procesada por los navegadores. Escribir directamente código HTML, sin embargo, resulta lento y propenso a errores tipográficos.

La solución estándar elegida por desarrolladores y creadores de contenido en todo el mundo es **Markdown**.

### La elegancia del texto plano estructurado

Markdown te permite dar formato de manera rápida usando símbolos intuitivos:
*   Negritas con doble asterisco: \`**texto**\`
*   Enlaces con corchetes y paréntesis: \`[enlace](https://ejemplo.com)\`
*   Listas con simples guiones: \`- elemento\`

Un analizador o parser convierte estas marcas de texto plano a código HTML semántico compatible con navegadores de forma instantánea.

Para redactar tus artículos en Markdown y convertirlos instantáneamente a código HTML limpio y optimizado de forma privada y local en tu navegador, puedes usar nuestro editor interactivo:

**[Prueba nuestro Conversor Markdown a HTML](/tools/conversor-markdown)**

Escribe con previsualización en tiempo real y copia el código HTML generado directamente listo para pegar en tu CMS."""
  },
  {
    "filename": "conversor-timestamp-unix-zonas-horarias-programacion.md",
    "title": "El tiempo en la informática: Conversión de Epoch Unix Timestamp a fechas reales",
    "excerpt": "Aprende qué es el tiempo Unix o Epoch timestamp, por qué se utiliza en los sistemas de bases de datos y cómo convertirlo a zonas horarias legibles.",
    "category": "utilidades",
    "tags": ["Timestamp", "Unix-time", "desarrollo", "bases-de-datos", "tiempo", "conversor"],
    "toolLink": "/tools/conversor-timestamp",
    "toolName": "Conversor Timestamp",
    "faqs": [
      { "q": "/*¿Qué es el Unix Timestamp (Epoch Time)?*/", "a": "Es la cantidad de segundos (o milisegundos) transcurridos desde el 1 de enero de 1970 a las 00:00:00 UTC (el origen de la época Unix), omitiendo los segundos intercalares." },
      { "q": "/*¿Por qué las bases de datos prefieren guardar fechas en formato Timestamp?*/", "a": "Porque al ser un simple número entero, es extremadamente rápido de indexar, ordenar y comparar a nivel de base de datos, además de eliminar ambigüedades sobre las zonas horarias locales." },
      { "q": "/*¿Qué pasará con el tiempo Unix en el año 2038?*/", "a": "En sistemas de 32 bits, el valor máximo entero se desbordará el 19 de enero de 2038 (el problema del año 2038), provocando errores críticos de tiempo similar al efecto Y2K si no se migra a arquitecturas de 64 bits." }
    ],
    "content": """Medir el tiempo y gestionar zonas horarias locales en aplicaciones de software es uno de los problemas más complejos del desarrollo de software. Para evitar confusiones con formatos regionales de fecha, los sistemas informáticos utilizan el estándar **Unix Timestamp** o Epoch time.

### La forma universal de medir el tiempo

El tiempo Unix representa el tiempo como un único número entero incremental que representa los segundos transcurridos desde un punto fijo en la historia: el **1 de enero de 1970 a las 00:00:00 UTC**.

Este número entero permanece idéntico en todo el planeta. La traducción a fechas locales (como "viernes, 19 de junio de 2026") y zonas horarias específicas (GMT-5, CEST, etc.) se calcula del lado del cliente en el momento de mostrar la información.

Para convertir números de Timestamp a fechas legibles por humanos (o viceversa) bajo diferentes formatos y zonas horarias de forma segura y local, puedes usar nuestra utilidad:

**[Prueba nuestro Conversor de Unix Timestamp](/tools/conversor-timestamp)**

Introduce cualquier marca de tiempo y obtén al instante su fecha equivalente desglosada en formato UTC y local."""
  },
  {
    "filename": "conversor-unidades-peso-longitud-temperatura.md",
    "title": "Cálculos rápidos: Cómo convertir unidades de longitud, peso y temperatura",
    "excerpt": "Descubre cómo los sistemas de unidades métricos e imperiales difieren y cómo automatizar conversiones complejas sin cometer errores matemáticos.",
    "category": "utilidades",
    "tags": ["unidades", "conversor", "métrica", "longitud", "peso", "temperatura"],
    "toolLink": "/tools/conversor-unidades",
    "toolName": "Conversor de Unidades",
    "faqs": [
      { "q": "/*¿Qué es el Sistema Internacional de Unidades (SI)?*/", "a": "Es el sistema métrico decimal estándar utilizado de forma casi universal en la ciencia y el comercio, basado en el metro, kilogramo y segundo." },
      { "q": "/*¿Por qué persisten las medidas imperiales?*/", "a": "Países como Estados Unidos y el Reino Unido aún usan unidades imperiales (pulgadas, libras, Fahrenheit) en su vida cotidiana e industrias específicas como la aeronáutica o construcción." },
      { "q": "/*¿Cómo se convierte Fahrenheit a Celsius de forma precisa?*/", "a": "La fórmula matemática es: $C = (F - 32) \\times 5/9$. Realizar este cálculo mentalmente es complejo, por lo que es mejor automatizarlo con herramientas locales." }
    ],
    "content": """Ya sea que estés programando un software con soporte internacional, analizando especificaciones técnicas de hardware importado de Estados Unidos, o simplemente resolviendo problemas académicos, la conversión de unidades es una necesidad cotidiana.

### Dos mundos: Sistema Métrico e Imperial

*   **Sistema Métrico (Internacional):** Basado en potencias de 10 (metros, gramos, litros). Es lógico y fácil de calcular.
*   **Sistema Imperial:** Utiliza conversiones arbitrarias (12 pulgadas en un pie, 3 pies en una yarda, 16 onzas en una libra).

Realizar conversiones rápidas entre kilómetros y millas, kilogramos y libras, o grados Celsius y Fahrenheit requiere precisión para evitar errores en reportes de datos o configuraciones de hardware.

Para realizar conversiones de longitud, peso, temperatura y más de forma instantánea, utiliza nuestro conversor local en tu navegador:

**[Prueba nuestro Conversor de Unidades](/tools/conversor-unidades)**

Selecciona la categoría, introduce el valor y obtén todas las conversiones equivalentes al instante de forma local y segura."""
  },
  {
    "filename": "calculadora-porcentajes-iva-descuentos-finanzas.md",
    "title": "Matemáticas cotidianas: Cómo calcular porcentajes, IVA y descuentos online",
    "excerpt": "Aprende a realizar cálculos financieros esenciales como la suma y resta de porcentajes, el cálculo de márgenes y la desagregación de impuestos como el IVA.",
    "category": "utilidades",
    "tags": ["porcentajes", "matemáticas", "finanzas", "IVA", "descuentos", "calculadora"],
    "toolLink": "/tools/calculadora-porcentajes",
    "toolName": "Calculadora de Porcentajes",
    "faqs": [
      { "q": "/*¿Cómo se calcula el porcentaje de un valor?*/", "a": "Se multiplica el número base por el porcentaje y se divide entre 100. Por ejemplo, el 15% de 200 es: $(200 \\times 15) / 100 = 30$." },
      { "q": "/*¿Cómo puedo desglosar el IVA de un precio final?*/", "a": "Para quitar el IVA (por ejemplo, del 21%), divides el precio final entre $1.21$ (o $1 + \\text{impuesto}/100$). La diferencia entre el precio original y este resultado es el impuesto cobrado." },
      { "q": "/*¿Qué es el incremento porcentual?*/", "a": "Mide el cambio relativo entre un valor inicial y uno final. Se calcula restando el valor inicial al final, dividiendo entre el inicial y multiplicando por 100." }
    ],
    "content": """El cálculo de porcentajes es una de las aplicaciones matemáticas más utilizadas en la vida cotidiana: al evaluar ofertas en tiendas comerciales, calcular propinas, estimar el interés de un préstamo, o desglosar impuestos sobre facturas de compras.

A pesar de su uso diario, cometer errores al sumar o restar porcentajes es muy común, especialmente cuando se intenta aplicar un descuento sobre un valor que ya incluye IVA.

### Fórmulas financieras clave que debes dominar

1.  **Cálculo de Descuento:**
    $$\\text{Precio Final} = \\text{Precio Original} \\times \\left(1 - \\frac{\\text{Descuento}}{100}\\right)$$
2.  **Desglose de Impuesto (IVA):**
    $$\\text{Base Imponible} = \\frac{\\text{Precio Total}}{1 + \\frac{\\text{Impuesto}}{100}}$$

Para automatizar estos cálculos comerciales de forma precisa y local desde tu navegador sin anuncios molestos, utiliza nuestra calculadora:

**[Prueba nuestra Calculadora de Porcentajes e IVA](/tools/calculadora-porcentajes)**

Realiza cálculos de aumentos, descuentos, porcentajes directos y desgloses de impuestos de manera instantánea y privada."""
  },
  {
    "filename": "generador-csv-datos-tabulares-excel-bases-datos.md",
    "title": "Manipulación de hojas de cálculo: Creación y exportación de archivos CSV",
    "excerpt": "Descubre el estándar CSV para almacenar datos estructurados en texto plano y aprende cómo importar y exportar tablas de forma compatible.",
    "category": "utilidades",
    "tags": ["CSV", "Excel", "bases-de-datos", "datos", "desarrollo", "exportación"],
    "toolLink": "/tools/generador-csv",
    "toolName": "Generador CSV",
    "faqs": [
      { "q": "/*¿Qué es un archivo CSV?*/", "a": "Es un archivo de texto plano estructurado que almacena información en forma de tabla, donde cada línea representa una fila y los campos están delimitados por comas o punto y coma." },
      { "q": "/*¿Por qué Excel tiene problemas para abrir ciertos archivos CSV?*/", "a": "Ocurre debido a diferencias en el delimitador regional (algunos países usan punto y coma en lugar de comas) o a inconsistencias en la codificación de caracteres (ej. UTF-8 con o sin BOM)." },
      { "q": "/*¿Cómo se escapan los caracteres especiales en un archivo CSV?*/", "a": "Si un campo de texto contiene el delimitador (ej. una coma) o un salto de línea, ese campo completo debe ir envuelto entre comillas dobles (\") para que el parser no lo rompa al leerlo." }
    ],
    "content": """El formato **CSV** (*Comma-Separated Values*) es el método más extendido y universal para migrar e intercambiar conjuntos de datos tabulares entre diferentes aplicaciones de hojas de cálculo (como Microsoft Excel o Google Sheets) y bases de datos relacionales.

### La simplicidad del texto plano estructurado

A diferencia de los archivos binarios propietarios como \`.xlsx\` de Excel, un CSV es simplemente texto plano legible por humanos:

```
Nombre,Email,Telefono
Juan Pérez,juan@ejemplo.com,555-1234
María Gómez,maria@ejemplo.com,555-5678
```

Esta estructura ligera los hace ideales para exportar grandes colecciones de información desde aplicaciones web para análisis de datos o integraciones masivas de sistemas.

Para crear, editar tablas de datos en el navegador y exportar archivos CSV válidos y compatibles de forma local y segura, utiliza nuestra herramienta:

**[Prueba nuestro Generador de Archivos CSV](/tools/generador-csv)**

Edita celdas directamente en una interfaz intuitiva y descarga tu archivo CSV al instante libre de problemas de codificación."""
  },
  {
    "filename": "generador-hash-integridad-archivos-md5-sha256.md",
    "title": "Integridad de datos: Cómo verificar archivos mediante hashes MD5 y SHA-256",
    "excerpt": "Aprende qué son los algoritmos de hashing criptográficos y cómo utilizarlos para asegurar que un archivo descargado no fue alterado.",
    "category": "seguridad",
    "tags": ["hashing", "seguridad", "MD5", "SHA-256", "integridad", "criptografía"],
    "toolLink": "/tools/generador-hash",
    "toolName": "Generador de Hash",
    "faqs": [
      { "q": "/*¿Qué es una función hash?*/", "a": "Es un algoritmo matemático unidireccional que toma datos de cualquier tamaño y los transforma en una cadena de texto de longitud fija única (el hash o huella digital)." },
      { "q": "/*¿Para qué sirve verificar el hash de un archivo?*/", "a": "Para confirmar su integridad. Si un archivo fue modificado (aunque sea por un solo bit debido a un error de red o por un virus inyectado), el hash final cambia drásticamente." },
      { "q": "/*¿MD5 sigue siendo seguro?*/", "a": "No para fines criptográficos o de autenticación de contraseñas debido a colisiones conocidas, pero sigue siendo útil como suma de verificación básica para detectar errores de transferencia de archivos." }
    ],
    "content": """Cuando descargas software crítico de internet (como una distribución Linux, instaladores de sistemas operativos o carteras criptográficas), ¿cómo sabes que el archivo no fue manipulado por un tercero o que no se corrompió debido a una mala conexión de red?

La solución de seguridad estándar es comparar la firma o **hash criptográfico** del archivo.

### Las características de las funciones Hash

Las funciones de hashing criptográficas (como **SHA-256**) tienen tres propiedades clave:
1.  **Unidireccionalidad:** Es imposible reconstruir el archivo original a partir de su hash de texto.
2.  **Determinismo:** El mismo archivo siempre generará exactamente el mismo hash.
3.  **Efecto Avalancha:** Si cambias una sola letra en el archivo original, el hash resultante será completamente diferente.

Por este motivo, las empresas publican el hash oficial del archivo de descarga en su web para que el usuario pueda validarlo en su equipo local.

Para calcular las sumas de verificación MD5, SHA-1 o SHA-256 de tus textos o archivos de forma local en tu navegador sin subirlos a internet, utiliza nuestra utilidad:

**[Prueba nuestro Generador de Hash Criptográfico](/tools/generador-hash)**

Arrastra cualquier archivo al navegador para calcular sus firmas criptográficas al instante de forma segura y privada."""
  }
]

for blog in blogs:
    file_path = os.path.join(blogs_dir, blog["filename"])
    
    title_esc = blog["title"].replace('"', '\\"')
    excerpt_esc = blog["excerpt"].replace('"', '\\"')
    image_name = blog["filename"].replace('.md', '.png')
    
    faqs_yaml = []
    for faq in blog["faqs"]:
        q_esc = faq["q"].replace('"', '\\"')
        a_esc = faq["a"].replace('"', '\\"')
        faqs_yaml.append(f'  - question: "{q_esc}"\n    answer: "{a_esc}"')
        
    faqs_str = "\n".join(faqs_yaml)
    tags_str = ", ".join([f'"{t}"' for t in blog["tags"]])
    
    frontmatter = f"""---
title: "{title_esc}"
excerpt: "{excerpt_esc}"
date: "2026-06-19"
author: "V1TR0"
category: "{blog["category"]}"
tags: [{tags_str}]
featured: false
image: "/blogs/{image_name}"
faqs:
{faqs_str}
---

# {blog["title"]}

{blog["content"]}
"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(frontmatter)
    print(f"Generated: {blog['filename']}")

print("Successfully generated all 30 tool blog templates in Python!")
