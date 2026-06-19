---

title: "Attaques de poussière : l'astuce invisible utilisée par les pirates pour suivre votre portefeuille cryptographique"
excerpt: "Analyse des attaques de dépoussiérage dans les crypto-monnaies. Découvrez comment l'envoi de minuscules fractions de soldes permet de désanonymiser les identités sur la blockchain."
date: "2026-06-19"
author: "V1TR0"
category: "criptomonedas"
tags: ["Attaque de poussière", "Chaîne de blocs", "Confidentialité", "Sécurité cryptographique", "Bitcoin", "UTXO"]
featured: false
image: "/blogs/ataques-polvo-dusting-attacks-desanonimizar-direcciones-cripto.png"
faqs:
  - question: "Qu’est-ce qu’une attaque de dépoussiérage contre les crypto-monnaies ?"
    answer: "Il s’agit d’une attaque d’analyse blockchain qui consiste à envoyer de minuscules quantités de cryptomonnaie (poussière) à des milliers de portefeuilles publics dans le but de suivre leur activité ultérieure."
  - question: "Quel est le danger d’avoir de petits soldes inconnus dans mon portefeuille ?"
    answer: "Le danger n’est pas la perte directe de fonds, mais la perte de votre vie privée. En dépensant cette « poussière » avec vos fonds habituels, vous permettez aux analystes de lier vos différentes adresses à une seule identité physique."
  - question: "Comment puis-je me protéger du suivi des poussières ?"
    answer: "Vous pouvez marquer ces minuscules soldes inconnus comme « non dépensés » (sur les portefeuilles contrôlés par UTXO) ou utiliser des services de mixage de confidentialité pour dissocier vos transactions."

---

# Attaques de dépoussiérage : l'astuce invisible utilisée par les pirates pour suivre votre portefeuille crypto

Imaginez ouvrir votre portefeuille Bitcoin ou Ethereum et découvrir que vous avez reçu une transaction non sollicitée pour un montant ridiculement petit, comme **0,000005 BTC** (quelques centimes par dollar). Bien qu'à première vue, cela puisse ressembler à une erreur de réseau ou à un cadeau insignifiant, en réalité, vous pourriez être dans le collimateur d'une **Dust Attack** ou d'une *Dusting Attack*.

Cette tactique, utilisée par les agences d’analyses médico-légales, les pirates informatiques et les gouvernements, n’a pas pour but de voler directement vos fonds, mais plutôt de détruire complètement votre anonymat en ligne.

## Le concept de « poussière » et le modèle UTXO

Pour comprendre l’attaque, il faut comprendre la notion de « poussière ». Dans l’écosystème crypto, la poussière fait référence à toute quantité de cryptomonnaie si petite que sa valeur est inférieure aux frais de réseau requis pour la dépenser.

Dans les réseaux basés sur **UTXO** (Unspent Transaction Outputs) comme Bitcoin, les transactions sont effectuées en regroupant différentes fractions de pièces que vous possédez.



```
Mecánica de Desanonimización mediante Dusting:
[Billetera del Atacante] ➔ Envía 0.000001 BTC (polvo) a tu Dirección A
              │
              ▼ (Tiempo después, realizas una compra grande)
[Tu Compra] ➔ Combinas Dirección A + Dirección B (donde guardas tus ahorros)
              │
              ▼ (Análisis de Blockchain del Atacante)
[El Hacker concluye]: "La Dirección A y la Dirección B pertenecen a la misma persona"
```



##Comment fonctionne l'attaque de poussière ?

L'attaquant envoie ces minuscules quantités en masse à des milliers d'adresses publiques obtenues auprès des explorateurs de blocs. Une fois la « poussière » dans votre portefeuille, l’attaquant attend simplement.

1. **Consolidation des transactions :** Lorsque vous décidez d'envoyer vos crypto-monnaies vers un autre portefeuille ou d'échange pour les vendre, votre logiciel de portefeuille combine automatiquement vos pièces légitimes avec la fraction de poussière pour compléter le montant.
2. **Analyse graphique :** Lorsque cette transaction consolidée est effectuée, l'attaquant analyse le réseau et découvre le lien entre votre adresse initiale (celle qui a reçu la poussière) et le reste de vos adresses privées.
3. **Identification finale :** Si l'une des adresses connectées interagit ultérieurement avec un échange nécessitant une vérification d'identité (KYC), l'attaquant peut légalement demander ou forcer l'échange à révéler votre vrai nom et vos coordonnées bancaires, désanonymisant ainsi l'ensemble de votre historique financier.

## Comment atténuer et éviter les attaques de poussière

La règle fondamentale de sécurité est de **ne jamais toucher la poudre reçue**.

* **Contrôle des devises (UTXO Control) :** Utilisez des portefeuilles avancés (tels que Samourai Wallet, Sparrow ou Electrum) qui prennent en charge le contrôle individuel des UTXO. Cela vous permet de cliquer avec le bouton droit sur la transaction de poussière et de la marquer comme « Ne pas dépenser », la laissant gelée à vie.
* **Adresses à usage unique :** Évitez de réutiliser la même adresse de dépôt pour recevoir des transactions.
* **Réseaux basés sur des comptes :** Sur des réseaux comme Ethereum (qui n'utilisent pas UTXO), la poussière n'est pas automatiquement regroupée lors de la dépense de fonds, ce qui rend ces types d'attaques difficiles, bien qu'elle reste utile pour les techniques d'usurpation du spam et de l'historique des transactions.