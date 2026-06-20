---

title: "The Anatomy of a DeFi Hack: How Reentrancy Vulnerabilities Drain Millions of Smart Contracts"
excerpt: "The reentry exploit is one of the most devastating bugs in Solidity, allowing malicious contracts to repeatedly withdraw funds before updating balances."
date: "2026-06-20"
author: "V1TR0"
category: "criptomonedas"
tags: ["Reentry", "Solidity", "smart contracts", "DeFi", "DAO Hack", "blockchain security"]
featured: true
image: "/blogs/vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.png"
faqs:
  - question: "What is a reentry vulnerability in Solidity?"
    answer: "It is a security flaw that occurs when a smart contract makes an external call to an untrusted contract to transfer funds before updating its internal state (such as the user's balance)."
  - question: "How was the famous The DAO attack in 2016 executed with this bug?"
    answer: "The attacker created a contract with a callback function that repeatedly called The DAO's contract withdrawal function. This allowed you to withdraw ether over and over again before the contract deducted your account balance."
  - question: "What are the ways to mitigate reentry attacks?"
    answer: "Implement the Checks-Effects-Interactions design pattern (update states before transferring) and use mutual exclusion modifiers such as OpenZeppelin's ReentrancyGuard."

---

# The Anatomy of a DeFi Hack: How Reentrancy Vulnerabilities Drain Millions of Smart Contracts

In the decentralized financial (DeFi) ecosystem, smart contract code is law. If a smart contract has a small logical flaw, attackers can irreversibly drain millions of dollars in minutes. The most historical and destructive example of this is the **reentry** or *Reentrancy* vulnerability.

This vulnerability caused the collapse of the investment fund **The DAO** in 2016, forcing a hard fork in the Ethereum network that gave rise to Ethereum (ETH) and Ethereum Classic (ETC).

### The execution flow in the EVM

In the Ethereum Virtual Machine (EVM), when a smart contract sends funds (Ether) to another address that happens to be a smart contract, the receiving contract can automatically execute code through special functions called `fallback` or `receive`.

The re-entry issue occurs when the issuing contract transfers the funds *before* updating the user's account balance in its internal database.

The attack typically proceeds as follows:
1. **Withdrawal call:** A malicious contract requests to withdraw your balance deposited in a loan or investment smart contract.
2. **Transfer of funds:** The victim contract reads the attacker's balance, sees that he has funds and sends the money to him through an external call (`call`).
3. **Malicious interruption:** Upon receiving the funds, the attacker's contract activates its `fallback` function. Instead of terminating the transaction, this malicious code calls the victim contract's withdrawal function again.
4. **Drain loop:** Since the previous transaction has not yet finished executing, the victim contract has not yet reached the line of code where the attacker's balance remains. The contract sees that the attacker's balance is still intact and sends funds to the attacker again, repeating the process in an infinite loop until the victim contract runs out of reserves or the call stack becomes saturated.

### The Checks-Effects-Interactions pattern

The ultimate defense against reentrant attacks lies in enforcing a strict ordering of function logic known as the **Checks-Effects-Interactions** design pattern:

1. **Checks:** Check all required conditions (e.g. `require(balance >= withdrawAmount)`).
2. **Effects:** Modify all states and internal variables of the contract *before* performing external operations (e.g. subtracting the user's balance: `balances[msg.sender] -= withdrawAmount`).
3. **Interactions:** Make external calls to other accounts or fund transfers at the end (e.g. `payable(msg.sender).call{value: withdrawAmount}("")`).

Following this pattern, if the attacker attempts to reenter the withdrawal function in the interaction phase, the victim contract will read its updated balance (which is already zero after the effects phase) and immediately reject the new request.

### Mutual exclusion modifiers

Another fundamental layer of defense is the use of locks or `nonReentrant` modifiers provided by standard libraries such as **OpenZeppelin**. This modifier sets a lock boolean variable upon entering the function and releases it upon exit. If a recursive call to the same function is detected before it completes, the transaction automatically rolls back, ensuring logical immutability.