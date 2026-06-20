import os

base_dir = r"d:\Clients\tecnocrypter\tecnocrypter-platform\content\blog"
os.makedirs(base_dir, exist_ok=True)

blog_posts = [
    {
        "filename": "session-hijacking-burlar-verificacion-dos-pasos-2fa.md",
        "title": "El enemigo en casa: Cómo los ataques de secuestro de sesión (Session Hijacking) burlan la verificación en dos pasos (2FA)",
        "excerpt": "El robo de cookies de sesión mediante malware se ha convertido en la técnica favorita de los cibercriminales para saltarse el segundo factor de autenticación sin levantar sospechas.",
        "category": "seguridad",
        "tags": ["Session Hijacking", "2FA", "MFA", "cookies de sesión", "malware", "seguridad de cuentas"],
        "image": "/blogs/session-hijacking-burlar-verificacion-dos-pasos-2fa.png",
        "faqs": [
            {
                "q": "¿Qué es el secuestro de sesión o Session Hijacking?",
                "a": "Es un ciberataque donde el atacante roba o clona el token de sesión (cookie) que el servidor entrega a un usuario tras autenticarse, permitiéndole suplantar su identidad de forma inmediata sin conocer su contraseña."
            },
            {
                "q": "¿Cómo se puede saltar el 2FA con esta técnica?",
                "a": "El segundo factor (MFA) se solicita solo al iniciar la sesión para generar la cookie de autenticación. Si el atacante clona esa cookie activa y la introduce en su navegador, el servidor asume que ya superó el 2FA."
            },
            {
                "q": "¿Cuáles son las medidas para prevenir el secuestro de sesión?",
                "a": "Mantener cookies con atributos HttpOnly y Secure, configurar tiempos de expiración cortos, utilizar tokens vinculados a la IP o huella digital del dispositivo, y usar antivirus para evitar infostealers locales."
            }
        ],
        "content": """La verificación en dos pasos (2FA) y el análisis multifactor (MFA) se han consolidado como los pilares básicos de la seguridad de cuentas digitales en la web. Sin embargo, un método de ataque altamente sofisticado y en auge entre los ciberdelincuentes está demostrando que estas barreras pueden ser completamente ineficaces: el **secuestro de sesión** o *Session Hijacking*.

A través de programas espía especializados y técnicas de phishing avanzado, los atacantes logran evadir de raíz el segundo factor sin interactuar directamente con él.

### El valor de las cookies de autenticación

Cuando un usuario inicia sesión en una aplicación web e introduce su contraseña y código 2FA de forma exitosa, el servidor valida sus credenciales y genera un identificador único conocido como **token de sesión**. Este token se almacena en el navegador del usuario en forma de una **cookie**.

A partir de ese instante, para evitar que el usuario tenga que ingresar sus credenciales en cada página que visita, el navegador envía automáticamente esta cookie en cada petición HTTP. Este token es la "llave maestra" de la sesión.

### La mecánica del secuestro de sesión

Si un atacante logra obtener una copia de esa cookie de sesión activa, puede importarla en su propio navegador. A esto se le conoce como **robo de cookies** o *cookie stealing*. 

Cuando el atacante realiza peticiones al servidor con la cookie robada, el servidor la procesa, la encuentra válida y le otorga acceso inmediato a la cuenta. Dado que la sesión ya fue abierta legítimamente por el usuario original (quien ya superó el desafío 2FA), el sistema no vuelve a solicitar contraseñas ni códigos dinámicos.

Este ataque es perpetrado comúnmente a través de:
*   **Malware local (Infostealers):** Troyanos silenciosos que infectan el sistema y extraen bases de datos de cookies de navegadores como Chrome, Firefox o Edge.
*   **Phishing en tiempo real (Reverse Proxy):** Páginas falsas que interceptan tanto las credenciales como las cookies que devuelve el servidor legítimo en tiempo real.
*   **Ataques Man-in-the-Middle (MitM):** Interceptación de tráfico en redes Wi-Fi desprotegidas cuando no se implementa encriptación adecuada.

### Estrategias de mitigación y defensa

Para los desarrolladores de software y administradores de sistemas, mitigar el secuestro de sesión requiere implementar mejores prácticas criptográficas:
1.  **Cookies seguras:** Configurar cookies con los flags `HttpOnly` (impide el acceso a través de JavaScript) y `Secure` (fuerza la transmisión exclusiva bajo HTTPS).
2.  **DPoP (Demonstrating Proof-of-Possession):** Vincular criptográficamente los tokens de sesión con una clave pública generada por el navegador del cliente para que no funcionen si se copian a otra máquina.
3.  **Monitoreo contextual:** Invalidar sesiones de forma automática si se detectan cambios bruscos en la dirección IP, el User-Agent o la huella digital del navegador del usuario."""
    },
    {
        "filename": "ataques-evil-twin-wifi-publicas-robo-credenciales.md",
        "title": "La trampa de las Wi-Fi públicas: Cómo los ataques Evil Twin roban tus credenciales sin que te des cuenta",
        "excerpt": "Los puntos de acceso falsos o 'Gemelos Malvados' imitan redes Wi-Fi de confianza para interceptar datos personales y contraseñas de usuarios desprevenidos en lugares públicos.",
        "category": "seguridad",
        "tags": ["Evil Twin", "Wi-Fi pública", "ciberseguridad", "phishing", "criptografía", "redes"],
        "image": "/blogs/ataques-evil-twin-wifi-publicas-robo-credenciales.png",
        "faqs": [
            {
                "q": "¿Qué es un ataque Evil Twin (Gemelo Malvado)?",
                "a": "Es un ataque de red donde el ciberdelincuente crea un punto de acceso Wi-Fi falso con el mismo nombre (SSID) que una red legítima y conocida, engañando a los dispositivos para que se conecten a él."
            },
            {
                "q": "¿Cómo interceptan los datos los atacantes en un Evil Twin?",
                "a": "Al estar el usuario conectado a su red, todo el tráfico de internet pasa a través de la máquina del atacante. Si no hay cifrado de extremo a extremo, este puede capturar contraseñas, mensajes y datos sensibles."
            },
            {
                "q": "¿Cómo protegerse de redes Wi-Fi maliciosas?",
                "a": "Evitar conectar dispositivos a redes abiertas sin contraseña, utilizar siempre una red privada virtual (VPN), deshabilitar la conexión automática a redes Wi-Fi y verificar certificados de seguridad HTTPS."
            }
        ],
        "content": """Las redes Wi-Fi públicas en cafeterías, aeropuertos y hoteles son herramientas muy convenientes para mantenernos conectados fuera de casa. Sin embargo, su facilidad de acceso las convierte en un terreno fértil para el espionaje digital. Uno de los métodos más sencillos y eficaces para interceptar tráfico de red en estos entornos es el ataque **Evil Twin** o *Gemelo Malvado*.

Este tipo de ataque se basa en la suplantación de identidad inalámbrica y el engaño a dispositivos automatizados.

### ¿Cómo funciona un ataque Evil Twin?

El ataque Evil Twin se ejecuta típicamente en cuatro fases críticas:

1.  **Reconocimiento:** El atacante analiza el entorno de red inalámbrica público para encontrar un punto de acceso legítimo y concurrido, anotando su nombre de red (SSID) y canal de transmisión.
2.  **Creación del clon:** Utilizando hardware de red común y software libre, el atacante despliega un punto de acceso Wi-Fi con el mismo nombre y configuración que la red legítima, a menudo emitiendo con una potencia de señal superior para volverse más atractivo.
3.  **Ataque de desasociación:** El atacante envía tramas de desautenticación forzadas a los dispositivos conectados al Wi-Fi real. Esto desconecta momentáneamente a los usuarios de la red legítima.
4.  **Conexión automática:** Al intentar reconectarse de forma automática, los dispositivos de las víctimas eligen el punto de acceso más cercano y con la señal más fuerte, que en este caso es el del atacante.

### Interceptación de datos y portales cautivos

Una vez que el usuario se conecta a la red Evil Twin, el atacante actúa como intermediario de todo su tráfico (Man-in-the-Middle). El ciberdelincuente puede redirigir las solicitudes a portales de inicio de sesión falsos (portales cautivos de phishing) que solicitan contraseñas de correo, redes sociales o datos de tarjetas bancarias.

Incluso si el usuario visita sitios protegidos por HTTPS, los atacantes con herramientas sofisticadas intentan degradar la conexión (SSL Stripping) o presentar certificados SSL falsos para inspeccionar el tráfico en texto plano.

### Medidas de protección para el usuario

Para navegar de forma segura y evitar caer en redes gemelas maliciosas, adopta las siguientes precauciones:
*   **Utiliza una VPN robusta:** Una Red Privada Virtual encripta todo tu tráfico desde tu dispositivo hasta el servidor de destino, haciendo que sea indescifrable para el administrador del Wi-Fi falso.
*   **Desactiva la conexión automática:** Configura tus dispositivos para que nunca se conecten automáticamente a redes abiertas o públicas conocidas previamente.
*   **Presta atención a las advertencias del navegador:** Si tu navegador web muestra una alerta de "Certificado de seguridad no válido" o "Conexión no segura" al entrar a un portal, desconéctate de inmediato de la red."""
    },
    {
        "filename": "cifrado-homomorfico-procesar-datos-sin-desencriptar.md",
        "title": "Cifrado Homomórfico: La revolución criptográfica que permite procesar datos sin desencriptarlos",
        "excerpt": "La criptografía homomórfica representa la santísima trinidad de la privacidad en la nube, haciendo posible operar sobre datos cifrados sin revelar la información original.",
        "category": "encriptacion",
        "tags": ["Cifrado Homomórfico", "FHE", "criptografía", "privacidad", "computación en la nube", "seguridad de datos"],
        "image": "/blogs/cifrado-homomorfico-procesar-datos-sin-desencriptar.png",
        "faqs": [
            {
                "q": "¿Qué es el cifrado homomórfico?",
                "a": "Es un método de cifrado que permite realizar operaciones matemáticas directamente sobre datos encriptados, produciendo un resultado cifrado que coincide con el cálculo del texto claro original al desencriptarlo."
            },
            {
                "q": "¿Qué utilidad tiene para la computación en la nube?",
                "a": "Permite subcontratar el procesamiento y análisis de bases de datos sensibles (médicas, financieras) a servidores de terceros en la nube sin comprometer en ningún momento la confidencialidad de la información."
            },
            {
                "q": "¿Cuál es la principal desventaja del cifrado homomórfico total (FHE)?",
                "a": "Su enorme coste computacional. Procesar operaciones matemáticas sobre texto cifrado requiere órdenes de magnitud más tiempo y memoria que hacerlo en texto claro, aunque los nuevos chips aceleradores están reduciendo esta brecha."
            }
        ],
        "content": """En el paradigma clásico de la seguridad informática, los datos pasan por tres estados de protección: en tránsito (protegidos por SSL/TLS), en reposo (protegidos por cifrado de disco o base de datos) y en uso (procesados en memoria RAM). Históricamente, para analizar o manipular datos, era obligatorio desencriptarlos en memoria, dejándolos vulnerables ante fugas de memoria o intrusiones en el servidor.

El **Cifrado Homomórfico** (HE) resuelve este dilema al permitir operaciones sobre datos directamente en su estado encriptado.

### El concepto matemático del homomorfismo

El término "homomorfismo" proviene del álgebra abstracta y describe una correspondencia estructurada entre dos grupos algebraicos. En criptografía, significa que si ciframos un mensaje $A$ como $E(A)$ y un mensaje $B$ como $E(B)$, podemos aplicar un operador matemático sobre ambos textos cifrados para obtener $E(A \\otimes B)$ de manera que, al descifrar el resultado, obtengamos el resultado exacto de la operación en texto plano.

Existen tres niveles de cifrado homomórfico según las operaciones admitidas:
1.  **Cifrado Homomórfico Parcial (PHE):** Soporta solo sumas o solo multiplicaciones (como los algoritmos RSA o ElGamal).
2.  **Cifrado Homomórfico Somero (SHE):** Admite sumas y un número muy limitado de multiplicaciones consecutivas antes de que el ruido matemático corrompa el mensaje.
3.  **Cifrado Homomórfico Total (FHE):** Permite evaluar sumas y multiplicaciones arbitrarias de forma ilimitada, permitiendo ejecutar cualquier algoritmo informático sobre datos encriptados. El primer esquema FHE viable fue propuesto por Craig Gentry en 2009.

### Casos de uso revolucionarios

La posibilidad de procesar sin descifrar transforma industrias completas:
*   **Sector Médico y Genómica:** Los investigadores pueden ejecutar modelos de aprendizaje automático en bases de datos de ADN cifradas de pacientes para identificar marcadores de enfermedades sin conocer la identidad ni el historial clínico explícito de las personas.
*   **Servicios Financieros:** Los bancos pueden detectar transacciones fraudulentas enviando su historial transaccional encriptado a motores de IA externos sin revelar saldos ni nombres de clientes.
*   **Votación Electrónica:** Permite contar y auditar votos de forma pública y cifrada, garantizando el anonimato absoluto de los votantes y la inmutabilidad del recuento final.

### El desafío de la eficiencia

A pesar de su inmenso potencial teórico, la adopción masiva del Cifrado Homomórfico Total (FHE) se enfrenta a una barrera de rendimiento: la sobrecarga computacional. Procesar datos bajo FHE puede ser entre $10,000$ y $1,000,000$ de veces más lento que el procesamiento en texto claro. 

Sin embargo, esfuerzos conjuntos en el desarrollo de hardware especializado (como aceleradores ASIC y FPGAs dedicados a criptografía) y nuevos algoritmos matemáticos simplificados están allanando el camino para que el cifrado homomórfico sea viable comercialmente en esta década."""
    },
    {
        "filename": "cifrado-simetrico-vs-asimetrico-sistemas-hibridos.md",
        "title": "La batalla por la confidencialidad: Cifrado simétrico vs asimétrico y cuándo combinarlos en un sistema híbrido",
        "excerpt": "Comprende a fondo las diferencias entre algoritmos rápidos de clave compartida y sistemas de par de claves pública/privada, y cómo el protocolo TLS los unifica en la web.",
        "category": "encriptacion",
        "tags": ["Cifrado Simétrico", "Cifrado Asimétrico", "Criptografía Híbrida", "TLS", "AES", "RSA", "ECC"],
        "image": "/blogs/cifrado-simetrico-vs-asimetrico-sistemas-hibridos.png",
        "faqs": [
            {
                "q": "¿Cuál es la diferencia fundamental entre el cifrado simétrico y el asimétrico?",
                "a": "El cifrado simétrico utiliza la misma clave secreta tanto para encriptar como para desencriptar. El cifrado asimétrico utiliza un par de claves matemáticamente vinculadas: una clave pública para encriptar y una clave privada para desencriptar."
            },
            {
                "q": "¿Por qué no se utiliza el cifrado asimétrico para transmitir todos los datos en internet?",
                "a": "El cifrado asimétrico requiere operaciones matemáticas de gran complejidad basadas en álgebra de números primos o curvas elípticas, lo que lo hace demasiado lento y costoso a nivel de procesamiento para grandes volúmenes de datos."
            },
            {
                "q": "¿Cómo funciona un sistema de cifrado híbrido en protocolos como HTTPS/TLS?",
                "a": "Utiliza cifrado asimétrico en la fase inicial de conexión para validar identidades e intercambiar de forma segura una clave temporal. Luego, utiliza esa clave temporal con cifrado simétrico para transmitir los datos de forma rápida."
            }
        ],
        "content": """En el corazón de la seguridad de la información residen dos metodologías de cifrado esenciales: el **cifrado simétrico** y el **cifrado asimétrico** (o criptografía de clave pública). Aunque ambos persiguen el mismo objetivo —mantener la confidencialidad de la información frente a ojos no autorizados— sus mecánicas de funcionamiento, fortalezas y limitaciones son radicalmente diferentes.

La ingeniería de seguridad moderna aprovecha lo mejor de ambos mundos integrándolos en sistemas de **criptografía híbrida**.

### Cifrado Simétrico: Velocidad y eficiencia

El cifrado simétrico es la forma más antigua y sencilla de criptografía. Se basa en una única clave compartida por el emisor y el receptor. El algoritmo toma el texto claro, aplica la clave mediante permutaciones y sustituciones bit a bit, y genera el texto cifrado. Para descifrarlo, el receptor aplica la misma clave en sentido inverso.

*   **Algoritmos comunes:** AES (Advanced Encryption Standard), ChaCha20, Blowfish.
*   **Fortalezas:** Extremadamente veloz y eficiente en recursos de procesamiento; idóneo para cifrar gigabytes de datos en discos duros o flujos de video en tiempo real.
*   **Debilidades:** El problema de la distribución de claves. ¿Cómo compartes la clave secreta de forma segura con un receptor lejano sin que un tercero la intercepte en el camino?

### Cifrado Asimétrico: La revolución del par de claves

Introducido por Whitfield Diffie y Martin Hellman en los años 70, el cifrado asimétrico rompe el problema de la distribución de claves mediante un par de claves vinculadas matemáticamente:
1.  **Clave Pública:** Compartida libremente con el mundo. Cualquiera puede usarla para encriptar un mensaje dirigido a ti.
2.  **Clave Privada:** Mantenida en secreto absoluto por el receptor. Es la única clave capaz de desencriptar los mensajes encriptados con su clave pública correspondiente.

*   **Algoritmos comunes:** RSA, ECC (Criptografía de Curvas Elípticas), Diffie-Hellman.
*   **Fortalezas:** Resuelve el intercambio de claves de forma limpia; permite la firma digital de documentos para garantizar el no repudio.
*   **Debilidades:** Computacionalmente pesado. Requiere claves muy largas (ej. RSA de 2048 o 4096 bits) y operaciones matemáticas intensivas basadas en potencias modulares o curvas elípticas.

### La solución definitiva: Criptografía Híbrida

Para solucionar la lentitud del cifrado asimétrico y el problema de distribución del cifrado simétrico, los protocolos modernos de comunicación seguros (como TLS/HTTPS, SSH y PGP) utilizan criptografía híbrida.

El proceso se ejecuta habitualmente bajo el siguiente esquema:
1.  **Apretón de manos (Handshake):** El navegador del cliente y el servidor web utilizan cifrado asimétrico (normalmente Curve25519 o RSA) para autenticar la identidad del servidor e intercambiar de forma segura un secreto compartido de forma efímera.
2.  **Clave de sesión:** A partir de ese secreto intercambiado, ambos generan una clave simétrica temporal (conocida como clave de sesión).
3.  **Transmisión de datos:** Toda la información de la sesión web (Páginas HTML, imágenes, formularios) se cifra utilizando cifrado simétrico (como AES-GCM o ChaCha20-Poly1305), garantizando una navegación rápida y con protección absoluta."""
    },
    {
        "filename": "ataques-51-por-ciento-bloques-doble-gasto-blockchain.md",
        "title": "La sombra del 51%: Los peligros reales de un ataque de doble gasto en blockchains consolidadas",
        "excerpt": "El ataque del 51% es la mayor amenaza teórica contra la inmutabilidad de una red Proof-of-Work, permitiendo reorganizar bloques y gastar la misma moneda dos veces.",
        "category": "criptomonedas",
        "tags": ["Ataque del 51%", "doble gasto", "Proof-of-Work", "blockchain", "consenso", "seguridad cripto"],
        "image": "/blogs/ataques-51-por-ciento-bloques-doble-gasto-blockchain.png",
        "faqs": [
            {
                "q": "¿Qué es un ataque del 51% en una red blockchain?",
                "a": "Es una situación en la que una entidad o grupo de mineros logra controlar más de la mitad del poder de cómputo (tasa de hash) de una red blockchain de Prueba de Trabajo (PoW), obteniendo el poder de manipular el historial de transacciones."
            },
            {
                "q": "¿Qué puede y qué no puede hacer un atacante con el 51% del poder?",
                "a": "Puede realizar ataques de doble gasto (revertir sus propias transacciones) y bloquear transacciones de otros usuarios. No puede robar monedas de direcciones ajenas ni alterar el historial antiguo consolidado de la red."
            },
            {
                "q": "¿Por qué es tan difícil hacer un ataque del 51% en redes como Bitcoin?",
                "a": "Debido al coste astronómico. Lograr controlar el 51% del hardware de minería de Bitcoin requeriría inversiones de miles de millones de dólares en energía eléctrica y equipos ASIC especializados, haciendo que el ataque sea económicamente autodestructivo."
            }
        ],
        "content": """Las redes blockchain se fundan sobre la promesa de la inmutabilidad y la descentralización. Gracias a los algoritmos de consenso, miles de nodos independientes en todo el mundo se ponen de acuerdo sobre qué transacciones son válidas sin necesidad de confiar en un banco central. Sin embargo, en el diseño clásico de Prueba de Trabajo (PoW) introducido por Satoshi Nakamoto en Bitcoin, existe una vulnerabilidad teórica de consenso conocida como el **ataque del 51%**.

Este exploit representa la mayor amenaza para la inmutabilidad de los registros distribuidos.

### ¿Cómo se altera una blockchain?

Para comprender el ataque, es necesario entender la regla de la cadena más larga en Proof-of-Work: los nodos honestos siempre aceptan como válida la cadena de bloques que ha requerido el mayor trabajo acumulado (la cadena más larga).

Si un atacante acumula más de la mitad del poder de procesamiento de la red (tasa de hash), puede realizar el siguiente proceso:
1.  **Minería en privado:** El atacante realiza una transacción legítima en la red pública enviando monedas a un intercambio para venderlas. Paralelamente, comienza a minar en secreto una cadena de bloques alternativa donde NO incluye esa transacción de envío de monedas.
2.  **Confirmación y retiro:** El atacante espera a que la transacción pública se confirme, recibe su dinero o divisas y las retira de la plataforma.
3.  **Liberación de la cadena:** Dado que el atacante posee el 51% del poder de hash global, puede minar su cadena privada más rápido que el resto de la red combinada. En un momento dado, hace pública su cadena alternativa más larga.
4.  **Reorganización de bloques:** Los nodos honestos de la red detectan la nueva cadena del atacante, que tiene más trabajo acumulado. Aplicando las reglas de consenso, descartan los bloques anteriores del historial público (reorganización de bloques). La transacción de envío original se evapora de la historia, y el atacante vuelve a tener las monedas originales en su balance además de las retiradas. Esto es el **doble gasto**.

### Historial de ataques reales

Aunque en Bitcoin un ataque del 51% es prácticamente inviable por el coste de hardware y energía necesarios, redes más pequeñas con baja tasa de hash han sufrido ataques devastadores. 

Redes como **Bitcoin Gold (BTG)**, **Ethereum Classic (ETC)** y **Vertcoin** han sufrido reorganizaciones de bloques y pérdidas millonarias debido a atacantes que alquilaron poder de cómputo en plataformas de hash cloud (como NiceHash) para sobrepasar momentáneamente el poder de hash de la red local.

### Soluciones frente a la centralización de hash

Para evitar ataques del 51%, la industria blockchain ha desarrollado diferentes alternativas:
*   **Transición a Proof-of-Stake (PoS):** En redes de Prueba de Participación (como Ethereum tras "The Merge"), la seguridad depende del capital bloqueado en garantía (staking) en lugar de energía eléctrica. Atacar la red requeriría comprar el 51% del suministro total de tokens, lo cual dispararía su precio y destruiría el capital del propio atacante ante una penalización por mal comportamiento (slashing).
*   **Checkpointing:** Programar puntos de control inmutables periódicos en el código que impiden que el software acepte reorganizaciones de bloques de gran profundidad histórica."""
    },
    {
        "filename": "vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.md",
        "title": "La anatomía de un Hack en DeFi: Cómo las vulnerabilidades de reentrada (Reentrancy) drenan millones de Smart Contracts",
        "excerpt": "El exploit de reentrada es uno de los bugs más devastadores en Solidity, permitiendo a contratos maliciosos retirar fondos repetidamente antes de actualizar los balances.",
        "category": "criptomonedas",
        "tags": ["Reentrancy", "Solidity", "smart contracts", "DeFi", "DAO Hack", "seguridad blockchain"],
        "image": "/blogs/vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.png",
        "faqs": [
            {
                "q": "¿Qué es una vulnerabilidad de reentrada o Reentrancy en Solidity?",
                "a": "Es un fallo de seguridad que ocurre cuando un contrato inteligente realiza una llamada externa a un contrato no confiable para transferir fondos antes de actualizar su estado interno (como el balance del usuario)."
            },
            {
                "q": "¿Cómo se ejecutó el famoso ataque de The DAO en 2016 con este bug?",
                "a": "El atacante creó un contrato con una función callback que volvía a llamar repetidamente a la función de retiro del contrato de The DAO. Esto permitió retirar éter una y otra vez antes de que el contrato restara el saldo de su cuenta."
            },
            {
                "q": "¿Cuáles son las formas de mitigar los ataques de reentrada?",
                "a": "Implementar el patrón de diseño Checks-Effects-Interactions (actualizar estados antes de transferir) y utilizar modificadores de exclusión mutua como ReentrancyGuard de OpenZeppelin."
            }
        ],
        "content": """En el ecosistema financiero descentralizado (DeFi), el código de los contratos inteligentes es ley. Si un contrato inteligente tiene una pequeña fisura lógica, los atacantes pueden drenar millones de dólares de forma irreversible en minutos. El ejemplo más histórico y destructivo de esto es la vulnerabilidad de **reentrada** o *Reentrancy*.

Esta vulnerabilidad causó el colapso del fondo de inversión **The DAO** en 2016, forzando una bifurcación dura (hard fork) en la red Ethereum que dio origen a Ethereum (ETH) y Ethereum Classic (ETC).

### El flujo de ejecución en la EVM

En la máquina virtual de Ethereum (EVM), cuando un contrato inteligente envía fondos (Ether) a otra dirección que resulta ser un contrato inteligente, el contrato receptor puede ejecutar código automáticamente a través de funciones especiales llamadas `fallback` o `receive`.

El problema de reentrada ocurre cuando el contrato emisor transfiere los fondos *antes* de actualizar el balance de la cuenta del usuario en su base de datos interna.

El ataque se desarrolla típicamente de la siguiente manera:
1.  **Llamada al retiro:** Un contrato malicioso solicita retirar su balance depositado en un contrato inteligente de préstamos o inversiones.
2.  **Transferencia de fondos:** El contrato víctima lee el saldo del atacante, ve que tiene fondos y le envía el dinero mediante una llamada externa (`call`).
3.  **Interrupción maliciosa:** Al recibir los fondos, el contrato del atacante activa su función `fallback`. En lugar de dar por terminada la transacción, este código malicioso vuelve a llamar a la función de retiro del contrato víctima.
4.  **Bucle de drenaje:** Dado que la transacción anterior aún no ha terminado de ejecutarse, el contrato víctima todavía no ha llegado a la línea de código donde resta el balance del atacante. El contrato ve que el atacante sigue teniendo el balance intacto y vuelve a enviarle fondos, repitiendo el proceso en un bucle infinito hasta que el contrato víctima se queda sin reservas o la pila de llamadas se satura.

### El patrón Checks-Effects-Interactions

La defensa definitiva contra los ataques de reentrada reside en aplicar un orden estricto en la lógica de las funciones conocido como el patrón de diseño **Checks-Effects-Interactions** (Comprobaciones-Efectos-Interacciones):

1.  **Checks (Comprobaciones):** Verificar todas las condiciones requeridas (ej. `require(balance >= withdrawAmount)`).
2.  **Effects (Efectos):** Modificar todos los estados y variables internas del contrato *antes* de realizar operaciones externas (ej. restar el balance del usuario: `balances[msg.sender] -= withdrawAmount`).
3.  **Interactions (Interacciones):** Realizar las llamadas externas a otras cuentas o transferencias de fondos al final (ej. `payable(msg.sender).call{value: withdrawAmount}("")`).

Siguiendo este patrón, si el atacante intenta reentrar a la función de retiro en la fase de interacción, el contrato víctima leerá su balance actualizado (que ya es cero tras la fase de efectos) e inmediatamente rechazará la nueva solicitud.

### Modificadores de exclusión mutua

Otra capa de defensa fundamental es el uso de bloqueos o modificadores `nonReentrant` proporcionados por librerías estándar como **OpenZeppelin**. Este modificador establece una variable booleana de bloqueo al entrar a la función y la libera al salir. Si se detecta una llamada recursiva a la misma función antes de que termine, la transacción revierte de forma automática, garantizando la inmutabilidad lógica."""
    }
]

for post in blog_posts:
    faqs_yaml = []
    for faq in post["faqs"]:
        faqs_yaml.append(f'  - question: "{faq["q"]}"\n    answer: "{faq["a"]}"')
    faqs_str = "\n".join(faqs_yaml)
    tags_str = ", ".join([f'"{t}"' for t in post["tags"]])
    
    frontmatter = f"""---
title: "{post["title"]}"
excerpt: "{post["excerpt"]}"
date: "2026-06-20"
author: "V1TR0"
category: "{post["category"]}"
tags: [{tags_str}]
featured: true
image: "{post["image"]}"
faqs:
{faqs_str}
---

# {post["title"]}

{post["content"]}
"""
    file_path = os.path.join(base_dir, post["filename"])
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(frontmatter)
    print(f"Generated Spanish blog draft: {post['filename']}")
