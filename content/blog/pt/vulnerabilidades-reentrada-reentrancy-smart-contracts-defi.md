---

title: "A anatomia de um hack DeFi: como as vulnerabilidades de reentrada drenam milhões de contratos inteligentes"
excerpt: "A exploração de reentrada é um dos bugs mais devastadores do Solidity, permitindo que contratos maliciosos retirem fundos repetidamente antes de atualizar os saldos."
date: "2026-06-20"
author: "V1TR0"
category: "criptomonedas"
tags: ["Reentrada", "Solidez", "contratos inteligentes", "DeFi", "Hack de DAO", "segurança blockchain"]
featured: true
image: "/blogs/vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.png"
faqs:
  - question: "O que é uma vulnerabilidade de reentrada no Solidity?"
    answer: "É uma falha de segurança que ocorre quando um contrato inteligente faz uma chamada externa para um contrato não confiável para transferir fundos antes de atualizar seu estado interno (como o saldo do usuário)."
  - question: "Como o famoso ataque DAO em 2016 foi executado com esse bug?"
    answer: "O invasor criou um contrato com uma função de retorno de chamada que chamou repetidamente a função de retirada de contrato do DAO. Isso permitiu que você sacasse o Ether repetidamente antes que o contrato deduzisse o saldo da sua conta."
  - question: "Quais são as maneiras de mitigar ataques de reentrada?"
    answer: "Implemente o padrão de design Checks-Effects-Interactions (atualize os estados antes da transferência) e use modificadores de exclusão mútua, como o ReentrancyGuard do OpenZeppelin."

---

# A anatomia de um hack DeFi: como as vulnerabilidades de reentrada drenam milhões de contratos inteligentes

No ecossistema financeiro descentralizado (DeFi), o código do contrato inteligente é lei. Se um contrato inteligente tiver uma pequena falha lógica, os invasores poderão drenar irreversivelmente milhões de dólares em minutos. O exemplo mais histórico e destrutivo disso é a vulnerabilidade de **reentrada** ou *Reentrada*.

Esta vulnerabilidade causou o colapso do fundo de investimento **The DAO** em 2016, forçando um hard fork na rede Ethereum que deu origem ao Ethereum (ETH) e ao Ethereum Classic (ETC).

### O fluxo de execução no EVM

Na Máquina Virtual Ethereum (EVM), quando um contrato inteligente envia fundos (Ether) para outro endereço que é um contrato inteligente, o contrato receptor pode executar automaticamente o código através de funções especiais chamadas `fallback` ou `receive`.

O problema de reentrada ocorre quando o contrato emissor transfere os fundos *antes* de atualizar o saldo da conta do usuário em seu banco de dados interno.

O ataque normalmente ocorre da seguinte forma:
1. **Chamada de retirada:** Um contrato malicioso solicita a retirada de seu saldo depositado em um contrato inteligente de empréstimo ou investimento.
2. **Transferência de fundos:** O contrato da vítima lê o saldo do atacante, vê se ele tem fundos e envia o dinheiro para ele através de uma chamada externa (`call`).
3. **Interrupção maliciosa:** Ao receber os fundos, o contrato do invasor ativa sua função de `fallback`. Em vez de encerrar a transação, esse código malicioso aciona novamente a função de retirada do contrato da vítima.
4. **Loop de drenagem:** Como a transação anterior ainda não foi concluída, o contrato da vítima ainda não atingiu a linha de código onde permanece o saldo do invasor. O contrato verifica que o saldo do invasor ainda está intacto e envia fundos ao invasor novamente, repetindo o processo em um loop infinito até que o contrato da vítima fique sem reservas ou a pilha de chamadas fique saturada.

### O padrão Verificações-Efeitos-Interações

A defesa definitiva contra ataques reentrantes reside na aplicação de uma ordem estrita de lógica de função conhecida como padrão de design **Verificações-Efeitos-Interações**:

1. **Verificações:** Verifique todas as condições exigidas (por exemplo, `require(balance >=drawAmount)`).
2. **Efeitos:** Modifique todos os estados e variáveis ​​internas do contrato *antes* de realizar operações externas (por exemplo, subtraindo o saldo do usuário: `balances[msg.sender] -=drawAmount`).
3. **Interações:** Faça chamadas externas para outras contas ou transferências de fundos no final (por exemplo, `payable(msg.sender).call{value: retiradaAmount}("")`).

Seguindo esse padrão, caso o invasor tente entrar novamente na função de saque na fase de interação, o contrato da vítima lerá seu saldo atualizado (que já é zero após a fase de efeitos) e rejeitará imediatamente a nova solicitação.

### Modificadores de exclusão mútua

Outra camada fundamental de defesa é o uso de bloqueios ou modificadores `nonReentrant` fornecidos por bibliotecas padrão como **OpenZeppelin**. Este modificador define uma variável booleana de bloqueio ao entrar na função e a libera ao sair. Se uma chamada recursiva para a mesma função for detectada antes de ser concluída, a transação será revertida automaticamente, garantindo a imutabilidade lógica.