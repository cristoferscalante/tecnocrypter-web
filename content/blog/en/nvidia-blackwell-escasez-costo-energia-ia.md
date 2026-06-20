---

title: "The Achilles heel of AI: The supply crisis and the colossal electricity consumption of NVIDIA Blackwell chips"
excerpt: "Delays in the production of NVIDIA's Blackwell superchips and the brutal electrical requirements of its racks threaten to put a brake on the plans of cloud hyperscalers."
date: "2026-06-18"
author: "V1TR0"
category: "noticias"
tags: ["NVIDIA", "Blackwell", "energy crisis", "shortage", "data centers", "calculation"]
featured: false
image: "/blogs/nvidia-blackwell-escasez-costo-energia-ia.png"
faqs:
  - question: "What is the reason for the delay in the supply of NVIDIA Blackwell chips?"
    answer: "To performance issues in TSMC's CoWoS-L packaging process and necessary redesigns to the internal structure of the GPU to prevent overheating."
  - question: "Why is liquid cooling essential for these new accelerators?"
    answer: "Because a single Blackwell B200 rack can consume up to 120 kilowatts of power, generating extreme heat that traditional air fans are unable to dissipate."
  - question: "How does this bottleneck impact the costs of AI startups?"
    answer: "It causes waits of up to 9 months to access GPU clusters and increases the rental rate per hour of computing in the cloud, making it more expensive to train new models."


---

# The Achilles heel of AI: The supply crisis and the colossal electricity consumption of NVIDIA Blackwell chips

The artificial intelligence industry is at risk of suffering an unforeseen slowdown. Despite the excitement around the new **NVIDIA Blackwell B200** superchips, promised as the engine that will power the training of the next frontier-scale LLMs, the reality of the supply chain and the physics of electricity are imposing severe limits.

Manufacturing problems and the enormous demand for electrical power have become the Achilles heel of cloud hyperscalers.

## Design and manufacturing issues in 3nm

Early Blackwell models suffered from failures in the advanced packaging process known as **CoWoS-L** (Chip-on-Wafer-on-Substrate with Local silicon interconnect) at TSMC. This complex network of adjacent chips interconnected at the micron level experienced performance failures and cracks due to differential thermal expansion.



```
Arquitectura Blackwell B200:
[Dos dies de GPU masivos] ➔ Unidos por interconexión ultra-rápida (10 TB/s)
         ⬇
Genera calor masivo ➔ Requiere refrigeración líquida (Direct-to-Chip)
         ⬇
Consumo de rack de 72 GPUs ➔ 120kW (Consumo promedio de 100 hogares)
```



NVIDIA was forced to redesign the GPU silicon skin to mitigate heating issues, which delayed large-scale deliveries. Companies that were hoping to deploy massive clusters in the first quarter of 2026 have had their plans postponed for several months.

## The challenge of powering data centers

In addition to the manufacturing bottleneck, data centers face the limit of the electrical grid. A single rack with the **Blackwell NVL72** architecture (which includes 72 interconnected GPUs) consumes approximately **120 kilowatts** of power. 

This figure is astronomical. To put it in scale, powering a single hall of servers equipped with these chips requires more energy than entire electrical transformation stations in residential areas have available. The need to incorporate direct-to-chip closed-loop liquid cooling is requiring data centers to restructure their pipelines and infrastructure, substantially increasing operating costs and availability of computing time.