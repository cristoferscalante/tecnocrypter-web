import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/metadata";
import BlogClientPage from "./BlogClientPage";
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section";

const blogFaqs = [
  {
    question: "¿Con qué frecuencia publican nuevos artículos?",
    answer:
      "Publicamos nuevos artículos de seguridad cibernética y criptomonedas semanalmente. Nuestro equipo de expertos trabaja constantemente para traerte el contenido más actualizado y relevante del sector.",
  },
  {
    question: "¿Puedo sugerir temas para futuros artículos?",
    answer:
      "¡Por supuesto! Valoramos mucho las sugerencias de nuestra comunidad. Puedes enviarnos tus ideas a través de nuestro formulario de contacto o redes sociales, y nuestro equipo editorial las considerará para futuros contenidos.",
  },
  {
    question: "¿Los artículos están escritos por expertos certificados?",
    answer:
      "Sí, todos nuestros artículos son escritos y revisados por profesionales certificados en ciberseguridad, criptografía y blockchain con años de experiencia en el sector.",
  },
  {
    question: "¿Puedo compartir los artículos del blog?",
    answer:
      "Absolutamente. Todos nuestros artículos pueden ser compartidos libremente. Incluimos botones de compartir en redes sociales y agradecemos que cites la fuente cuando compartas nuestro contenido.",
  },
  {
    question: "¿Ofrecen contenido para principiantes?",
    answer:
      "Sí, tenemos contenido para todos los niveles. Categorizamos nuestros artículos por dificultad y incluimos guías paso a paso para principiantes, así como análisis técnicos avanzados para profesionales.",
  },
  {
    question: "¿Cómo puedo estar al día con las últimas publicaciones?",
    answer:
      "Puedes suscribirte a nuestro newsletter, seguirnos en redes sociales o activar las notificaciones del navegador. También ofrecemos un feed RSS para que no te pierdas ninguna actualización.",
  },
];

export const metadata: Metadata = generateBlogMetadata({
  title: "Blog de Seguridad y Criptomonedas",
  description:
    "Artículos, guías y noticias sobre seguridad cibernética, encriptación y el mundo crypto.",
  slug: "blog",
  image: "https://tecnocrypter.com/seo/blog.webp",
  keywords: [
    "seguridad cibernética",
    "encriptación",
    "criptomonedas",
    "blockchain",
    "privacidad digital",
    "tecnología",
    "hacking ético",
  ],
});

export default function BlogPage() {
  return (
    <>
      <BlogClientPage />
      <ReusableFaqSection
        title="Preguntas Frecuentes sobre el Blog"
        description="Respuestas a las preguntas más comunes sobre nuestro blog de ciberseguridad."
        faqs={blogFaqs}
      />
    </>
  );
}
