import React from 'react';
import { ArrowLeft, Shield, FileText, Calendar } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';

interface GovernancePageProps {
  onEnterApp: () => void;
}

export const GovernancePage: React.FC<GovernancePageProps> = ({ onEnterApp }) => {
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
            <p className="section-label">Governance Framework</p>
            <h1 className="bylaws-title">Constitutional Protocol Stewardship</h1>
            <p className="bylaws-subhead">Protocol governance requires structures that outlast any single generation of stakeholders. The Foundation separates operational decisions from constitutional constraints so the system can evolve without becoming illegible or unsafe.</p>
            <div className="bylaws-hero-actions">
              <a href="#governance-process" className="hero-cta">Review Process</a>
              <a href="/charter" className="hero-cta">View the Charter</a>
            </div>
          </div>
        </section>

        <section className="governance-page-section landing-section">
          <div className="container">
            <div className="governance-page-grid">
              <div>
                <p className="section-label">Governance</p>
                <h2 className="section-title">Operational governance may adapt. Constitutional constraints may not.</h2>
                <div className="section-text">
                  <p>The Foundation maintains separation between operational decisions and constitutional amendments, ensuring stability without stagnation.</p>
                  <p>Governance is not merely a voting surface. It is the procedural layer that determines how proposals are reviewed, what safety gates must be satisfied before activation, and how final decisions are recorded for the public record.</p>
                </div>
              </div>

              <aside className="governance-note-card" aria-label="Governance boundary">
                <p className="governance-note-label">Constitutional boundary</p>
                <p>The governance layer may optimize execution, scheduling, economic thresholds, and operational parameters. It may not weaken bounded Authority, bypass the Agency Firewall, or authorize unconstitutional state transitions.</p>
              </aside>
            </div>

            <div id="governance-process" className="process-flow governance-page-flow">
              <h4>Governance Process</h4>
              <ol className="process-steps">
                <li><span className="step-name">Proposal</span><span className="step-desc">IOI Improvement Proposal (IIP) submitted publicly</span></li>
                <li><span className="step-name">Review</span><span className="step-desc">Technical Council + public comment window</span></li>
                <li><span className="step-name">Safety</span><span className="step-desc">Formal security review requirements</span></li>
                <li><span className="step-name">Ratification</span><span className="step-desc">Threshold rule with defined quorum</span></li>
                <li><span className="step-name">Activation</span><span className="step-desc">Scheduled, versioned, reproducible releases</span></li>
                <li><span className="step-name">Record</span><span className="step-desc">Final decision + rationale published</span></li>
              </ol>
            </div>

            <div className="grants-ctas governance-page-links">
              <a href="/bylaws" className="section-cta flex items-center gap-2"><FileText size={16} /> Corporate Bylaws</a>
              <a href="/#transparency" className="section-cta flex items-center gap-2"><Calendar size={16} /> Public Record</a>
              <a href="/charter#charter-governance-and-hhai-transition" className="section-cta flex items-center gap-2"><Shield size={16} /> Constitutional Limits</a>
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
            <a href="/research">Research</a>
            <a href="/#transparency">Transparency</a>
            <button type="button" className="footer-link-button" onClick={onEnterApp}>Login</button>
          </nav>
          <p className="footer-copyright">{new Date().getFullYear()} IOI Foundation. Protocol stewardship for the long term.</p>
        </div>
      </footer>
    </div>
  );
};
