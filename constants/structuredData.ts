import { projects } from "./projects";
import { siteConfig } from "./siteConfig";

export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
        url: siteConfig.url,
        image: {
          "@type": "ImageObject",
          url: siteConfig.ogImage,
        },
        sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
        jobTitle: "Product Engineer & Designer",
        worksFor: {
          "@type": "Organization",
          name: "Independent",
        },
        description: siteConfig.description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${siteConfig.url}/#person`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: siteConfig.ogImage,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#projects`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.description,
            creator: {
              "@id": `${siteConfig.url}/#person`,
            },
            keywords: project.techStack.join(", "),
          },
        })),
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        mainEntity: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };
}
