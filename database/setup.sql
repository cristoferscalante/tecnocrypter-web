-- Configuración de la base de datos para TecnoCrypter Platform
-- Tablas para productos y sus imágenes

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    crypto_price_btc DECIMAL(10, 8),
    crypto_price_eth DECIMAL(10, 6),
    crypto_price_usdt DECIMAL(10, 2),
    category VARCHAR(100) NOT NULL,
    vendor VARCHAR(255) NOT NULL,
    features JSONB,
    download_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de imágenes de productos
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    alt VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_order ON product_images(product_id, display_order);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en productos
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, crypto_price_btc, crypto_price_eth, crypto_price_usdt, category, vendor, features, is_featured) VALUES
(
    'SecureVPN Premium',
    'VPN de alta seguridad con encriptación de grado militar y política de no logs. Protege tu privacidad en línea con servidores en más de 90 países y velocidades ultrarrápidas.',
    99.99,
    0.0025,
    0.035,
    99.99,
    'vpn',
    'CryptoSecure',
    '["Encriptación AES-256", "Sin logs", "Servidores en 90 países", "Hasta 10 dispositivos", "Soporte 24/7", "Garantía de devolución 30 días"]'::jsonb,
    true
),
(
    'CryptoPass Manager',
    'Gestor de contraseñas con encriptación de extremo a extremo y generador de claves seguras. Mantén todas tus contraseñas seguras y accesibles desde cualquier dispositivo.',
    79.99,
    0.002,
    0.028,
    79.99,
    'password-manager',
    'CryptoSecure',
    '["Encriptación Zero-Knowledge", "Autenticación 2FA", "Sincronización en la nube", "Alertas de seguridad", "Generador de contraseñas", "Autocompletado seguro"]'::jsonb,
    true
),
(
    'SecureChat Messenger',
    'Mensajería instantánea con encriptación de extremo a extremo y mensajes autodestructivos. Comunícate de forma segura sin comprometer tu privacidad.',
    49.99,
    0.0012,
    0.018,
    49.99,
    'messaging',
    'SecureComm',
    '["Encriptación E2E", "Mensajes autodestructivos", "Verificación de identidad", "Sin almacenamiento en servidores", "Llamadas encriptadas", "Grupos seguros"]'::jsonb,
    true
),
(
    'FileShield Encryptor',
    'Software de encriptación de archivos con algoritmos de nivel militar para máxima protección de tus documentos y datos sensibles.',
    129.99,
    0.0032,
    0.045,
    129.99,
    'encryption',
    'DataGuard',
    '["Encriptación AES-256", "Protección de contraseña", "Borrado seguro", "Integración con la nube", "Múltiples formatos"]'::jsonb,
    false
),
(
    'CryptoGuard Security Suite',
    'Suite completa de seguridad con antivirus, firewall, VPN y protección de identidad. Protección integral para todos tus dispositivos.',
    149.99,
    0.0037,
    0.052,
    149.99,
    'security',
    'CryptoSecure',
    '["Antivirus avanzado", "Firewall inteligente", "VPN integrada", "Protección de identidad", "Anti-malware", "Protección web"]'::jsonb,
    false
),
(
    'CryptoVault Hardware Wallet',
    'Cartera hardware para almacenamiento seguro de criptomonedas con chip de seguridad EAL6+. La forma más segura de guardar tus activos digitales.',
    199.99,
    0.005,
    0.07,
    199.99,
    'security',
    'CryptoSecure',
    '["Chip de seguridad EAL6+", "Soporte para 1500+ criptomonedas", "Pantalla integrada", "Respaldo de semilla", "Bluetooth seguro", "App móvil"]'::jsonb,
    false
);

-- Insertar imágenes para los productos
-- SecureVPN Premium (ID: 1)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(1, '/products/secure-vpn-1/main.webp', 'SecureVPN Premium - Imagen principal', 1),
(1, '/products/secure-vpn-1/interface.webp', 'SecureVPN Premium - Interfaz de usuario', 2),
(1, '/products/secure-vpn-1/servers.webp', 'SecureVPN Premium - Mapa de servidores', 3),
(1, '/products/secure-vpn-1/mobile.webp', 'SecureVPN Premium - Aplicación móvil', 4);

-- CryptoPass Manager (ID: 2)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(2, '/products/password-manager-1/main.webp', 'CryptoPass Manager - Imagen principal', 1),
(2, '/products/password-manager-1/vault.webp', 'CryptoPass Manager - Bóveda de contraseñas', 2),
(2, '/products/password-manager-1/generator.webp', 'CryptoPass Manager - Generador de contraseñas', 3),
(2, '/products/password-manager-1/mobile-app.webp', 'CryptoPass Manager - Aplicación móvil', 4);

-- SecureChat Messenger (ID: 3)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(3, '/products/secure-messenger-1/main.webp', 'SecureChat Messenger - Imagen principal', 1),
(3, '/products/secure-messenger-1/chat-interface.webp', 'SecureChat Messenger - Interfaz de chat', 2),
(3, '/products/secure-messenger-1/privacy-settings.webp', 'SecureChat Messenger - Configuración de privacidad', 3),
(3, '/products/secure-messenger-1/secure-calls.webp', 'SecureChat Messenger - Llamadas seguras', 4);

-- FileShield Encryptor (ID: 4)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(4, '/placeholder.svg?height=300&width=500&query=File encryption software', 'FileShield Encryptor - Imagen principal', 1);

-- CryptoGuard Security Suite (ID: 5)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(5, '/placeholder.svg?height=300&width=500&query=Security suite software', 'CryptoGuard Security Suite - Imagen principal', 1);

-- CryptoVault Hardware Wallet (ID: 6)
INSERT INTO product_images (product_id, url, alt, display_order) VALUES
(6, '/placeholder.svg?height=300&width=500&query=Hardware wallet crypto', 'CryptoVault Hardware Wallet - Imagen principal', 1);

-- Consultas útiles para verificar los datos
-- SELECT * FROM products WHERE is_active = true;
-- SELECT p.name, pi.url, pi.display_order FROM products p JOIN product_images pi ON p.id = pi.product_id ORDER BY p.id, pi.display_order;
-- SELECT * FROM products WHERE is_featured = true;
-- SELECT * FROM products WHERE category = 'vpn';

-- Comentarios sobre la estructura:
-- 1. La tabla products almacena toda la información básica del producto
-- 2. Los precios en criptomonedas se almacenan como decimales para precisión
-- 3. Las características (features) se almacenan como JSONB para flexibilidad
-- 4. La tabla product_images permite múltiples imágenes por producto
-- 5. Los índices mejoran el rendimiento de las consultas comunes
-- 6. El trigger actualiza automáticamente el campo updated_at