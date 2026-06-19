---
title: "Cómo analizar cabeceras de correo electrónico para detectar phishing y spoofing"
excerpt: "Aprende a inspeccionar las cabeceras técnicas de un email para verificar su autenticidad y protegerte de ataques de suplantación de identidad (spoofing)."
date: "2026-06-19"
author: "V1TR0"
category: "seguridad"
tags: ["email", "seguridad", "phishing", "spf", "dkim", "dmarc"]
featured: false
image: "/blogs/analizador-cabeceras-email-detectar-phishing.png"
faqs:
  - question: "¿Qué es una cabecera de correo electrónico?"
    answer: "Es una sección oculta del correo que contiene metadatos de red detallados sobre el remitente, servidores de tránsito, destinatario e información de autenticación como SPF, DKIM y DMARC."
  - question: "¿Cómo sé si un correo es falso analizando su cabecera?"
    answer: "Debes buscar inconsistencias entre el dominio del remitente visible y el servidor de origen real (Return-Path), y comprobar si las validaciones de SPF o DKIM han fallado."
  - question: "¿Qué significan SPF, DKIM y DMARC?"
    answer: "Son protocolos de autenticación de email. SPF define qué servidores pueden enviar correos del dominio, DKIM añade una firma criptográfica de validación, y DMARC establece políticas para manejar correos que fallen SPF o DKIM."
---

# Cómo analizar cabeceras de correo electrónico para detectar phishing y spoofing

El correo electrónico sigue siendo el principal vector de ataque para los ciberdelincuentes. Mediante técnicas de suplantación de identidad (**email spoofing**), los atacantes logran camuflar correos maliciosos haciéndolos pasar por notificaciones de tu banco, soporte técnico o jefes corporativos.

Para verificar la autenticidad real de un correo electrónico sospechoso sin hacer clic en sus enlaces, es indispensable examinar su **cabecera técnica** o *headers*.

### La importancia de los metadatos ocultos

La cabecera de un correo contiene el historial de viaje completo que siguió el mensaje desde el dispositivo emisor hasta tu bandeja de entrada. A diferencia del contenido visual, la cabecera es mucho más difícil de falsificar en su totalidad por un atacante.

Los tres pilares de autenticación que debes revisar son:
1.  **SPF (Sender Policy Framework):** Especifica qué servidores SMTP están autorizados para enviar correos en nombre de un dominio específico.
2.  **DKIM (DomainKeys Identified Mail):** Añade una firma criptográfica al mensaje que garantiza que el contenido no fue alterado durante el tránsito.
3.  **DMARC (Domain-based Message Authentication, Reporting, and Conformance):** Indica al servidor receptor cómo actuar si las pruebas de SPF o DKIM fallan.

Para simplificar este análisis técnico, puedes utilizar nuestra herramienta interactiva:

**[Prueba nuestro Analizador de Cabeceras de Email](/tools/analizador-email)**

Copia la cabecera completa de tu gestor de correo (Outlook, Gmail, etc.) y pégala en nuestro analizador para descifrar al instante los servidores involucrados y verificar el estado de las firmas SPF, DKIM y DMARC.
