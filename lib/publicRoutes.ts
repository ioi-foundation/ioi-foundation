import {
  PUBLIC_DEFAULT_LOCALE,
  PUBLIC_LOCALES,
  PUBLIC_ROUTES,
  PUBLIC_SITE_NAME,
  PUBLIC_SITE_URL,
} from '../seo/publicSiteConfig.js';

export type SupportedLanguageCode = keyof typeof PUBLIC_LOCALES;

export type PublicRouteKey = keyof typeof PUBLIC_ROUTES;

const ROUTE_PATH_TO_KEY = Object.entries(PUBLIC_ROUTES).reduce<Record<string, PublicRouteKey>>((accumulator, [key, value]) => {
  accumulator[value.path] = key as PublicRouteKey;
  return accumulator;
}, {});

const LOCALE_BY_SEGMENT = Object.entries(PUBLIC_LOCALES).reduce<Record<string, SupportedLanguageCode>>((accumulator, [localeCode, value]) => {
  if (value.segment) {
    accumulator[value.segment] = localeCode as SupportedLanguageCode;
  }
  return accumulator;
}, {});

export const normalizePathname = (pathname: string) => {
  const basePath = pathname.split('#')[0]?.split('?')[0] ?? '/';
  const normalized = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') || '/' : normalized;
};

export const getLocaleSegment = (localeCode: SupportedLanguageCode) => {
  return PUBLIC_LOCALES[localeCode]?.segment ?? PUBLIC_LOCALES[PUBLIC_DEFAULT_LOCALE].segment;
};

export const getPublicRouteMatch = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname);
  const segments = normalizedPathname.split('/').filter(Boolean);
  const localeCode = LOCALE_BY_SEGMENT[segments[0] ?? ''] ?? (PUBLIC_DEFAULT_LOCALE as SupportedLanguageCode);
  const isPrefixedLocale = Boolean(LOCALE_BY_SEGMENT[segments[0] ?? '']);
  const routeSegments = isPrefixedLocale ? segments.slice(1) : segments;
  const routePath = routeSegments.length ? `/${routeSegments.join('/')}` : '/';
  const routeKey = ROUTE_PATH_TO_KEY[routePath] ?? null;

  return {
    localeCode,
    isPrefixedLocale,
    routePath,
    routeKey,
    isKnownRoute: routeKey !== null,
    normalizedPathname,
  };
};

export const buildPublicPath = (
  routeKey: PublicRouteKey,
  localeCode: SupportedLanguageCode = PUBLIC_DEFAULT_LOCALE as SupportedLanguageCode,
  hash?: string,
) => {
  const localeSegment = getLocaleSegment(localeCode);
  const routePath = PUBLIC_ROUTES[routeKey].path;
  const pathname = localeSegment ? (routePath === '/' ? `/${localeSegment}` : `/${localeSegment}${routePath}`) : routePath;
  const normalizedPath = pathname || '/';
  if (!hash) return normalizedPath;
  return `${normalizedPath}${hash.startsWith('#') ? hash : `#${hash}`}`;
};

export const buildPublicUrl = (
  routeKey: PublicRouteKey,
  localeCode: SupportedLanguageCode = PUBLIC_DEFAULT_LOCALE as SupportedLanguageCode,
  hash?: string,
) => `${PUBLIC_SITE_URL}${buildPublicPath(routeKey, localeCode, hash)}`;

export const getAlternatePublicUrls = (routeKey: PublicRouteKey) => {
  return Object.keys(PUBLIC_LOCALES).map((localeCode) => ({
    localeCode: localeCode as SupportedLanguageCode,
    hrefLang: PUBLIC_LOCALES[localeCode as SupportedLanguageCode].hrefLang,
    url: buildPublicUrl(routeKey, localeCode as SupportedLanguageCode),
  }));
};

export const getPublicPageTitle = (routeKey: PublicRouteKey, localeCode: SupportedLanguageCode) => {
  const route = PUBLIC_ROUTES[routeKey];
  return route.title[localeCode] ?? route.title[PUBLIC_DEFAULT_LOCALE];
};

export const getPublicPageDescription = (routeKey: PublicRouteKey, localeCode: SupportedLanguageCode) => {
  const route = PUBLIC_ROUTES[routeKey];
  return route.description[localeCode] ?? route.description[PUBLIC_DEFAULT_LOCALE];
};

export const getPublicPageName = (routeKey: PublicRouteKey, localeCode: SupportedLanguageCode) => {
  const route = PUBLIC_ROUTES[routeKey];
  return route.name[localeCode] ?? route.name[PUBLIC_DEFAULT_LOCALE];
};

export const getPublicSeoPayload = (routeKey: PublicRouteKey, localeCode: SupportedLanguageCode) => {
  const route = PUBLIC_ROUTES[routeKey];
  const locale = PUBLIC_LOCALES[localeCode];
  const canonical = buildPublicUrl(routeKey, localeCode);

  const breadcrumbItems =
    routeKey === 'home'
      ? [
          {
            name: getPublicPageName('home', localeCode),
            item: canonical,
          },
        ]
      : [
          {
            name: getPublicPageName('home', localeCode),
            item: buildPublicUrl('home', localeCode),
          },
          {
            name: getPublicPageName(routeKey, localeCode),
            item: canonical,
          },
        ];

  const baseStructuredData = [
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
      name: getPublicPageName(routeKey, localeCode),
      headline: getPublicPageTitle(routeKey, localeCode),
      description: getPublicPageDescription(routeKey, localeCode),
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
    baseStructuredData.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: PUBLIC_SITE_NAME,
      url: PUBLIC_SITE_URL,
      inLanguage: locale.htmlLang,
    });
  }

  if (routeKey === 'bylaws') {
    baseStructuredData.push({
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: getPublicPageName(routeKey, localeCode),
      url: canonical,
      encodingFormat: 'application/pdf',
      inLanguage: locale.htmlLang,
    });
  }

  if (routeKey !== 'home') {
    baseStructuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  return {
    title: getPublicPageTitle(routeKey, localeCode),
    description: getPublicPageDescription(routeKey, localeCode),
    canonical,
    robots: 'index,follow,max-image-preview:large',
    ogTitle: route.socialTitle[localeCode] ?? route.socialTitle[PUBLIC_DEFAULT_LOCALE],
    ogDescription: route.socialDescription[localeCode] ?? route.socialDescription[PUBLIC_DEFAULT_LOCALE],
    ogType: route.ogType,
    ogImage: `${PUBLIC_SITE_URL}/og-image.svg`,
    siteName: PUBLIC_SITE_NAME,
    locale: locale.ogLocale,
    htmlLang: locale.htmlLang,
    alternates: getAlternatePublicUrls(routeKey),
    structuredData: baseStructuredData,
  };
};
