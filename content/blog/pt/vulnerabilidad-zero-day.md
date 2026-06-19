---

title: "Vulnerabilidade de dia zero no WinRAR: como é explorada e como se proteger"
excerpt: "A ESET descobriu uma vulnerabilidade de dia zero no WinRAR (CVE‑2025‑8088) que já está sendo explorada pelo grupo RomCom. Saiba como funciona e quais medidas tomar."
date: "2025-08-13"
author: "Analista Ciberseguridad"
category: "seguridad"
tags: ["WinRAR", "dia zero", "vulnerabilidades", "malware"]
featured: true
image: "/blogs/vulnerabilidad-zero‑day.webp"

---

# Vulnerabilidade de dia zero no WinRAR: como é explorada e como se proteger

Em 11 de agosto de 2025, os pesquisadores da ESET tornaram pública a descoberta de uma vulnerabilidade de dia zero no WinRAR que estava sendo explorada ativamente. Essa falha permite que invasores executem códigos maliciosos descompactando arquivos especialmente criados.

## O que sabemos sobre CVE-2025-8088?

- **Descoberta e exploração**: em 18 de julho de 2025, foi detectada uma exploração que se aproveitava de uma falha de *path traversal* no WinRAR. Os invasores ocultariam arquivos maliciosos dentro de arquivos RAR e os implantariam quando a vítima os extraísse.
- **Responsável**: O grupo RomCom ligado à Rússia utilizou esta vulnerabilidade em campanhas direcionadas aos setores financeiro, industrial, de defesa e de logística.
- **Reconhecimento oficial**: a vulnerabilidade está registrada como CVE-2025-8088; O WinRAR lançou uma versão corrigida (7.13) em 30 de julho.

## Recomendações para usuários e empresas

1. **Atualize o WinRAR**: instale a versão 7.13 ou superior; versões mais antigas (incluindo utilitários de linha de comando e UnRAR.dll) são vulneráveis.
2. **Verifique arquivos compactados**: Evite extrair arquivos RAR de remetentes desconhecidos; verifique os arquivos com um antivírus atualizado.
3. **Aplicar políticas de e-mail**: Configure filtros para bloquear anexos suspeitos e treine os funcionários para reconhecer arquivos potencialmente perigosos.
4. **Monitore sistemas críticos**: Se você usou versões vulneráveis, verifique os sistemas em busca de backdoors associados ao SnipBot, RustyClaw ou ao agente Mythic.

## Conclusão

A vulnerabilidade CVE-2025-8088 demonstra que mesmo ferramentas populares como o WinRAR podem se tornar um vetor de ataque. Manter o software atualizado e seguir boas práticas de higiene digital são fundamentais para minimizar os riscos.