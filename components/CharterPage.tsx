import React from 'react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { PublicHeader } from './PublicHeader';
import { PublicFooterLinks } from './PublicFooterLinks';
import { PublicBreadcrumbs } from './PublicBreadcrumbs';
import { usePublicLanguage } from './publicLanguage';
import { PUBLIC_PAGE_TRANSLATIONS } from './publicPageTranslations';
import { SeoHead } from './SeoHead';
import { buildPublicPath, getPublicSeoPayload } from '../lib/publicRoutes';

interface CharterPageProps {
  onEnterApp: () => void;
}

export const CharterPage: React.FC<CharterPageProps> = ({ onEnterApp }) => {
  const { selectedLanguage, setSelectedLanguage } = usePublicLanguage();
  const pageCopy = PUBLIC_PAGE_TRANSLATIONS[selectedLanguage.code] ?? PUBLIC_PAGE_TRANSLATIONS['en-US']!;
  const copy = pageCopy.charterPage;
  const seo = getPublicSeoPayload('charter', selectedLanguage.code);
  const homePath = buildPublicPath('home', selectedLanguage.code);
  const bylawsPath = buildPublicPath('bylaws', selectedLanguage.code);

  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <SeoHead {...seo} />
      <PublicHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} routeKey="charter" onEnterApp={onEnterApp} />

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
                  <a href="#charter-preamble" className="hero-cta">{copy.beginReading}</a>
                  <a href={bylawsPath} className="hero-cta">{copy.corporateBylaws}</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="charter-section landing-section">
          <div className="container">
            <div className="charter-header">
              <div>
                <p className="section-label">{copy.overviewLabel}</p>
                <h2 className="section-title">{copy.overviewTitle}</h2>
                <div className="section-text">
                  {copy.overviewParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="charter-immutable-note" aria-label={copy.noteLabel}>
                <p className="charter-note-label">{copy.noteLabel}</p>
                <p>{copy.noteBody}</p>
              </aside>
            </div>

            <div className="charter-shell">
              <nav className="charter-index" aria-label="Charter article index">
                <p className="charter-index-label">{copy.readingGuideLabel}</p>
                <a href="#charter-preamble" className="charter-index-link">
                  <span className="charter-index-kicker">{copy.openingLabel}</span>
                  <span className="charter-index-title">{copy.preambleTitle}</span>
                </a>
                {copy.articles.map((article) => (
                  <a key={article.id} href={`#charter-${article.id}`} className="charter-index-link">
                    <span className="charter-index-kicker">{article.label}</span>
                    <span className="charter-index-title">{article.title}</span>
                  </a>
                ))}
              </nav>

              <div className="charter-document">
                <div className="charter-document-head">
                  <p className="charter-document-kicker">{copy.documentKicker}</p>
                  <p className="charter-document-summary">{copy.documentSummary}</p>
                </div>

                <article id="charter-preamble" className="charter-preamble-block">
                  <p className="charter-article-label">{copy.preambleLabel}</p>
                  <div className="charter-rich-text">
                    {copy.preamble.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>

                {copy.articles.map((article) => (
                  <article key={article.id} id={`charter-${article.id}`} className="charter-article">
                    <div className="charter-article-head">
                      <p className="charter-article-label">{article.label}</p>
                      <div className="charter-article-titles">
                        <h3 className="charter-article-title">{article.title}</h3>
                        {article.subtitle && <p className="charter-article-subtitle">{article.subtitle}</p>}
                      </div>
                    </div>

                    {article.intro && <p className="charter-article-intro">{article.intro}</p>}

                    <div className="charter-clauses">
                      {article.clauses.map((clause) => (
                        <section key={clause.code} className="charter-clause">
                          <div className="charter-clause-code">{clause.code}</div>
                          <div className="charter-clause-copy">
                            <h4>{clause.title}</h4>
                            <p>{clause.body}</p>
                          </div>
                        </section>
                      ))}
                    </div>
                  </article>
                ))}
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
