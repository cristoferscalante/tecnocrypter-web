---

title: "Vulnérabilité Zero Day dans WinRAR : comment elle est exploitée et comment se protéger"
excerpt: "ESET a découvert une vulnérabilité zero-day dans WinRAR (CVE‑2025‑8088) déjà exploitée par le groupe RomCom. Découvrez comment cela fonctionne et quelles mesures prendre."
date: "2025-08-13"
author: "Analista Ciberseguridad"
category: "seguridad"
tags: ["WinRAR", "jour zéro", "vulnérabilités", "malware"]
featured: true
image: "/blogs/vulnerabilidad-zero‑day.webp"

---

# Vulnérabilité Zero-day dans WinRAR : comment elle est exploitée et comment s'en protéger

Le 11 août 2025, les chercheurs d'ESET ont rendu publique la découverte d'une vulnérabilité zero-day dans WinRAR qui était activement exploitée. Cette faille permet aux attaquants d'exécuter du code malveillant en décompressant des fichiers spécialement conçus.

## Que savons-nous de CVE-2025-8088 ?

- **Découverte et exploitation** : Le 18 juillet 2025, un exploit a été détecté qui profitait d'une faille *path traversal* dans WinRAR. Les attaquants cachaient les fichiers malveillants dans les archives RAR et les déployaient lorsque la victime les extrayait.
- **Responsable** : Le groupe RomCom, lié à la Russie, a utilisé cette vulnérabilité dans des campagnes ciblant les secteurs de la finance, de l'industrie, de la défense et de la logistique.
- **Reconnaissance officielle** : la vulnérabilité est enregistrée sous le numéro CVE-2025-8088 ; WinRAR a publié une version corrigée (7.13) le 30 juillet.

## Recommandations pour les utilisateurs et les entreprises

1. **Mettre à jour WinRAR** : installez la version 7.13 ou supérieure ; les anciennes versions (y compris les utilitaires de ligne de commande et UnRAR.dll) sont vulnérables.
2. **Vérifiez les fichiers compressés** : évitez d'extraire des fichiers RAR provenant d'expéditeurs inconnus ; analysez les fichiers avec un antivirus mis à jour.
3. **Appliquer les politiques de messagerie** : configurez des filtres pour bloquer les pièces jointes suspectes et formez les employés à reconnaître les fichiers potentiellement dangereux.
4. **Surveillez les systèmes critiques** : si vous avez utilisé des versions vulnérables, vérifiez les systèmes pour les portes dérobées associées à SnipBot, RustyClaw ou à l'agent Mythic.

## Conclusion

La vulnérabilité CVE-2025-8088 démontre que même des outils populaires comme WinRAR peuvent devenir un vecteur d'attaque. Garder les logiciels à jour et suivre de bonnes pratiques d’hygiène numérique sont essentiels pour minimiser les risques.