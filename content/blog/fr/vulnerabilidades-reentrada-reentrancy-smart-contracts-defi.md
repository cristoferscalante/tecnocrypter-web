---

title: "L'anatomie d'un piratage DeFi : comment les vulnérabilités de réentrée drainent des millions de contrats intelligents"
excerpt: "L'exploit de réentrée est l'un des bugs les plus dévastateurs de Solidity, permettant à des contrats malveillants de retirer des fonds à plusieurs reprises avant de mettre à jour les soldes."
date: "2026-06-20"
author: "V1TR0"
category: "criptomonedas"
tags: ["Rentrée", "Solidité", "contrats intelligents", "DéFi", "Piratage DAO", "sécurité de la blockchain"]
featured: true
image: "/blogs/vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.png"
faqs:
  - question: "Qu’est-ce qu’une vulnérabilité de réentrée dans Solidity ?"
    answer: "Il s'agit d'une faille de sécurité qui se produit lorsqu'un contrat intelligent effectue un appel externe à un contrat non fiable pour transférer des fonds avant de mettre à jour son état interne (comme le solde de l'utilisateur)."
  - question: "Comment la célèbre attaque DAO de 2016 a-t-elle été exécutée avec ce bug ?"
    answer: "L'attaquant a créé un contrat avec une fonction de rappel qui a appelé à plusieurs reprises la fonction de retrait de contrat du DAO. Cela vous a permis de retirer de l'éther encore et encore avant que le contrat ne déduise le solde de votre compte."
  - question: "Quels sont les moyens d’atténuer les attaques de réentrée ?"
    answer: "Implémentez le modèle de conception Contrôles-Effets-Interactions (mettre à jour les états avant le transfert) et utilisez des modificateurs d'exclusion mutuelle tels que ReentrancyGuard d'OpenZeppelin."

---

# L'anatomie d'un hack DeFi : comment les vulnérabilités de réentrée drainent des millions de contrats intelligents

Dans l’écosystème financier décentralisé (DeFi), le code des contrats intelligents fait loi. Si un contrat intelligent présente une petite faille logique, les attaquants peuvent drainer de manière irréversible des millions de dollars en quelques minutes. L’exemple le plus historique et le plus destructeur est la vulnérabilité **reentry** ou *Reentrancy*.

Cette vulnérabilité a provoqué l’effondrement du fonds d’investissement **The DAO** en 2016, forçant un hard fork dans le réseau Ethereum qui a donné naissance à Ethereum (ETH) et Ethereum Classic (ETC).

### Le flux d'exécution dans l'EVM

Dans la machine virtuelle Ethereum (EVM), lorsqu'un contrat intelligent envoie des fonds (Ether) à une autre adresse qui se trouve être un contrat intelligent, le contrat destinataire peut automatiquement exécuter du code via des fonctions spéciales appelées « repli » ou « réception ».

Le problème de réentrée se produit lorsque le contrat émetteur transfère les fonds *avant* de mettre à jour le solde du compte de l'utilisateur dans sa base de données interne.

L'attaque se déroule généralement comme suit :
1. **Appel de retrait :** Un contrat malveillant demande le retrait de votre solde déposé dans un contrat intelligent de prêt ou d'investissement.
2. **Transfert de fonds :** Le contrat de la victime lit le solde de l'attaquant, voit qu'il dispose de fonds et lui envoie l'argent via un appel externe (« appel »).
3. **Interruption malveillante :** Dès réception des fonds, le contrat de l'attaquant active sa fonction de « secours ». Au lieu de mettre fin à la transaction, ce code malveillant appelle à nouveau la fonction de retrait du contrat victime.
4. **Boucle de drainage :** Étant donné que l'exécution de la transaction précédente n'est pas encore terminée, le contrat de la victime n'a pas encore atteint la ligne de code où se trouve le solde de l'attaquant. Le contrat constate que le solde de l'attaquant est toujours intact et envoie à nouveau des fonds à l'attaquant, répétant le processus dans une boucle infinie jusqu'à ce que le contrat de la victime soit à court de réserves ou que la pile d'appels soit saturée.

### Le modèle Contrôles-Effets-Interactions

La défense ultime contre les attaques réentrantes réside dans l'application d'un ordre strict de logique de fonction connu sous le nom de modèle de conception **Contrôles-Effets-Interactions** :

1. **Contrôles :** Vérifiez toutes les conditions requises (par exemple `require(balance >= RemoveAmount)`).
2. **Effets :** Modifiez tous les états et variables internes du contrat *avant* d'effectuer des opérations externes (par exemple en soustrayant le solde de l'utilisateur : `balances[msg.sender] -= RemoveAmount`).
3. **Interactions :** Effectuez des appels externes vers d'autres comptes ou des transferts de fonds à la fin (par exemple `payable(msg.sender).call{value: RemoveAmount}("")`).

Suivant ce schéma, si l'attaquant tente de réintégrer la fonction de retrait pendant la phase d'interaction, le contrat victime lira son solde mis à jour (qui est déjà nul après la phase d'effet) et rejettera immédiatement la nouvelle demande.

### Modificateurs d'exclusion mutuelle

Une autre couche fondamentale de défense est l'utilisation de verrous ou de modificateurs « nonReentrant » fournis par des bibliothèques standards telles que **OpenZeppelin**. Ce modificateur définit une variable booléenne de verrouillage lors de l'entrée dans la fonction et la libère à la sortie. Si un appel récursif à la même fonction est détecté avant sa fin, la transaction est automatiquement annulée, garantissant l'immuabilité logique.