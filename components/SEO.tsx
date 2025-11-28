import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  twitterCard: string;
  author: string;
  keywords: string;
  jsonLd?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  twitterCard,
  author,
  keywords,
  jsonLd,
}) => (
  <Head>
    <link rel="icon" href="svg/favicon.svg" type="image/svg+xml" />
    <link href={canonicalUrl} rel="canonical" />
    <meta name="theme-color" content="#10101A" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#10101A" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={author} />
    <meta name="robots" content="index, follow" />
    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:alt" content={title + " portfolio preview"} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={author} />
    <meta property="og:locale" content="en_US" />
    {/* Twitter */}
    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={title + " portfolio preview"} />
    <meta name="twitter:url" content={canonicalUrl} />
    <meta name="twitter:creator" content="@francescovasturzo" />
    {/* JSON-LD Structured Data for Person */}
    {jsonLd && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )}
  </Head>
);

export default SEO;
