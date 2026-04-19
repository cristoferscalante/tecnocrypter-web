# Productos / Servicios

## Resumen

Catálogo de servicios profesionales de ciberseguridad almacenados en Supabase (PostgreSQL). Soporta pagos en criptomonedas (BTC, ETH, USDT).

## Servicios Actuales

| # | Servicio | Precio | Proveedor | Categoría |
|---|----------|--------|-----------|-----------|
| 1 | Desarrollo Web Seguro | $1,500 | V1tr0 | desarrollo-web |
| 2 | Capacitación en Seguridad | $800 | TecnoCrypter | capacitacion |
| 3 | Capacitación en IA y Seguridad | $1,200 | TecnoCrypter | capacitacion |
| 4 | Consultoría en Ciberseguridad | $3,000 | V1tr0 | consultoria |
| 5 | Respuesta a Incidentes | $5,000 | V1tr0 | respuesta-incidentes |

## Base de Datos (Supabase)

### Tabla `products`
```sql
id              INTEGER (auto-incremental)
name            TEXT
description     TEXT
price           DECIMAL
crypto_price_btc DECIMAL
crypto_price_eth DECIMAL
crypto_price_usdt DECIMAL
category        TEXT
vendor          TEXT
features        TEXT[]
download_url    TEXT (opcional)
is_active       BOOLEAN
is_featured     BOOLEAN
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Tabla `product_images`
```sql
id              INTEGER
product_id      INTEGER (FK → products)
url             TEXT
alt             TEXT
display_order   INTEGER
```

## Servicio (`services/product-service.ts`)

```typescript
class ProductService {
  getAllProducts()                    // Activos, ordenados por fecha
  getProductById(id)                 // Individual con imágenes
  getFeaturedProducts(limit = 3)     // Destacados para la home
  getProductsByCategory(category)    // Por categoría
}
```

## Filtros Disponibles

- **Búsqueda de texto**: Nombre y descripción
- **Categoría**: desarrollo-web, capacitacion, consultoria, respuesta-incidentes
- **Rango de precio**: 4 rangos predefinidos
- **Proveedor**: V1tr0 / TecnoCrypter

## Páginas

- `/productos` → Listado con filtros (layout propio + loading skeleton)
- `/productos/[id]` → Detalle del producto con galería de imágenes

## Pagos Crypto

Interface `CryptoPayment`:
- Soporta BTC, ETH, USDT
- Estados: pending → confirmed / failed
- Hook: `hooks/use-crypto-payment.ts`

## Problemas Conocidos

- Algunas imágenes de productos devuelven 404
- Error de routing `/productos/[object Object]` reportado
- SEO warnings por longitud de títulos/descripciones en algunos productos
