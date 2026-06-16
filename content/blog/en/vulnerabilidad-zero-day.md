---

title: "Zero-day vulnerability in WinRAR: how it is exploited and how to protect yourself"
excerpt: "ESET discovered a zero-day vulnerability in WinRAR (CVE‑2025‑8088) that is already being exploited by the RomCom group. Learn how it works and what measures to take."
date: "2025-08-13"
author: "Analista Ciberseguridad"
category: "seguridad"
tags: ["WinRAR", "zero-day", "vulnerabilities", "malware"]
featured: true
image: "/blogs/vulnerabilidad-zero‑day.webp"
---
# Zero-day vulnerability in WinRAR: how it is exploited and how to protect yourself

On August 11, 2025, ESET researchers made public the discovery of a zero-day vulnerability in WinRAR that was being actively exploited. This flaw allows attackers to execute malicious code by decompressing specially crafted files.

## What do we know about CVE-2025-8088?

- **Discovery and exploitation**: On July 18, 2025, an exploit was detected that took advantage of a *path traversal* flaw in WinRAR. Attackers would hide malicious files inside RAR archives and deploy them when the victim extracted them.
- **Responsible**: The Russian-linked RomCom group used this vulnerability in campaigns targeting financial, manufacturing, defense and logistics sectors.
- **Official recognition**: the vulnerability is registered as CVE-2025-8088; WinRAR released a corrected version (7.13) on July 30.

## Recommendations for users and companies

1. **Update WinRAR**: install version 7.13 or higher; older versions (including command-line utilities and UnRAR.dll) are vulnerable.
2. **Check compressed files**: Avoid extracting RAR files from unknown senders; scan the files with an updated antivirus.
3. **Enforce email policies**: Set up filters to block suspicious attachments and train employees to recognize potentially dangerous files.
4. **Monitor critical systems**: If you have used vulnerable versions, check systems for backdoors associated with SnipBot, RustyClaw, or the Mythic agent.

## Conclusion

The CVE-2025-8088 vulnerability demonstrates that even popular tools like WinRAR can become an attack vector. Keeping software up to date and following good digital hygiene practices are key to minimizing risk.