import type { Metadata } from "next";
import { generateBlogMetadata } from "@/lib/metadata";
import BlogClientPage from "./BlogClientPage";
import { ReusableFaqSection } from "@/components/sections/reusable-faq-section";
import { FAQStructuredData, BreadcrumbStructuredData } from "@/components/seo/structured-data";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });

  return generateBlogMetadata({
    title: t("title"),
    description: t("description"),
    slug: "blog",
    locale: locale,
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
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  const blogFaqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: t("breadcrumb.home"), url: "https://tecnocrypter.com" },
          { name: t("breadcrumb.blog"), url: "https://tecnocrypter.com/blog" },
        ]}
      />
      <FAQStructuredData faqs={blogFaqs} />
      <BlogClientPage />
      <ReusableFaqSection
        title={t("faq.title")}
        description={t("faq.description")}
        faqs={blogFaqs}
      />
    </>
  );
}
