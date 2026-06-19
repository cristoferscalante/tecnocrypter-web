import os
import shutil

artifacts_dir = r"C:\Users\crist\.gemini\antigravity\brain\a738a7eb-e5f4-4d18-97a8-c1e42167dc7d"
dest_dir = r"d:\Clients\tecnocrypter\tecnocrypter-platform\public\blogs"
os.makedirs(dest_dir, exist_ok=True)

# Category base images
src_images = {
    "seguridad": os.path.join(artifacts_dir, "security_category_1781714383011.png"),
    "privacidad": os.path.join(artifacts_dir, "privacy_category_1781714398176.png"),
    "desarrollo": os.path.join(artifacts_dir, "development_category_1781714409993.png"),
    "utilidades": os.path.join(artifacts_dir, "utilities_category_1781714423555.png")
}

# 30 tools mapping
mappings = {
    "seguridad": [
        "analizador-cabeceras-email-detectar-phishing.png",
        "calculadora-entropia-matematica-contrasenas-seguras.png",
        "decodificar-jwt-seguridad-tokens-autenticacion.png",
        "generador-claves-criptograficas-publicas-privadas-rsa-ecdsa.png",
        "generador-hash-integridad-archivos-md5-sha256.png"
    ],
    "privacidad": [
        "eliminador-rastreo-urls-evitar-seguimiento-marketing.png",
        "generador-alias-proteger-correo-electronico-spam.png",
        "generador-credenciales-seguridad-cuentas-desarrollo.png",
        "generador-datos-ficticios-pruebas-privacidad-bases-datos.png",
        "generador-user-agent-evitar-huella-digital-navegador.png",
        "ofuscador-texto-unicode-zalgo-seguridad-mensajeria.png"
    ],
    "desarrollo": [
        "codificador-base32-crockford-sistemas-legados.png",
        "conversor-base64-archivos-texto-transmision-segura.png",
        "conversor-hexadecimal-binario-decimal-programacion.png",
        "validador-json-formatear-minificar-estructuras-datos.png",
        "generador-uuid-v4-v7-ulid-claves-primarias-unicas.png",
        "codificador-url-percent-encoding-seguridad-enlaces.png",
        "regex-tester-expresiones-regulares-validacion-patrones.png",
        "formateador-sql-embellecer-consultas-bases-datos.png",
        "generador-cron-expresiones-automatizacion-tareas-servidor.png",
        "minificador-css-js-optimizar-rendimiento-web.png"
    ],
    "utilidades": [
        "contador-caracteres-palabras-limites-seo-redes-sociales.png",
        "generador-lorem-ipsum-texto-relleno-maquetacion-diseno.png",
        "comparador-archivos-diff-viewer-detectar-cambios-codigo.png",
        "conversor-colores-hex-rgb-hsl-diseno-web.png",
        "conversor-markdown-html-redaccion-contenido-estructurado.png",
        "conversor-timestamp-unix-zonas-horarias-programacion.png",
        "conversor-unidades-peso-longitud-temperatura.png",
        "calculadora-porcentajes-iva-descuentos-finanzas.png",
        "generador-csv-datos-tabulares-excel-bases-datos.png"
    ]
}

for category, filenames in mappings.items():
    src_path = src_images[category]
    if not os.path.exists(src_path):
        print(f"Error: source image for {category} not found at {src_path}")
        continue
    for filename in filenames:
        dest_path = os.path.join(dest_dir, filename)
        shutil.copy2(src_path, dest_path)
        print(f"Copied {category} cover to {filename}")

print("Successfully copied all 30 category covers to public/blogs/")
