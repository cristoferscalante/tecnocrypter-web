---

title: "A armadilha do Wi-Fi público: como ataques gêmeos malignos roubam suas credenciais sem você perceber"
excerpt: "Hotspots falsos ou ‘Evil Twins’ imitam redes Wi-Fi confiáveis ​​para interceptar dados pessoais e senhas de usuários inocentes em locais públicos."
date: "2026-06-20"
author: "V1TR0"
category: "seguridad"
tags: ["Gêmeo Maligno", "Wi-Fi público", "segurança cibernética", "phishing", "criptografia", "redes"]
featured: true
image: "/blogs/ataques-evil-twin-wifi-publicas-robo-credenciales.png"
faqs:
  - question: "O que é um ataque do Evil Twin?"
    answer: "É um ataque à rede em que o cibercriminoso cria um ponto de acesso Wi-Fi falso com o mesmo nome (SSID) de uma rede conhecida e legítima, enganando os dispositivos para que se conectem a ela."
  - question: "Como os invasores interceptam dados em um Evil Twin?"
    answer: "À medida que o usuário está conectado à sua rede, todo o tráfego da Internet passa pela máquina do invasor. Se não houver criptografia ponta a ponta, ele poderá capturar senhas, mensagens e dados confidenciais."
  - question: "Como se proteger de redes Wi-Fi maliciosas?"
    answer: "Evite conectar dispositivos a redes abertas sem senha, utilize sempre uma rede virtual privada (VPN), desative a conexão automática a redes Wi-Fi e verifique os certificados de segurança HTTPS."

---

# A armadilha do Wi-Fi público: como ataques gêmeos malignos roubam suas credenciais sem você perceber

As redes Wi-Fi públicas em cafés, aeroportos e hotéis são ferramentas muito convenientes para se manter conectado fora de casa. No entanto, a sua facilidade de acesso torna-os um terreno fértil para a espionagem digital. Um dos métodos mais simples e eficazes para interceptar o tráfego de rede nesses ambientes é o ataque **Evil Twin**.

Este tipo de ataque é baseado em falsificação sem fio e engano de dispositivos automatizados.

### Como funciona um ataque do Evil Twin?

O ataque Evil Twin é normalmente executado em quatro fases críticas:

1. **Reconhecimento:** O invasor verifica o ambiente de rede sem fio pública para encontrar um ponto de acesso legítimo e ocupado, anotando seu nome de rede (SSID) e canal de transmissão.
2. **Criação do clone:** Usando hardware de rede comum e software gratuito, o invasor implanta um ponto de acesso Wi-Fi com o mesmo nome e configuração da rede legítima, muitas vezes transmitindo com uma intensidade de sinal mais alta para se tornar mais atraente.
3. **Ataque de dissociação:** O invasor envia quadros de desautenticação forçada para dispositivos conectados ao Wi-Fi real. Isso desconecta momentaneamente os usuários da rede legítima.
4. **Conexão automática:** Ao tentar se reconectar automaticamente, os dispositivos da vítima escolhem o ponto de acesso mais próximo e com sinal mais forte, que neste caso é o do invasor.

### Interceptação de dados e portais cativos

Depois que o usuário se conecta à rede Evil Twin, o invasor atua como um intermediário para todo o seu tráfego. O cibercriminoso pode redirecionar solicitações para portais de login falsos (portais de phishing cativos) que solicitam senhas de e-mail, redes sociais ou detalhes de cartões bancários.

Mesmo que o usuário visite sites protegidos por HTTPS, invasores com ferramentas sofisticadas tentam degradar a conexão (SSL Stripping) ou apresentar certificados SSL falsos para inspecionar o tráfego em texto simples.

### Medidas de proteção para o usuário

Para navegar com segurança e evitar cair em redes gêmeas maliciosas, tome os seguintes cuidados:
* **Use uma VPN robusta:** Uma rede privada virtual criptografa todo o tráfego do seu dispositivo para o servidor de destino, tornando-o indecifrável para o falso administrador de Wi-Fi.
* **Desative a conexão automática:** Configure seus dispositivos para nunca se conectarem automaticamente a redes abertas ou públicas conhecidas anteriormente.
* **Preste atenção aos avisos do navegador:** Se o seu navegador exibir um alerta de "Certificado de segurança inválido" ou "Conexão insegura" quando você entrar em um portal, desconecte-se imediatamente da rede.