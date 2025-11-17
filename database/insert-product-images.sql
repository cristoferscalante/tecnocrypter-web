-- Script para insertar las imágenes de los productos
-- Ejecutar después de insert-services.sql

-- Nota: Reemplaza los IDs de producto con los generados en tu base de datos
-- Puedes obtenerlos con: SELECT id, name FROM products ORDER BY created_at DESC;

-- Imágenes para Desarrollo Web y Aplicaciones Seguras
INSERT INTO product_images (product_id, url, alt, display_order)
VALUES 
  ((SELECT id FROM products WHERE name = 'Desarrollo Web y Aplicaciones Seguras'), 
   '/products/web-development-hero.jpg', 
   'Desarrollo de aplicaciones web seguras', 
   1),
  ((SELECT id FROM products WHERE name = 'Desarrollo Web y Aplicaciones Seguras'), 
   '/products/web-development-security.jpg', 
   'Arquitectura de seguridad web', 
   2),
  ((SELECT id FROM products WHERE name = 'Desarrollo Web y Aplicaciones Seguras'), 
   '/products/web-development-code.jpg', 
   'Código seguro y limpio', 
   3);

-- Imágenes para Capacitación en Seguridad Digital
INSERT INTO product_images (product_id, url, alt, display_order)
VALUES 
  ((SELECT id FROM products WHERE name = 'Capacitación en Seguridad Digital y Herramientas'), 
   '/products/security-training-hero.jpg', 
   'Capacitación en ciberseguridad', 
   1),
  ((SELECT id FROM products WHERE name = 'Capacitación en Seguridad Digital y Herramientas'), 
   '/products/security-training-tools.jpg', 
   'Herramientas de seguridad', 
   2),
  ((SELECT id FROM products WHERE name = 'Capacitación en Seguridad Digital y Herramientas'), 
   '/products/security-training-cert.jpg', 
   'Certificación de seguridad', 
   3);

-- Imágenes para Capacitación en IA Segura
INSERT INTO product_images (product_id, url, alt, display_order)
VALUES 
  ((SELECT id FROM products WHERE name = 'Capacitación en IA Segura: Uso sin Exponer Datos'), 
   '/products/ai-security-hero.jpg', 
   'Inteligencia artificial segura', 
   1),
  ((SELECT id FROM products WHERE name = 'Capacitación en IA Segura: Uso sin Exponer Datos'), 
   '/products/ai-security-privacy.jpg', 
   'Privacidad de datos en IA', 
   2),
  ((SELECT id FROM products WHERE name = 'Capacitación en IA Segura: Uso sin Exponer Datos'), 
   '/products/ai-security-ethics.jpg', 
   'IA ética y responsable', 
   3);

-- Imágenes para Prevención de Ataques
INSERT INTO product_images (product_id, url, alt, display_order)
VALUES 
  ((SELECT id FROM products WHERE name = 'Prevención de Ataques y Seguridad Empresarial'), 
   '/products/cybersecurity-hero.jpg', 
   'Ciberseguridad empresarial', 
   1),
  ((SELECT id FROM products WHERE name = 'Prevención de Ataques y Seguridad Empresarial'), 
   '/products/cybersecurity-monitoring.jpg', 
   'Monitoreo de amenazas 24/7', 
   2),
  ((SELECT id FROM products WHERE name = 'Prevención de Ataques y Seguridad Empresarial'), 
   '/products/cybersecurity-firewall.jpg', 
   'Firewall y protección avanzada', 
   3);

-- Imágenes para Respuesta ante Incidentes
INSERT INTO product_images (product_id, url, alt, display_order)
VALUES 
  ((SELECT id FROM products WHERE name = 'Respuesta Rápida ante Incidentes de Seguridad'), 
   '/products/incident-response-hero.jpg', 
   'Respuesta a incidentes de seguridad', 
   1),
  ((SELECT id FROM products WHERE name = 'Respuesta Rápida ante Incidentes de Seguridad'), 
   '/products/incident-response-forensics.jpg', 
   'Análisis forense digital', 
   2),
  ((SELECT id FROM products WHERE name = 'Respuesta Rápida ante Incidentes de Seguridad'), 
   '/products/incident-response-recovery.jpg', 
   'Recuperación de sistemas', 
   3);
