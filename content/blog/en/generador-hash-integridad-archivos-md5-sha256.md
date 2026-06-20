---

title: "Data Integrity: How to Verify Files Using MD5 and SHA-256 Hashes"
excerpt: "Learn what cryptographic hashing algorithms are and how to use them to ensure that a downloaded file has not been altered."
date: "2026-06-19"
author: "V1TR0"
category: "seguridad"
tags: ["hashing", "security", "MD5", "SHA-256", "integrity", "cryptography"]
featured: false
image: "/blogs/generador-hash-integridad-archivos-md5-sha256.png"
faqs:
  - question: "/*What is a hash function?*/"
    answer: "It is a one-way mathematical algorithm that takes data of any size and transforms it into a unique fixed-length text string (the hash or fingerprint)."
  - question: "/*What is the purpose of verifying the hash of a file?*/"
    answer: "To confirm its integrity. If a file was modified (even by a single bit due to a network error or an injected virus), the final hash changes drastically."
  - question: "/*Is MD5 still safe?*/"
    answer: "Not for cryptographic or password authentication purposes due to known collisions, but still useful as a basic checksum to detect file transfer errors."


---

# Data integrity: How to verify files using MD5 and SHA-256 hashes

When you download critical software from the internet (such as a Linux distribution, operating system installers, or crypto wallets), how do you know that the file wasn't tampered with by a third party or corrupted due to a poor network connection?

The standard security solution is to compare the signature or **cryptographic hash** of the file.

### The characteristics of Hash functions

Cryptographic hashing functions (such as **SHA-256**) have three key properties:
1. **Unidirectionality:** It is impossible to reconstruct the original file from its text hash.
2. **Determinism:** The same file will always generate exactly the same hash.
3. **Avalanche Effect:** If you change a single letter in the original file, the resulting hash will be completely different.

For this reason, companies publish the official hash of the download file on their website so that the user can validate it on their local computer.

To calculate the MD5, SHA-1 or SHA-256 checksums of your texts or files locally in your browser without uploading them to the internet, use our utility:

**[Try our Crypto Hash Generator](/tools/hash-generator)**

Drag any file into the browser to calculate its cryptographic signatures instantly, securely and privately.