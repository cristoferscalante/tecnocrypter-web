import Head from "next/head";

type Props = {
  title: string;
  description: string;
  slug: string;           // p.ej. "servicios"
  image?: string;         // p.ej. "https://tecnocrypter.com/og/servicios.jpg"
  keywords?: string;      // opcional
  canonicalOverride?: string;
};

export default function SeoPage({ title, description, slug, image, keywords, canonicalOverride }: Props) {
  const baseUrl = "https://tecnocrypter.com";
  const url = canonicalOverride ?? `${baseUrl}/${slug}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TecnoCrypter" />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={title} />
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Head>
  );
}