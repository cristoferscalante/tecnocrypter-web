# Investigación: Nuevas Herramientas para TecnoCrypter

## Contexto

TecnoCrypter actualmente tiene 10 herramientas gratuitas enfocadas en seguridad, privacidad y utilidades. Esta investigación propone **20 nuevas herramientas** organizadas por prioridad de implementación, impacto SEO y complejidad técnica.

**Criterios de selección:**
- Funcionan 100% en el navegador (Web Crypto API, Canvas, etc.) — sin backend
- Alta demanda de búsqueda en español
- Complementan las herramientas existentes
- Implementables con las dependencias actuales del proyecto

---

## PRIORIDAD ALTA — Impacto SEO inmediato, fácil de implementar

### 1. Conversor Base64 (Texto e Imágenes)
- **Ruta propuesta**: `/tools/conversor-base64`
- **Función**: Codificar/decodificar texto y archivos a Base64. Convertir imágenes a Data URI
- **Búsquedas clave**: "base64 online", "convertir imagen a base64", "decodificar base64"
- **Complejidad**: Baja — `btoa()`, `atob()`, `FileReader.readAsDataURL()`
- **Por qué**: Complemento natural al codificador Base32 existente. Altísimo volumen de búsqueda

### 2. Conversor Hexadecimal
- **Ruta propuesta**: `/tools/conversor-hex`
- **Función**: Convertir texto ↔ hexadecimal, hex ↔ decimal, hex ↔ binario, hex ↔ RGB
- **Búsquedas clave**: "convertir hex a texto", "hexadecimal a decimal", "hex a rgb"
- **Complejidad**: Baja — operaciones matemáticas básicas
- **Por qué**: Muy buscado por desarrolladores y estudiantes

### 3. Analizador de Headers HTTP
- **Ruta propuesta**: `/tools/analizador-headers`
- **Función**: Inspeccionar headers de seguridad de cualquier URL (CSP, HSTS, X-Frame-Options, etc.). Calificar con puntuación de seguridad
- **Búsquedas clave**: "analizar headers http", "security headers check", "verificar CSP"
- **Complejidad**: Media — requiere API route para hacer fetch del servidor (CORS)
- **Por qué**: Complemento perfecto al verificador de URL existente. Los security headers son un tema trending

### 4. Generador de JWT (JSON Web Tokens)
- **Ruta propuesta**: `/tools/generador-jwt`
- **Función**: Crear, decodificar y verificar tokens JWT. Editor visual de payload con presets comunes
- **Búsquedas clave**: "jwt decoder", "decodificar jwt online", "crear jwt"
- **Complejidad**: Media — Web Crypto API para firmar/verificar
- **Por qué**: Herramienta esencial para desarrolladores. jwt.io tiene millones de visitas

### 5. Generador de Certificados SSL Autofirmados
- **Ruta propuesta**: `/tools/generador-ssl`
- **Función**: Generar certificados SSL/TLS autofirmados para desarrollo local. Exportar en PEM, DER, PFX
- **Búsquedas clave**: "generar certificado ssl", "certificado autofirmado", "ssl localhost"
- **Complejidad**: Alta — Web Crypto API + ASN.1 encoding
- **Por qué**: Muy buscado, pocas herramientas online en español

### 6. Escáner de Puertos (limitado)
- **Ruta propuesta**: `/tools/escaner-puertos`
- **Función**: Verificar si puertos comunes están abiertos en un dominio/IP. Técnica WebSocket timing
- **Búsquedas clave**: "escanear puertos online", "port scanner online", "verificar puertos"
- **Complejidad**: Media — WebSocket + fetch timing (limitado por CORS pero funcional para puertos web)
- **Por qué**: Alta demanda, pocas herramientas en español

---

## PRIORIDAD MEDIA — Buen SEO, complejidad moderada

### 7. Generador/Verificador de TOTP (2FA)
- **Ruta propuesta**: `/tools/generador-totp`
- **Función**: Generar secretos TOTP, mostrar QR para apps autenticadoras, verificar códigos en tiempo real
- **Búsquedas clave**: "generador 2FA", "TOTP online", "verificar código autenticación"
- **Complejidad**: Media — HMAC-SHA1 via Web Crypto API + contador temporal
- **Por qué**: La autenticación 2FA es trending y complementa la temática de seguridad

### 8. Analizador de Contraseñas Filtradas
- **Ruta propuesta**: `/tools/verificador-contrasenas`
- **Función**: Verificar si una contraseña ha sido filtrada usando la API de Have I Been Pwned (k-anonimato). Solo se envía un prefijo del hash SHA-1
- **Búsquedas clave**: "contraseña filtrada", "verificar contraseña hackeada", "have i been pwned"
- **Complejidad**: Baja — SHA-1 hash + fetch a API pública (privacidad preservada por k-anonimato)
- **Por qué**: Complemento perfecto al generador de contraseñas existente

### 9. Conversor de Timestamps / Epoch
- **Ruta propuesta**: `/tools/conversor-timestamp`
- **Función**: Convertir Unix timestamp ↔ fecha legible. Soportar múltiples formatos y zonas horarias
- **Búsquedas clave**: "unix timestamp converter", "convertir epoch a fecha", "timestamp online"
- **Complejidad**: Baja — Date API nativa
- **Por qué**: Herramienta fundamental para desarrolladores, muy buscada

### 10. Generador de Claves RSA/EC
- **Ruta propuesta**: `/tools/generador-claves`
- **Función**: Generar pares de claves RSA (2048/4096) y ECDSA (P-256/P-384). Exportar en PEM (PKCS#8/SPKI)
- **Búsquedas clave**: "generar clave RSA online", "generar key pair", "par de claves"
- **Complejidad**: Media — `crypto.subtle.generateKey()` + export PEM
- **Por qué**: Complementa el cifrado online existente

### 11. Validador de JSON / JSON Formatter
- **Ruta propuesta**: `/tools/validador-json`
- **Función**: Validar, formatear, minificar JSON. Árbol visual interactivo. Comparar dos JSONs
- **Búsquedas clave**: "validar json online", "json formatter", "formatear json"
- **Complejidad**: Baja — `JSON.parse()` + tree rendering
- **Por qué**: Volumen de búsqueda enorme, herramienta básica para desarrolladores

### 12. Generador de UUID/ULID
- **Ruta propuesta**: `/tools/generador-uuid`
- **Función**: Generar UUID v4, v7, ULID, nanoid. Bulk generation. Validar UUIDs
- **Búsquedas clave**: "generar uuid online", "uuid generator", "crear uuid"
- **Complejidad**: Baja — `crypto.randomUUID()` + algoritmos simples
- **Por qué**: Herramienta muy usada por desarrolladores

### 13. Cifrador/Descifrador de Email (Anti-Spam)
- **Ruta propuesta**: `/tools/protector-email`
- **Función**: Ofuscar emails para evitar spam (codificar en HTML entities, JavaScript, ROT13). Generar mailto: links protegidos
- **Búsquedas clave**: "proteger email spam", "ofuscar correo", "email encoder"
- **Complejidad**: Baja — string manipulation
- **Por qué**: Útil para webmasters, nicho poco competido en español

### 14. Calculadora de Entropía
- **Ruta propuesta**: `/tools/calculadora-entropia`
- **Función**: Medir la entropía (aleatoriedad) de texto, archivos o contraseñas. Visualización gráfica con recharts
- **Búsquedas clave**: "calcular entropía", "entropy calculator", "medir aleatoriedad"
- **Complejidad**: Media — cálculo estadístico + visualización con Recharts (ya instalado)
- **Por qué**: Herramienta educativa de criptografía, complementa el generador de hash

---

## PRIORIDAD BAJA — Nicho específico, mayor complejidad

### 15. Esteganografía de Imágenes
- **Ruta propuesta**: `/tools/esteganografia`
- **Función**: Ocultar mensajes secretos dentro de imágenes (LSB encoding). Extraer mensajes ocultos
- **Búsquedas clave**: "esteganografía online", "ocultar mensaje en imagen", "steganography"
- **Complejidad**: Alta — Canvas API para manipulación pixel a pixel
- **Por qué**: Tema fascinante, contenido viral, genera backlinks naturales

### 16. Analizador de DNS
- **Ruta propuesta**: `/tools/analizador-dns`
- **Función**: Consultar registros DNS (A, AAAA, MX, TXT, CNAME, NS) de cualquier dominio. Detectar configuraciones SPF/DKIM/DMARC
- **Búsquedas clave**: "consultar dns online", "dns lookup", "verificar registros dns"
- **Complejidad**: Media — requiere API route (DNS over HTTPS via Google/Cloudflare)
- **Por qué**: Herramienta esencial para administradores, complementa el verificador de URL

### 17. Generador de .htaccess / CSP Headers
- **Ruta propuesta**: `/tools/generador-headers`
- **Función**: Generar configuraciones de Content-Security-Policy, .htaccess, nginx.conf con interfaz visual
- **Búsquedas clave**: "generar CSP", "Content Security Policy generator", "htaccess generator"
- **Complejidad**: Media — generador de código basado en opciones
- **Por qué**: Complementa el analizador de headers. Herramienta para webmasters y devs

### 18. Detector de Tecnologías Web
- **Ruta propuesta**: `/tools/detector-tecnologias`
- **Función**: Detectar CMS, frameworks, librerías, analytics y CDNs de cualquier sitio web
- **Búsquedas clave**: "que tecnología usa un sitio web", "detectar CMS", "wappalyzer alternativa"
- **Complejidad**: Alta — requiere API route + scraping/análisis de headers y HTML
- **Por qué**: Muy demandado, pocas alternativas en español

### 19. Cifrado de Notas Efímeras
- **Ruta propuesta**: `/tools/notas-seguras`
- **Función**: Crear notas cifradas con enlace de un solo uso. Se destruyen después de ser leídas
- **Búsquedas clave**: "nota secreta online", "mensaje autodestructivo", "one time secret"
- **Complejidad**: Alta — requiere backend para almacenar/destruir notas (Supabase)
- **Por qué**: Funcionalidad viral, genera tráfico recurrente

### 20. Verificador de Email (formato + MX)
- **Ruta propuesta**: `/tools/verificador-email`
- **Función**: Validar formato de email, verificar que el dominio tiene registros MX válidos
- **Búsquedas clave**: "verificar email válido", "comprobar correo existe", "email validator"
- **Complejidad**: Media — regex + DNS MX lookup via API
- **Por qué**: Alto volumen de búsqueda

---

## Matriz de Priorización

| # | Herramienta | Impacto SEO | Complejidad | Tiempo Est. | Prioridad |
|---|------------|-------------|-------------|-------------|-----------|
| 1 | Conversor Base64 | ★★★★★ | Baja | 1 día | 🔴 Alta |
| 2 | Conversor Hex | ★★★★☆ | Baja | 1 día | 🔴 Alta |
| 3 | Analizador Headers | ★★★★★ | Media | 2 días | 🔴 Alta |
| 4 | Generador JWT | ★★★★★ | Media | 2 días | 🔴 Alta |
| 5 | Generador SSL | ★★★★☆ | Alta | 3 días | 🔴 Alta |
| 6 | Escáner Puertos | ★★★★☆ | Media | 2 días | 🔴 Alta |
| 7 | Generador TOTP | ★★★★☆ | Media | 2 días | 🟡 Media |
| 8 | Verificador Contraseñas | ★★★★★ | Baja | 1 día | 🟡 Media |
| 9 | Conversor Timestamp | ★★★★☆ | Baja | 1 día | 🟡 Media |
| 10 | Generador Claves RSA/EC | ★★★☆☆ | Media | 2 días | 🟡 Media |
| 11 | Validador JSON | ★★★★★ | Baja | 1 día | 🟡 Media |
| 12 | Generador UUID | ★★★★☆ | Baja | 1 día | 🟡 Media |
| 13 | Protector Email | ★★★☆☆ | Baja | 1 día | 🟡 Media |
| 14 | Calculadora Entropía | ★★★☆☆ | Media | 2 días | 🟡 Media |
| 15 | Esteganografía | ★★★★☆ | Alta | 3 días | 🟢 Baja |
| 16 | Analizador DNS | ★★★★☆ | Media | 2 días | 🟢 Baja |
| 17 | Generador CSP/Headers | ★★★☆☆ | Media | 2 días | 🟢 Baja |
| 18 | Detector Tecnologías | ★★★★★ | Alta | 4 días | 🟢 Baja |
| 19 | Notas Efímeras | ★★★★☆ | Alta | 3 días | 🟢 Baja |
| 20 | Verificador Email | ★★★★☆ | Media | 2 días | 🟢 Baja |

---

## Plan de Implementación Recomendado

### Fase 1 — Quick Wins (1-2 semanas)
Herramientas de baja complejidad que se pueden lanzar rápido:
1. **Conversor Base64** — complementa Base32 existente
2. **Conversor Hexadecimal** — conversiones múltiples
3. **Verificador de Contraseñas Filtradas** — complementa generador existente
4. **Conversor Timestamp** — herramienta para devs
5. **Validador JSON** — altísimo volumen de búsqueda
6. **Generador UUID** — herramienta para devs

**Impacto**: +6 herramientas, ~6 días de trabajo → 16 herramientas totales

### Fase 2 — Core Security (2-3 semanas)
Herramientas de ciberseguridad que definen la marca:
7. **Generador JWT** — atrae tráfico de desarrolladores
8. **Analizador de Headers HTTP** — nicho de seguridad web
9. **Generador TOTP (2FA)** — trending topic
10. **Escáner de Puertos** — herramienta icónica de seguridad
11. **Generador de Claves RSA/EC** — complementa cifrado

**Impacto**: +5 herramientas → 21 herramientas totales

### Fase 3 — Diferenciación (3-4 semanas)
Herramientas únicas que distinguen a TecnoCrypter:
12. **Generador SSL** — pocas alternativas en español
13. **Esteganografía** — contenido viral
14. **Notas Efímeras** — genera tráfico recurrente
15. **Analizador DNS** — para sysadmins
16. **Protector Email** — para webmasters

**Impacto**: +5 herramientas → 26 herramientas totales

### Fase 4 — Expansión (1 mes+)
17-20: Detector tecnologías, Generador CSP, Calculadora entropía, Verificador email

**Impacto final**: 30 herramientas totales

---

## Tecnologías Requeridas por Herramienta

| Herramienta | APIs del Navegador | Dependencias Nuevas | Backend Requerido |
|------------|-------------------|--------------------|--------------------|
| Base64 | btoa/atob, FileReader | Ninguna | No |
| Hex | - | Ninguna | No |
| Headers HTTP | - | Ninguna | Sí (API route) |
| JWT | Web Crypto API | Ninguna | No |
| SSL Certs | Web Crypto API | asn1js (nuevo) | No |
| Escáner Puertos | WebSocket | Ninguna | No |
| TOTP | Web Crypto API | Ninguna (usa QR existente) | No |
| Contraseñas Filtradas | Web Crypto API | Ninguna | No (API HIBP) |
| Timestamp | Date API | Ninguna | No |
| Claves RSA/EC | Web Crypto API | Ninguna | No |
| JSON Validator | JSON.parse | Ninguna | No |
| UUID | crypto.randomUUID | Ninguna | No |
| Protector Email | - | Ninguna | No |
| Entropía | - | Ninguna (usa Recharts) | No |
| Esteganografía | Canvas API | Ninguna | No |
| DNS | - | Ninguna | Sí (DNS-over-HTTPS) |
| CSP Generator | - | Ninguna | No |
| Detector Tech | - | Ninguna | Sí (scraping) |
| Notas Efímeras | Web Crypto API | Ninguna | Sí (Supabase) |
| Verificador Email | - | Ninguna | Sí (MX lookup) |

**Resumen**: 14 de 20 herramientas NO requieren backend. Solo 6 necesitan API routes.

---

## Competencia en el Mercado Hispano

Las herramientas más buscadas en español con poca competencia de calidad:

1. **"generador jwt online"** — jwt.io domina pero no está en español
2. **"verificar contraseña filtrada"** — pocas opciones en español
3. **"esteganografía online"** — casi sin competencia en español
4. **"escaner puertos online"** — herramientas antiguas y con mala UX
5. **"generador certificado ssl"** — muy pocas opciones online
6. **"analizador headers seguridad"** — securityheaders.com no está en español

**Oportunidad**: TecnoCrypter puede posicionarse como la referencia #1 en herramientas de ciberseguridad en español.
