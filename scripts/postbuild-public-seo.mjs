import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PUBLIC_DEFAULT_LOCALE,
  PUBLIC_LOCALES,
  PUBLIC_ROUTE_ORDER,
  PUBLIC_ROUTES,
  PUBLIC_SITE_NAME,
  PUBLIC_SITE_URL,
} from '../seo/publicSiteConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');
const distIndexPath = path.join(distDir, 'index.html');
const assetsDir = path.join(distDir, 'assets');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildPath = (routeKey, localeCode) => {
  const localeSegment = PUBLIC_LOCALES[localeCode].segment;
  const routePath = PUBLIC_ROUTES[routeKey].path;
  if (!localeSegment) return routePath;
  return routePath === '/' ? `/${localeSegment}` : `/${localeSegment}${routePath}`;
};

const buildUrl = (routeKey, localeCode) => `${PUBLIC_SITE_URL}${buildPath(routeKey, localeCode)}`;

const getAlternates = (routeKey) =>
  Object.keys(PUBLIC_LOCALES).map((localeCode) => ({
    localeCode,
    hrefLang: PUBLIC_LOCALES[localeCode].hrefLang,
    url: buildUrl(routeKey, localeCode),
  }));

const getStructuredData = (routeKey, localeCode, pdfUrl) => {
  const route = PUBLIC_ROUTES[routeKey];
  const locale = PUBLIC_LOCALES[localeCode];
  const canonical = buildUrl(routeKey, localeCode);
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: PUBLIC_SITE_NAME,
      url: PUBLIC_SITE_URL,
      logo: `${PUBLIC_SITE_URL}/og-image.svg`,
    },
    {
      '@context': 'https://schema.org',
      '@type': route.schemaType,
      name: route.name[localeCode] ?? route.name[PUBLIC_DEFAULT_LOCALE],
      headline: route.title[localeCode] ?? route.title[PUBLIC_DEFAULT_LOCALE],
      description: route.description[localeCode] ?? route.description[PUBLIC_DEFAULT_LOCALE],
      url: canonical,
      inLanguage: locale.htmlLang,
      isPartOf: {
        '@type': 'WebSite',
        name: PUBLIC_SITE_NAME,
        url: PUBLIC_SITE_URL,
      },
    },
  ];

  if (routeKey === 'home') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: PUBLIC_SITE_NAME,
      url: PUBLIC_SITE_URL,
      inLanguage: locale.htmlLang,
    });
  }

  if (routeKey !== 'home') {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: PUBLIC_ROUTES.home.name[localeCode] ?? PUBLIC_ROUTES.home.name[PUBLIC_DEFAULT_LOCALE],
          item: buildUrl('home', localeCode),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: route.name[localeCode] ?? route.name[PUBLIC_DEFAULT_LOCALE],
          item: canonical,
        },
      ],
    });
  }

  if (routeKey === 'bylaws' && pdfUrl) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: route.name[localeCode] ?? route.name[PUBLIC_DEFAULT_LOCALE],
      url: canonical,
      contentUrl: pdfUrl,
      encodingFormat: 'application/pdf',
      inLanguage: locale.htmlLang,
    });
  }

  return data;
};

const buildMetaBlock = (routeKey, localeCode, pdfUrl) => {
  const route = PUBLIC_ROUTES[routeKey];
  const locale = PUBLIC_LOCALES[localeCode];
  const canonical = buildUrl(routeKey, localeCode);
  const title = route.title[localeCode] ?? route.title[PUBLIC_DEFAULT_LOCALE];
  const description = route.description[localeCode] ?? route.description[PUBLIC_DEFAULT_LOCALE];
  const ogTitle = route.socialTitle[localeCode] ?? route.socialTitle[PUBLIC_DEFAULT_LOCALE];
  const ogDescription = route.socialDescription[localeCode] ?? route.socialDescription[PUBLIC_DEFAULT_LOCALE];
  const alternates = getAlternates(routeKey);
  const structuredData = getStructuredData(routeKey, localeCode, pdfUrl);

  const alternateLinks = alternates
    .map((alternate) => `<link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.url}" />`)
    .join('\n    ');

  const alternateLocales = alternates
    .filter((alternate) => alternate.hrefLang !== locale.htmlLang)
    .map((alternate) => `<meta property="og:locale:alternate" content="${alternate.hrefLang.replace('-', '_')}" />`)
    .join('\n    ');

  const jsonLd = structuredData
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join('\n    ');

  return `<!-- PUBLIC_META_START -->
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="theme-color" content="#0a0a0b" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/site.webmanifest" />
    ${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${buildUrl(routeKey, PUBLIC_DEFAULT_LOCALE)}" />
    <meta property="og:site_name" content="${PUBLIC_SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDescription)}" />
    <meta property="og:type" content="${route.ogType}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${PUBLIC_SITE_URL}/og-image.svg" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:alt" content="${PUBLIC_SITE_NAME}" />
    <meta property="og:locale" content="${locale.ogLocale}" />
    ${alternateLocales}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
    <meta name="twitter:image" content="${PUBLIC_SITE_URL}/og-image.svg" />
    ${jsonLd}
    <!-- PUBLIC_META_END -->`;
};

const buildNoscriptBlock = (routeKey, localeCode) => {
  const route = PUBLIC_ROUTES[routeKey];
  const homeName = PUBLIC_ROUTES.home.name[localeCode] ?? PUBLIC_ROUTES.home.name[PUBLIC_DEFAULT_LOCALE];
  const charterName = PUBLIC_ROUTES.charter.name[localeCode] ?? PUBLIC_ROUTES.charter.name[PUBLIC_DEFAULT_LOCALE];
  const governanceName = PUBLIC_ROUTES.governance.name[localeCode] ?? PUBLIC_ROUTES.governance.name[PUBLIC_DEFAULT_LOCALE];
  const researchName = PUBLIC_ROUTES.research.name[localeCode] ?? PUBLIC_ROUTES.research.name[PUBLIC_DEFAULT_LOCALE];
  const heading = route.noscriptHeading[localeCode] ?? route.noscriptHeading[PUBLIC_DEFAULT_LOCALE];
  const body = route.noscriptBody[localeCode] ?? route.noscriptBody[PUBLIC_DEFAULT_LOCALE];

  return `<!-- PUBLIC_NOSCRIPT -->
    <noscript>
      <section style="padding:2rem;font-family:IBM Plex Sans,Arial,sans-serif;background:#0a0a0b;color:#f4f4f2;min-height:100vh;">
        <p style="font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;color:#94a5c6;margin:0 0 1rem;">${escapeHtml(homeName)}</p>
        <h1 style="font-family:Cormorant Garamond,serif;font-size:3rem;line-height:1.05;font-weight:500;margin:0 0 1rem;">${escapeHtml(heading)}</h1>
        <p style="max-width:44rem;color:#d6dbe4;line-height:1.75;margin:0 0 1.5rem;">${escapeHtml(body)}</p>
        <nav style="display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="${buildPath('home', localeCode)}" style="color:#f4f4f2;">${escapeHtml(homeName)}</a>
          <a href="${buildPath('charter', localeCode)}" style="color:#f4f4f2;">${escapeHtml(charterName)}</a>
          <a href="${buildPath('governance', localeCode)}" style="color:#f4f4f2;">${escapeHtml(governanceName)}</a>
          <a href="${buildPath('research', localeCode)}" style="color:#f4f4f2;">${escapeHtml(researchName)}</a>
        </nav>
      </section>
    </noscript>`;
};

const injectRouteHtml = (template, routeKey, localeCode, pdfUrl) => {
  const locale = PUBLIC_LOCALES[localeCode];
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${locale.htmlLang}">`)
    .replace(/<!-- PUBLIC_META_START -->[\s\S]*?<!-- PUBLIC_META_END -->/, buildMetaBlock(routeKey, localeCode, pdfUrl))
    .replace(/<!-- PUBLIC_NOSCRIPT -->/, buildNoscriptBlock(routeKey, localeCode));
};

const ensureDirectory = async (targetPath) => {
  await fs.mkdir(targetPath, { recursive: true });
};

const writeRouteHtml = async (routeKey, localeCode, template, pdfUrl) => {
  const routePath = buildPath(routeKey, localeCode);
  const html = injectRouteHtml(template, routeKey, localeCode, pdfUrl);

  if (routePath === '/') {
    await fs.writeFile(distIndexPath, html, 'utf8');
    return;
  }

  const targetDir = path.join(distDir, routePath.slice(1));
  await ensureDirectory(targetDir);
  await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
};

const writeSitemap = async () => {
  const urls = PUBLIC_ROUTE_ORDER.flatMap((routeKey) =>
    Object.keys(PUBLIC_LOCALES).map((localeCode) => {
      const route = PUBLIC_ROUTES[routeKey];
      const url = buildUrl(routeKey, localeCode);
      const alternates = getAlternates(routeKey)
        .map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.hrefLang}" href="${alternate.url}" />`)
        .join('\n');

      return `  <url>
    <loc>${url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${alternates}
  </url>`;
    }),
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
};

const writeRobots = async () => {
  const robots = `User-agent: *
Allow: /

Sitemap: ${PUBLIC_SITE_URL}/sitemap.xml
`;

  await fs.writeFile(path.join(distDir, 'robots.txt'), robots, 'utf8');
};

const main = async () => {
  const template = await fs.readFile(distIndexPath, 'utf8');
  const assetEntries = await fs.readdir(assetsDir);
  const bylawsPdf = assetEntries.find((entry) => entry.startsWith('ioi-labs-inc-bylaws') && entry.endsWith('.pdf'));
  const bylawsPdfUrl = bylawsPdf ? `${PUBLIC_SITE_URL}/assets/${bylawsPdf}` : null;

  for (const localeCode of Object.keys(PUBLIC_LOCALES)) {
    for (const routeKey of PUBLIC_ROUTE_ORDER) {
      await writeRouteHtml(routeKey, localeCode, template, bylawsPdfUrl);
    }
  }

  await writeSitemap();
  await writeRobots();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
