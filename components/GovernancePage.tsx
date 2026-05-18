import React from 'react';
import { Shield, FileText, Calendar } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { PublicHeader } from './PublicHeader';
import { PublicFooterLinks } from './PublicFooterLinks';
import { PublicBreadcrumbs } from './PublicBreadcrumbs';
import { usePublicLanguage } from './publicLanguage';
import { PUBLIC_PAGE_TRANSLATIONS } from './publicPageTranslations';
import { SeoHead } from './SeoHead';
import { buildPublicPath, getPublicSeoPayload } from '../lib/publicRoutes';

interface GovernancePageProps {
  onEnterApp: () => void;
}

export const GovernancePage: React.FC<GovernancePageProps> = ({ onEnterApp }) => {
  const { selectedLanguage, setSelectedLanguage } = usePublicLanguage();
  const pageCopy = PUBLIC_PAGE_TRANSLATIONS[selectedLanguage.code] ?? PUBLIC_PAGE_TRANSLATIONS['en-US']!;
  const copy = pageCopy.governancePage;
  const seo = getPublicSeoPayload('governance', selectedLanguage.code);
  const homePath = buildPublicPath('home', selectedLanguage.code);
  const charterPath = buildPublicPath('charter', selectedLanguage.code);
  const bylawsPath = buildPublicPath('bylaws', selectedLanguage.code);
  const transparencyPath = buildPublicPath('home', selectedLanguage.code, '#transparency');

  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <SeoHead {...seo} />
      <PublicHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} routeKey="governance" onEnterApp={onEnterApp} />

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
                  <a href="#governance-process" className="hero-cta">{copy.reviewProcess}</a>
                  <a href={charterPath} className="hero-cta">{copy.viewCharter}</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="governance-page-section landing-section">
          <div className="container">
            <div className="governance-page-grid">
              <div>
                <p className="section-label">{copy.overviewLabel}</p>
                <h2 className="section-title">{copy.overviewTitle}</h2>
                <div className="section-text">
                  {copy.overviewParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="governance-note-card" aria-label={copy.noteLabel}>
                <p className="governance-note-label">{copy.noteLabel}</p>
                <p>{copy.noteBody}</p>
              </aside>
            </div>

            <div id="governance-process" className="process-flow governance-page-flow">
              <h4>{copy.processTitle}</h4>
              <ol className="process-steps">
                {copy.steps.map((step) => (
                  <li key={step.name}>
                    <span className="step-name">{step.name}</span>
                    <span className="step-desc">{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grants-ctas governance-page-links">
              <a href={bylawsPath} className="section-cta flex items-center gap-2"><FileText size={16} /> {copy.bylawsLink}</a>
              <a href={transparencyPath} className="section-cta flex items-center gap-2"><Calendar size={16} /> {copy.publicRecordLink}</a>
              <a href={buildPublicPath('charter', selectedLanguage.code, '#charter-governance-and-hhai-transition')} className="section-cta flex items-center gap-2"><Shield size={16} /> {copy.constitutionalLimitsLink}</a>
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
