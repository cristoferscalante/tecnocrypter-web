# Configuración de Servicios Profesionales

Este documento explica cómo configurar los nuevos servicios profesionales en la plataforma TecnoCrypter.

## Servicios Incluidos

1. **Desarrollo Web y Aplicaciones Seguras** - V1tr0
2. **Capacitación en Seguridad Digital y Herramientas** - TecnoCrypter
3. **Capacitación en IA Segura** - TecnoCrypter
4. **Prevención de Ataques y Seguridad Empresarial** - TecnoCrypter
5. **Respuesta Rápida ante Incidentes** - TecnoCrypter

## Instrucciones de Instalación

### 1. Ejecutar los Scripts SQL

#### a. Insertar los servicios en la base de datos:

```bash
# Conéctate a tu base de datos Supabase y ejecuta:
psql -h your-project.supabase.co -U postgres -d postgres -f database/insert-services.sql
```

O desde la consola SQL de Supabase:
1. Ve a tu proyecto en Supabase
2. Navega a "SQL Editor"
3. Copia y pega el contenido de `database/insert-services.sql`
4. Ejecuta el script

#### b. Insertar las imágenes de los productos:

```bash
psql -h your-project.supabase.co -U postgres -d postgres -f database/insert-product-images.sql
```

### 2. Preparar las Imágenes

Necesitas crear o descargar imágenes para cada servicio y colocarlas en el directorio `public/products/`:

#### Estructura de directorios necesaria:

```
public/
  products/
    # Desarrollo Web
    web-development-hero.jpg
    web-development-security.jpg
    web-development-code.jpg
    
    # Capacitación en Seguridad
    security-training-hero.jpg
    security-training-tools.jpg
    security-training-cert.jpg
    
    # IA Segura
    ai-security-hero.jpg
    ai-security-privacy.jpg
    ai-security-ethics.jpg
    
    # Prevención de Ataques
    cybersecurity-hero.jpg
    cybersecurity-monitoring.jpg
    cybersecurity-firewall.jpg
    
    # Respuesta a Incidentes
    incident-response-hero.jpg
    incident-response-forensics.jpg
    incident-response-recovery.jpg
```

#### Recomendaciones para las imágenes:

- **Formato**: JPG o WebP optimizado
- **Dimensiones recomendadas**: 1200x675px (16:9)
- **Tamaño máximo**: 300KB por imagen
- **Calidad**: 80-85%

#### Fuentes de imágenes sugeridas:

- [Unsplash](https://unsplash.com/) - Búsquedas: "cybersecurity", "web development", "ai", "digital security"
- [Pexels](https://www.pexels.com/) - Imágenes libres de alta calidad
- [Freepik](https://www.freepik.com/) - Vectores e ilustraciones (requiere atribución en plan gratuito)

### 3. Verificar la Instalación

1. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

2. Visita: `http://localhost:3000/productos`

3. Verifica que:
   - Los 5 servicios aparezcan correctamente
   - Las categorías nuevas funcionen
   - Los filtros por proveedor muestren "V1tr0" y "TecnoCrypter"
   - Las imágenes se carguen correctamente
   - Los precios en crypto se muestren

### 4. Personalización Adicional

#### Actualizar precios de crypto en tiempo real:

Considera implementar una actualización automática de precios crypto. Puedes usar APIs como:
- CoinGecko API
- CryptoCompare API
- Binance API

#### Añadir más detalles a cada servicio:

Cada servicio ahora tiene su propia página de detalles en `/productos/[id]`. Puedes personalizar:
- Contenido expandido
- Casos de estudio
- Testimonios de clientes
- Galería de proyectos

#### Configurar pasarelas de pago:

Para aceptar pagos en criptomonedas, considera integrar:
- BTCPay Server (auto-hospedado)
- CoinGate
- Coinbase Commerce
- NOWPayments

## Estructura de Base de Datos

### Tabla `products`

Campos principales:
- `id`: UUID único
- `name`: Nombre del servicio
- `description`: Descripción detallada
- `price`: Precio en USD
- `crypto_price_btc/eth/usdt`: Precios en criptomonedas
- `category`: Categoría del servicio
- `vendor`: Proveedor (V1tr0, TecnoCrypter)
- `features`: Array de características
- `is_active`: Estado activo/inactivo
- `is_featured`: Destacado en home

### Tabla `product_images`

Campos principales:
- `id`: UUID único
- `product_id`: Referencia al producto
- `url`: Ruta de la imagen
- `alt`: Texto alternativo
- `display_order`: Orden de visualización

## Próximos Pasos

1. **Páginas de Landing Individuales**: Crear páginas específicas para cada servicio con más información
2. **Sistema de Cotizaciones**: Implementar un formulario para solicitar cotizaciones personalizadas
3. **Blog de Casos de Estudio**: Agregar contenido sobre proyectos realizados
4. **Sistema de Reviews**: Permitir que clientes dejen reseñas
5. **Calendario de Capacitaciones**: Para las capacitaciones, mostrar fechas disponibles

## Soporte

Para dudas o problemas:
- Revisa la documentación de Supabase: https://supabase.com/docs
- Consulta la documentación de Next.js: https://nextjs.org/docs
- Contacta al equipo de desarrollo

## Notas Adicionales

- Los precios en criptomonedas son aproximados y se calculan basándose en el precio USD
- Se recomienda actualizar los precios crypto regularmente
- Asegúrate de tener los permisos adecuados en Supabase para las operaciones CRUD
- Configura políticas de RLS (Row Level Security) según tus necesidades
