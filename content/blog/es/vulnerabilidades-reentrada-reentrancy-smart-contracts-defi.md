---

title: "La anatomía de un Hack en DeFi: Cómo las vulnerabilidades de reentrada (Reentrancy) drenan millones de Smart Contracts"
excerpt: "El exploit de reentrada es uno de los bugs más devastadores en Solidity, permitiendo a contratos maliciosos retirar fondos repetidamente antes de actualizar los balances."
date: "2026-06-20"
author: "V1TR0"
category: "criptomonedas"
tags: ["Reentrancy", "Solidity", "smart contracts", "DeFi", "DAO Hack", "seguridad blockchain"]
featured: true
image: "/blogs/vulnerabilidades-reentrada-reentrancy-smart-contracts-defi.png"
faqs:
  - question: "¿Qué es una vulnerabilidad de reentrada o Reentrancy en Solidity?"
    answer: "Es un fallo de seguridad que ocurre cuando un contrato inteligente realiza una llamada externa a un contrato no confiable para transferir fondos antes de actualizar su estado interno (como el balance del usuario)."
  - question: "¿Cómo se ejecutó el famoso ataque de The DAO en 2016 con este bug?"
    answer: "El atacante creó un contrato con una función callback que volvía a llamar repetidamente a la función de retiro del contrato de The DAO. Esto permitió retirar éter una y otra vez antes de que el contrato restara el saldo de su cuenta."
  - question: "¿Cuáles son las formas de mitigar los ataques de reentrada?"
    answer: "Implementar el patrón de diseño Checks-Effects-Interactions (actualizar estados antes de transferir) y utilizar modificadores de exclusión mutua como ReentrancyGuard de OpenZeppelin."

---

# La anatomía de un Hack en DeFi: Cómo las vulnerabilidades de reentrada (Reentrancy) drenan millones de Smart Contracts

En el ecosistema financiero descentralizado (DeFi), el código de los contratos inteligentes es ley. Si un contrato inteligente tiene una pequeña fisura lógica, los atacantes pueden drenar millones de dólares de forma irreversible en minutos. El ejemplo más histórico y destructivo de esto es la vulnerabilidad de **reentrada** o *Reentrancy*.

Esta vulnerabilidad causó el colapso del fondo de inversión **The DAO** en 2016, forzando una bifurcación dura (hard fork) en la red Ethereum que dio origen a Ethereum (ETH) y Ethereum Classic (ETC).

### El flujo de ejecución en la EVM

En la máquina virtual de Ethereum (EVM), cuando un contrato inteligente envía fondos (Ether) a otra dirección que resulta ser un contrato inteligente, el contrato receptor puede ejecutar código automáticamente a través de funciones especiales llamadas `fallback` o `receive`.

El problema de reentrada ocurre cuando el contrato emisor transfiere los fondos *antes* de actualizar el balance de la cuenta del usuario en su base de datos interna.

El ataque se desarrolla típicamente de la siguiente manera:
1.  **Llamada al retiro:** Un contrato malicioso solicita retirar su balance depositado en un contrato inteligente de préstamos o inversiones.
2.  **Transferencia de fondos:** El contrato víctima lee el saldo del atacante, ve que tiene fondos y le envía el dinero mediante una llamada externa (`call`).
3.  **Interrupción maliciosa:** Al recibir los fondos, el contrato del atacante activa su función `fallback`. En lugar de dar por terminada la transacción, este código malicioso vuelve a llamar a la función de retiro del contrato víctima.
4.  **Bucle de drenaje:** Dado que la transacción anterior aún no ha terminado de ejecutarse, el contrato víctima todavía no ha llegado a la línea de código donde resta el balance del atacante. El contrato ve que el atacante sigue teniendo el balance intacto y vuelve a enviarle fondos, repitiendo el proceso en un bucle infinito hasta que el contrato víctima se queda sin reservas o la pila de llamadas se satura.

### El patrón Checks-Effects-Interactions

La defensa definitiva contra los ataques de reentrada reside en aplicar un orden estricto en la lógica de las funciones conocido como el patrón de diseño **Checks-Effects-Interactions** (Comprobaciones-Efectos-Interacciones):

1.  **Checks (Comprobaciones):** Verificar todas las condiciones requeridas (ej. `require(balance >= withdrawAmount)`).
2.  **Effects (Efectos):** Modificar todos los estados y variables internas del contrato *antes* de realizar operaciones externas (ej. restar el balance del usuario: `balances[msg.sender] -= withdrawAmount`).
3.  **Interactions (Interacciones):** Realizar las llamadas externas a otras cuentas o transferencias de fondos al final (ej. `payable(msg.sender).call{value: withdrawAmount}("")`).

Siguiendo este patrón, si el atacante intenta reentrar a la función de retiro en la fase de interacción, el contrato víctima leerá su balance actualizado (que ya es cero tras la fase de efectos) e inmediatamente rechazará la nueva solicitud.

### Modificadores de exclusión mutua

Otra capa de defensa fundamental es el uso de bloqueos o modificadores `nonReentrant` proporcionados por librerías estándar como **OpenZeppelin**. Este modificador establece una variable booleana de bloqueo al entrar a la función y la libera al salir. Si se detecta una llamada recursiva a la misma función antes de que termine, la transacción revierte de forma automática, garantizando la inmutabilidad lógica.
