# Herramientas Actuales

TecnoCrypter ofrece 10 herramientas gratuitas de ciberseguridad y privacidad que funcionan 100% en el navegador (sin enviar datos al servidor).

## Catálogo

### 1. Generador de Contraseñas Seguras
- **Ruta**: `/tools/generador-contrasenas`
- **Categoría**: Seguridad
- **Función**: Genera contraseñas aleatorias con validadores de fortaleza y recomendaciones automáticas
- **Componente**: `generador-contrasenas-client.tsx`

### 2. Generador de Credenciales Determinísticas
- **Ruta**: `/tools/generador-credenciales`
- **Categoría**: Privacidad
- **Función**: Genera usuarios y contraseñas determinísticas a partir de una palabra clave maestra. Las credenciales se recrean siempre iguales sin almacenar nada
- **Componente**: `generador-credenciales-client.tsx`

### 3. Limpiador de Metadatos de Imágenes
- **Ruta**: `/tools/limpia-metadatos`
- **Categoría**: Privacidad
- **Función**: Elimina metadatos EXIF, GPS y datos ocultos de imágenes antes de compartirlas
- **Componente**: `limpia-metadatos-client.tsx`

### 4. Verificador de URL
- **Ruta**: `/tools/verificador`
- **Categoría**: Análisis
- **Función**: Analiza la seguridad de URLs, detecta phishing, verifica certificados SSL y reputación de dominios
- **Componente**: `verificador-client.tsx`
- **API**: `app/api/verify-url/` (backend para verificación)

### 5. Generador de Hash
- **Ruta**: `/tools/generador-hash`
- **Categoría**: Seguridad
- **Función**: Genera hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 de textos y archivos. Compara hashes para verificar integridad
- **Componente**: `generador-hash-client.tsx`

### 6. Generador de Códigos QR
- **Ruta**: `/tools/generador-qr`
- **Categoría**: Utilidades
- **Función**: Genera códigos QR personalizados con colores, tamaño y logo personalizado
- **Componente**: `qr-generator-client.tsx`
- **Dependencias**: `qrcode`, `react-qrcode-logo`

### 7. Cifrado Online
- **Ruta**: `/tools/cifrado-online`
- **Categoría**: Seguridad
- **Función**: Cifra y descifra textos y archivos con AES-256-GCM, ChaCha20 y más algoritmos. Todo en el navegador usando Web Crypto API
- **Componente**: `cifrado-online-client.tsx`

### 8. Codificador Base32
- **Ruta**: `/tools/codificador-base32`
- **Categoría**: Codificación
- **Función**: Codifica/decodifica en Base32, Base32Hex, z-base-32 y Crockford
- **Componente**: `codificador-base32-client.tsx`

### 9. Comparador de Archivos
- **Ruta**: `/tools/comparador-archivos`
- **Categoría**: Utilidades
- **Función**: Compara dos textos o archivos línea por línea con resaltado visual de diferencias (diff viewer)
- **Componente**: `comparador-archivos-client.tsx`

### 10. Contador de Caracteres
- **Ruta**: `/tools/contador-caracteres`
- **Categoría**: Análisis
- **Función**: Cuenta caracteres, palabras, oraciones y párrafos. Incluye límites para redes sociales (Twitter, Instagram, LinkedIn) y análisis de legibilidad
- **Componente**: `contador-caracteres-client.tsx`

## Patrón Técnico Común

Todas las herramientas siguen este patrón:

1. **Server Component** (`app/tools/[tool]/page.tsx`):
   - Exporta `metadata` con `generateToolMetadata()` (título, descripción, keywords)
   - Renderiza `BreadcrumbStructuredData` (3 niveles: Inicio > Herramientas > Tool)
   - Renderiza `WebApplicationStructuredData` (JSON-LD para Google)
   - Importa y renderiza el client component

2. **Client Component** (`components/tools/[tool]-client.tsx`):
   - Directiva `'use client'`
   - Toda la lógica interactiva, estado, Web APIs
   - Sin llamadas al servidor (excepto Verificador de URL)

## Categorías

| Categoría | Herramientas |
|-----------|-------------|
| Seguridad | Contraseñas, Hash, Cifrado |
| Privacidad | Credenciales, Metadatos |
| Análisis | Verificador URL, Contador caracteres |
| Utilidades | QR, Comparador archivos |
| Codificación | Base32 |
