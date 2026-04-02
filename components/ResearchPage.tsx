import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Compass, FileText } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { ResearchItem, ResearchStatus, researchItems } from './research/researchCatalog';

interface ResearchPageProps {
  onEnterApp: () => void;
}

const statusMeta: Record<ResearchStatus, { label: string; icon: React.ElementType; className: string }> = {
  Completed: { label: 'Completed', icon: CheckCircle2, className: 'research-status-completed' },
  Next: { label: 'Next', icon: ArrowRight, className: 'research-status-next' },
  'In Progress': { label: 'In Progress', icon: Clock3, className: 'research-status-progress' },
  Future: { label: 'Future', icon: Compass, className: 'research-status-future' },
};

const ResearchRow: React.FC<{ item: ResearchItem }> = ({ item }) => {
  const meta = statusMeta[item.status];
  const Icon = meta.icon;

  return (
    <article className="research-catalog-row">
      <div className="research-catalog-meta">
        <span className={`research-status-pill ${meta.className}`}>
          <Icon size={14} />
          {meta.label}
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
  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <header className="landing-header bylaws-header">
        <div className="landing-header-shell">
          <a href="/" className="bylaws-home-link" aria-label="Return to IOI Foundation home">
            <HeaderLogo className="nav-brand-logo" />
          </a>

          <div className="bylaws-header-actions">
            <a href="/" className="bylaws-inline-link">
              <ArrowLeft size={16} />
              Return Home
            </a>
            <button type="button" className="hero-cta bylaws-login-cta" onClick={onEnterApp}>Login</button>
          </div>
        </div>
      </header>

      <main className="bylaws-main">
        <section className="bylaws-hero landing-section">
          <div className="container">
            <p className="section-label">Research Programs</p>
            <h1 className="bylaws-title">Long-Horizon Technical Investment</h1>
            <p className="bylaws-subhead">The Foundation funds technical work that commercial entities cannot usually justify: infrastructure research measured in constitutional relevance, safety properties, and protocol longevity rather than quarter-to-quarter incentives.</p>
            <div className="bylaws-hero-actions">
              <a href="#research-catalog" className="hero-cta">View Catalog</a>
              <a href="/charter" className="hero-cta">Charter Context</a>
            </div>
          </div>
        </section>

        <section id="research-catalog" className="research-page-section landing-section">
          <div className="container">
            <div className="research-page-header">
              <div>
                <p className="section-label">Catalog</p>
                <h2 className="section-title">All Technical Research Items</h2>
                <div className="section-text">
                  <p>These programs track the current technical agenda across completed work, next commitments, in-progress systems, and future protocol research.</p>
                </div>
              </div>

              <aside className="governance-note-card research-note-card" aria-label="Research policy note">
                <p className="governance-note-label">Mandate</p>
                <p>Research is selected for strategic protocol value: cryptographic durability, deterministic execution, constitutional governance, and embodied safety.</p>
              </aside>
            </div>

            <div className="research-catalog-table">
              <div className="research-catalog-head">
                <span>Status</span>
                <span>Research Item</span>
              </div>
              <div className="research-catalog-body">
                {researchItems.map((item) => (
                  <ResearchRow key={item.slug} item={item} />
                ))}
              </div>
            </div>

            <div className="grants-ctas research-page-links">
              <a href="/governance" className="section-cta flex items-center gap-2"><FileText size={16} /> Governance Framework</a>
              <a href="/#transparency" className="section-cta flex items-center gap-2"><CheckCircle2 size={16} /> Public Record</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-mark">IOI Foundation</div>
          <nav className="footer-links">
            <a href="/">Foundation</a>
            <a href="/charter">Charter</a>
            <a href="/bylaws">Bylaws</a>
            <a href="/governance">Governance</a>
            <a href="/#transparency">Transparency</a>
            <button type="button" className="footer-link-button" onClick={onEnterApp}>Login</button>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};
