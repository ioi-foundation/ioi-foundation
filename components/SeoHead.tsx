import { useEffect } from 'react';

interface AlternateLink {
  hrefLang: string;
  url: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  robots: string;
  canonical: string;
  htmlLang: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  siteName: string;
  locale: string;
  alternates?: AlternateLink[];
  structuredData?: object[];
}

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
};

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  robots,
  canonical,
  htmlLang,
  ogTitle,
  ogDescription,
  ogType,
  ogImage,
  siteName,
  locale,
  alternates = [],
  structuredData = [],
}) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = htmlLang;

    ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
    ensureMetaTag('meta[name="robots"]', { name: 'robots', content: robots });
    ensureMetaTag('meta[name="theme-color"]', { name: 'theme-color', content: '#0a0a0b' });

    ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: ogTitle });
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: ogDescription });
    ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: ogType });
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    ensureMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: locale });

    ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: ogTitle });
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: ogDescription });
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });

    ensureLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonical });

    document
      .head
      .querySelectorAll('link[rel="alternate"][data-seo-managed="true"], meta[property="og:locale:alternate"][data-seo-managed="true"], script[type="application/ld+json"][data-seo-managed="true"]')
      .forEach((node) => node.remove());

    alternates.forEach((alternate) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternate.hrefLang;
      link.href = alternate.url;
      link.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(link);

      if (alternate.hrefLang !== htmlLang) {
        const ogLocaleAlternate = document.createElement('meta');
        ogLocaleAlternate.setAttribute('property', 'og:locale:alternate');
        ogLocaleAlternate.setAttribute('content', alternate.hrefLang.replace('-', '_'));
        ogLocaleAlternate.setAttribute('data-seo-managed', 'true');
        document.head.appendChild(ogLocaleAlternate);
      }
    });

    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = alternates.find((alternate) => alternate.hrefLang === 'en-US')?.url ?? canonical;
    xDefaultLink.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(xDefaultLink);

    structuredData.forEach((entry) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(entry);
      script.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(script);
    });
  }, [
    alternates,
    canonical,
    description,
    htmlLang,
    locale,
    ogDescription,
    ogImage,
    ogTitle,
    ogType,
    robots,
    siteName,
    structuredData,
    title,
  ]);

  return null;
};
