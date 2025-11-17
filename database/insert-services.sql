-- Eliminar productos de ejemplo antiguos si existen
DELETE FROM product_images WHERE product_id IN (
  SELECT id FROM products WHERE vendor IN ('CryptoSecure', 'SecureComm', 'DataGuard')
);
DELETE FROM products WHERE vendor IN ('CryptoSecure', 'SecureComm', 'DataGuard');

-- Insertar los nuevos servicios profesionales
-- 1. Creación de Sitios Web y Aplicaciones Web Seguras
INSERT INTO products (
  name,
  description,
  price,
  crypto_price_btc,
  crypto_price_eth,
  crypto_price_usdt,
  category,
  vendor,
  features,
  is_active,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Desarrollo Web y Aplicaciones Seguras',
  'Creamos sitios web y aplicaciones web de alta calidad con seguridad integrada desde el diseño. Utilizamos las últimas tecnologías y mejores prácticas para garantizar aplicaciones robustas, escalables y protegidas contra amenazas modernas.',
  2999.00,
  0.035000,
  0.850000,
  2999.00,
  'web-development',
  'V1tr0',
  '["Desarrollo Full Stack con tecnologías modernas", "Arquitectura segura y escalable", "Auditoría de seguridad incluida", "Protección contra OWASP Top 10", "Implementación de HTTPS y certificados SSL", "Autenticación y autorización robusta", "Cifrado de datos sensibles", "Backup automático y recuperación ante desastres", "Optimización de rendimiento y SEO", "Mantenimiento y soporte técnico 24/7", "Documentación técnica completa", "Capacitación del equipo incluida"]'::jsonb,
  true,
  true,
  NOW(),
  NOW()
);

-- 2. Capacitaciones en Seguridad y Uso de Herramientas
INSERT INTO products (
  name,
  description,
  price,
  crypto_price_btc,
  crypto_price_eth,
  crypto_price_usdt,
  category,
  vendor,
  features,
  is_active,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Capacitación en Seguridad Digital y Herramientas',
  'Programa de capacitación integral en seguridad digital y uso correcto de herramientas de protección. Aprende a proteger tu información personal y empresarial con técnicas profesionales y herramientas de última generación.',
  899.00,
  0.010500,
  0.255000,
  899.00,
  'security-training',
  'TecnoCrypter',
  '["Fundamentos de ciberseguridad", "Gestión de contraseñas y autenticación", "Uso seguro de redes y VPN", "Detección y prevención de phishing", "Navegación segura y privacidad online", "Cifrado de archivos y comunicaciones", "Seguridad en dispositivos móviles", "Protección contra malware y ransomware", "Prácticas hands-on con herramientas reales", "Certificado de finalización", "Material descargable", "Soporte post-capacitación 3 meses"]'::jsonb,
  true,
  true,
  NOW(),
  NOW()
);

-- 3. Capacitación en Uso Seguro de IA
INSERT INTO products (
  name,
  description,
  price,
  crypto_price_btc,
  crypto_price_eth,
  crypto_price_usdt,
  category,
  vendor,
  features,
  is_active,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Capacitación en IA Segura: Uso sin Exponer Datos',
  'Aprende a aprovechar el poder de la inteligencia artificial sin comprometer la seguridad de tus datos. Esta capacitación te enseña técnicas de anonimización, privacidad diferencial y mejores prácticas para implementar IA de forma responsable.',
  1299.00,
  0.015200,
  0.370000,
  1299.00,
  'ai-training',
  'TecnoCrypter',
  '["Introducción a IA y privacidad", "Técnicas de anonimización de datos", "Privacidad diferencial aplicada", "IA on-premise vs cloud seguro", "Evaluación de riesgos en modelos de IA", "GDPR y cumplimiento normativo", "Implementación de IA ética", "Casos prácticos empresariales", "Herramientas de IA seguras", "Políticas de uso de datos", "Certificado profesional", "Consultoría personalizada incluida"]'::jsonb,
  true,
  true,
  NOW(),
  NOW()
);

-- 4. Prevención de Ataques y Seguridad Empresarial
INSERT INTO products (
  name,
  description,
  price,
  crypto_price_btc,
  crypto_price_eth,
  crypto_price_usdt,
  category,
  vendor,
  features,
  is_active,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Prevención de Ataques y Seguridad Empresarial',
  'Servicio integral de prevención de ataques cibernéticos para tu sitio web y empresa. Implementamos múltiples capas de seguridad, monitoreo continuo y medidas preventivas para proteger tus activos digitales contra amenazas actuales y emergentes.',
  4999.00,
  0.058400,
  1.420000,
  4999.00,
  'cybersecurity',
  'TecnoCrypter',
  '["Análisis de vulnerabilidades completo", "Implementación de firewall avanzado", "Sistema de detección de intrusiones (IDS)", "Protección DDoS y anti-bot", "Monitoreo 24/7 de amenazas", "Actualizaciones de seguridad automáticas", "Hardening de servidores", "Políticas de seguridad empresarial", "Auditorías de seguridad trimestrales", "Plan de respuesta a incidentes", "Capacitación del personal", "Reportes mensuales detallados"]'::jsonb,
  true,
  true,
  NOW(),
  NOW()
);

-- 5. Soporte y Respuesta ante Ataques Informáticos
INSERT INTO products (
  name,
  description,
  price,
  crypto_price_btc,
  crypto_price_eth,
  crypto_price_usdt,
  category,
  vendor,
  features,
  is_active,
  is_featured,
  created_at,
  updated_at
) VALUES (
  'Respuesta Rápida ante Incidentes de Seguridad',
  'Servicio de respuesta inmediata ante ataques informáticos y brechas de seguridad. Nuestro equipo especializado actúa rápidamente para contener amenazas, recuperar sistemas y prevenir futuros incidentes, disponible 24/7 los 365 días del año.',
  3499.00,
  0.040900,
  0.995000,
  3499.00,
  'incident-response',
  'TecnoCrypter',
  '["Respuesta inmediata 24/7/365", "Análisis forense digital", "Contención de amenazas activas", "Recuperación de sistemas comprometidos", "Eliminación de malware y backdoors", "Restauración de datos", "Investigación del origen del ataque", "Documentación legal del incidente", "Recomendaciones de prevención", "Informe detallado post-incidente", "Soporte legal y comunicaciones", "Plan de mejora continua"]'::jsonb,
  true,
  true,
  NOW(),
  NOW()
);

-- Nota: Las imágenes de los productos se deben agregar manualmente a través de la tabla product_images
-- con las URLs de las imágenes correspondientes en el directorio /public/products/
