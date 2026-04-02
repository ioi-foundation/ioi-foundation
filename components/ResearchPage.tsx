import React from 'react';
import { ArrowRight, CheckCircle2, Clock3, Compass, FileText } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { ResearchItem, ResearchStatus, researchItems } from './research/researchCatalog';
import { PublicHeader } from './PublicHeader';
import { PublicBreadcrumbs } from './PublicBreadcrumbs';
import { usePublicLanguage } from './publicLanguage';
import { PUBLIC_PAGE_TRANSLATIONS } from './publicPageTranslations';
import { SeoHead } from './SeoHead';
import { buildPublicPath, getPublicSeoPayload } from '../lib/publicRoutes';

interface ResearchPageProps {
  onEnterApp: () => void;
}

const statusMeta: Record<ResearchStatus, { label: string; icon: React.ElementType; className: string }> = {
  Completed: { label: 'Completed', icon: CheckCircle2, className: 'research-status-completed' },
  Next: { label: 'Next', icon: ArrowRight, className: 'research-status-next' },
  'In Progress': { label: 'In Progress', icon: Clock3, className: 'research-status-progress' },
  Future: { label: 'Future', icon: Compass, className: 'research-status-future' },
};

const ResearchRow: React.FC<{ item: ResearchItem; statusLabel: string }> = ({ item, statusLabel }) => {
  const meta = statusMeta[item.status];
  const Icon = meta.icon;

  return (
    <article className="research-catalog-row">
      <div className="research-catalog-meta">
        <span className={`research-status-pill ${meta.className}`}>
          <Icon size={14} />
          {statusLabel}
        </span>
      </div>
      <div className="research-catalog-main">
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <span className="research-deliverable">{item.deliverables}</span>
      </div>
    </article>
  );
};

export const ResearchPage: React.FC<ResearchPageProps> = ({ onEnterApp }) => {
  const { selectedLanguage, setSelectedLanguage } = usePublicLanguage();
  const pageCopy = PUBLIC_PAGE_TRANSLATIONS[selectedLanguage.code] ?? PUBLIC_PAGE_TRANSLATIONS['en-US']!;
  const copy = pageCopy.researchPage;
  const seo = getPublicSeoPayload('research', selectedLanguage.code);
  const homePath = buildPublicPath('home', selectedLanguage.code);
  const charterPath = buildPublicPath('charter', selectedLanguage.code);
  const bylawsPath = buildPublicPath('bylaws', selectedLanguage.code);
  const governancePath = buildPublicPath('governance', selectedLanguage.code);
  const researchPath = buildPublicPath('research', selectedLanguage.code);
  const transparencyPath = buildPublicPath('home', selectedLanguage.code, '#transparency');
  const translatedItems = researchItems.map((item) => ({
    ...item,
    ...(copy.items[item.slug] ?? {}),
  }));

  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <SeoHead {...seo} />
      <PublicHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} routeKey="research" />

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
                  <a href="#research-catalog" className="hero-cta">{copy.viewCatalog}</a>
                  <a href={charterPath} className="hero-cta">{copy.charterContext}</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="research-catalog" className="research-page-section landing-section">
          <div className="container">
            <div className="research-page-header">
              <div>
                <p className="section-label">{copy.catalogLabel}</p>
                <h2 className="section-title">{copy.catalogTitle}</h2>
                <div className="section-text">
                  <p>{copy.catalogIntro}</p>
                </div>
              </div>

              <aside className="governance-note-card research-note-card" aria-label={copy.mandateLabel}>
                <p className="governance-note-label">{copy.mandateLabel}</p>
                <p>{copy.mandateBody}</p>
              </aside>
            </div>

            <div className="research-catalog-table">
              <div className="research-catalog-head">
                <span>{copy.statusColumn}</span>
                <span>{copy.itemColumn}</span>
              </div>
              <div className="research-catalog-body">
                {translatedItems.map((item) => (
                  <ResearchRow key={item.slug} item={item} statusLabel={copy.statusLabels[item.status]} />
                ))}
              </div>
            </div>

            <div className="grants-ctas research-page-links">
              <a href={governancePath} className="section-cta flex items-center gap-2"><FileText size={16} /> {copy.governanceFramework}</a>
              <a href={transparencyPath} className="section-cta flex items-center gap-2"><CheckCircle2 size={16} /> {copy.publicRecord}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <a href={homePath} className="footer-mark" aria-label="Return to IOI Foundation home">
            <HeaderLogo className="footer-mark-logo" />
          </a>
          <nav className="footer-links">
            <a href={homePath}>{pageCopy.footer.foundation}</a>
            <a href={charterPath}>{pageCopy.footer.charter}</a>
            <a href={bylawsPath}>{pageCopy.footer.bylaws}</a>
            <a href={governancePath}>{pageCopy.footer.governance}</a>
            <a href={researchPath}>{pageCopy.footer.research}</a>
            <a href={transparencyPath}>{pageCopy.footer.transparency}</a>
            <button type="button" className="footer-link-button" onClick={onEnterApp}>{pageCopy.footer.login}</button>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} {pageCopy.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
