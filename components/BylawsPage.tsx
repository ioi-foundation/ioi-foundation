import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import bylawsPdfUrl from '../assets/ioi-labs-inc-bylaws.pdf';
import { PublicHeader } from './PublicHeader';
import { PublicFooterLinks } from './PublicFooterLinks';
import { PublicBreadcrumbs } from './PublicBreadcrumbs';
import { usePublicLanguage } from './publicLanguage';
import { PUBLIC_PAGE_TRANSLATIONS } from './publicPageTranslations';
import { SeoHead } from './SeoHead';
import { buildPublicPath, getPublicSeoPayload } from '../lib/publicRoutes';

interface BylawsPageProps {
  onEnterApp: () => void;
}

export const BylawsPage: React.FC<BylawsPageProps> = ({ onEnterApp }) => {
  const { selectedLanguage, setSelectedLanguage } = usePublicLanguage();
  const pageCopy = PUBLIC_PAGE_TRANSLATIONS[selectedLanguage.code] ?? PUBLIC_PAGE_TRANSLATIONS['en-US']!;
  const copy = pageCopy.bylawsPage;
  const seo = getPublicSeoPayload('bylaws', selectedLanguage.code);
  const homePath = buildPublicPath('home', selectedLanguage.code);
  const charterPath = buildPublicPath('charter', selectedLanguage.code);

  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <SeoHead {...seo} />
      <PublicHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} routeKey="bylaws" onEnterApp={onEnterApp} />

      <main className="bylaws-main">
        <section className="bylaws-hero landing-section">
          <div className="container">
            <div className="bylaws-hero-grid">
              <div className="bylaws-hero-main">
                <PublicBreadcrumbs homeLabel={pageCopy.footer.foundation} currentLabel={copy.heroLabel} homeHref={homePath} />
                <h1 className="bylaws-title">{copy.heroTitle}</h1>
                <p className="bylaws-subhead">{copy.heroSubhead}</p>
              </div>

              <aside className="bylaws-hero-rail">
                <div className="bylaws-hero-actions">
                  <a href="#bylaws-document" className="hero-cta">{copy.viewDocument}</a>
                  <a href={bylawsPdfUrl} className="hero-cta" target="_blank" rel="noreferrer">{copy.openPdf}</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="corporate-bylaws-section landing-section">
          <div className="container">
            <div className="bylaws-overview-grid">
              <div>
                <p className="section-label">{copy.overviewLabel}</p>
                <h2 className="section-title">{copy.overviewTitle}</h2>
                <div className="section-text">
                  {copy.overviewParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="governance-note-card bylaws-document-card" aria-label={copy.sourceLabel}>
                <p className="governance-note-label">{copy.sourceLabel}</p>
                <p>{copy.sourceBody}</p>
                <div className="bylaws-document-actions">
                  <a href={bylawsPdfUrl} className="bylaws-document-link" target="_blank" rel="noreferrer">
                    <ExternalLink size={15} />
                    {copy.openNewTab}
                  </a>
                  <a href={bylawsPdfUrl} className="bylaws-document-link" download>
                    <Download size={15} />
                    {copy.downloadPdf}
                  </a>
                  <a href={charterPath} className="bylaws-document-link">
                    <FileText size={15} />
                    {copy.readCharter}
                  </a>
                </div>
              </aside>
            </div>

            <div className="bylaws-meta-strip" aria-label="Bylaws metadata">
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">{copy.entityLabel}</span>
                <span className="bylaws-meta-value">{copy.entityValue}</span>
              </div>
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">{copy.jurisdictionLabel}</span>
                <span className="bylaws-meta-value">{copy.jurisdictionValue}</span>
              </div>
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">{copy.formatLabel}</span>
                <span className="bylaws-meta-value">{copy.formatValue}</span>
              </div>
            </div>

            <div className="bylaws-shell">
              <nav className="bylaws-article-list" aria-label="Bylaws article guide">
                <p className="charter-index-label">{copy.readingGuideLabel}</p>
                {copy.articles.map((article) => (
                  <div key={article.code} className="bylaws-article-item">
                    <span className="bylaws-article-code">{article.code}</span>
                    <span className="bylaws-article-title">{article.title}</span>
                  </div>
                ))}
              </nav>

              <div id="bylaws-document" className="bylaws-document-viewer">
                <div className="bylaws-document-toolbar">
                  <div>
                    <p className="charter-document-kicker">{copy.toolbarKicker}</p>
                    <p className="bylaws-document-summary">{copy.toolbarSummary}</p>
                  </div>

                  <div className="bylaws-document-actions">
                    <a href={bylawsPdfUrl} className="bylaws-document-link" target="_blank" rel="noreferrer">
                      <ExternalLink size={15} />
                      {copy.openPdf}
                    </a>
                    <a href={bylawsPdfUrl} className="bylaws-document-link" download>
                      <Download size={15} />
                      {copy.downloadShort}
                    </a>
                  </div>
                </div>

                <object data={bylawsPdfUrl} type="application/pdf" className="bylaws-pdf-embed" aria-label={copy.pdfAriaLabel}>
                  <div className="bylaws-pdf-fallback">
                    <p>{copy.pdfFallbackLine1}</p>
                    <p><a href={bylawsPdfUrl} target="_blank" rel="noreferrer">{copy.pdfFallbackLine2}</a></p>
                  </div>
                </object>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <a href={homePath} className="footer-mark" aria-label="Return to IOI Foundation home">
            <HeaderLogo className="footer-mark-logo" />
          </a>
          <PublicFooterLinks languageCode={selectedLanguage.code} />
          <p className="footer-copyright">{new Date().getFullYear()} {pageCopy.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
