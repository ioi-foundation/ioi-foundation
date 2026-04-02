import React from 'react';
import { ArrowLeft, Download, ExternalLink, FileText } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import bylawsPdfUrl from '../assets/ioi-labs-inc-bylaws.pdf';

interface BylawsPageProps {
  onEnterApp: () => void;
}

const BYLAWS_ARTICLES = [
  { code: 'Article I', title: 'Offices' },
  { code: 'Article II', title: 'Corporate Seal' },
  { code: 'Article III', title: "Stockholders' Meetings" },
  { code: 'Article IV', title: 'Directors' },
  { code: 'Article V', title: 'Officers' },
  { code: 'Article VI', title: 'Execution of Corporate Instruments and Voting of Securities Owned by the Corporation' },
  { code: 'Article VII', title: 'Shares of Stock' },
  { code: 'Article VIII', title: 'Other Securities of the Corporation' },
  { code: 'Article IX', title: 'Dividends' },
  { code: 'Article X', title: 'Fiscal Year' },
  { code: 'Article XI', title: 'Indemnification' },
  { code: 'Article XII', title: 'Notices' },
  { code: 'Article XIII', title: 'Amendments' },
  { code: 'Article XIV', title: 'Loans to Officers' },
  { code: 'Article XV', title: 'Miscellaneous' },
] as const;

export const BylawsPage: React.FC<BylawsPageProps> = ({ onEnterApp }) => {
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
            <p className="section-label">Corporate Bylaws</p>
            <h1 className="bylaws-title">IOI Labs, Inc. Bylaws</h1>
            <p className="bylaws-subhead">The current corporate bylaws for IOI Labs, Inc., a Delaware corporation, are published here in their operative PDF form. This page provides the complete source document, direct download access, and a reading guide to the document structure.</p>
            <div className="bylaws-hero-actions">
              <a href="#bylaws-document" className="hero-cta">View Document</a>
              <a href={bylawsPdfUrl} className="hero-cta" target="_blank" rel="noreferrer">Open PDF</a>
            </div>
          </div>
        </section>

        <section className="corporate-bylaws-section landing-section">
          <div className="container">
            <div className="bylaws-overview-grid">
              <div>
                <p className="section-label">Document Overview</p>
                <h2 className="section-title">The full corporate bylaws are preserved as the governing legal record.</h2>
                <div className="section-text">
                  <p>This document replaces the placeholder bylaws page previously used for the Foundation charter. The charter now lives separately as a public constitutional document, while this page presents the actual corporate bylaws in their original PDF form.</p>
                  <p>The attached record spans 31 pages and 15 articles covering corporate offices, stockholder and board procedure, officer roles, stock administration, indemnification, notices, amendments, and related corporate formalities.</p>
                </div>
              </div>

              <aside className="governance-note-card bylaws-document-card" aria-label="Corporate bylaws file details">
                <p className="governance-note-label">Source document</p>
                <p>The document below is the current IOI Labs, Inc. bylaws PDF supplied for publication on the Foundation site.</p>
                <div className="bylaws-document-actions">
                  <a href={bylawsPdfUrl} className="bylaws-document-link" target="_blank" rel="noreferrer">
                    <ExternalLink size={15} />
                    Open in new tab
                  </a>
                  <a href={bylawsPdfUrl} className="bylaws-document-link" download>
                    <Download size={15} />
                    Download PDF
                  </a>
                  <a href="/charter" className="bylaws-document-link">
                    <FileText size={15} />
                    Read the charter
                  </a>
                </div>
              </aside>
            </div>

            <div className="bylaws-meta-strip" aria-label="Bylaws metadata">
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">Entity</span>
                <span className="bylaws-meta-value">IOI Labs, Inc.</span>
              </div>
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">Jurisdiction</span>
                <span className="bylaws-meta-value">Delaware corporation</span>
              </div>
              <div className="bylaws-meta-item">
                <span className="bylaws-meta-label">Format</span>
                <span className="bylaws-meta-value">31-page PDF, 15 articles</span>
              </div>
            </div>

            <div className="bylaws-shell">
              <nav className="bylaws-article-list" aria-label="Bylaws article guide">
                <p className="charter-index-label">Reading Guide</p>
                {BYLAWS_ARTICLES.map((article) => (
                  <div key={article.code} className="bylaws-article-item">
                    <span className="bylaws-article-code">{article.code}</span>
                    <span className="bylaws-article-title">{article.title}</span>
                  </div>
                ))}
              </nav>

              <div id="bylaws-document" className="bylaws-document-viewer">
                <div className="bylaws-document-toolbar">
                  <div>
                    <p className="charter-document-kicker">Published corporate record</p>
                    <p className="bylaws-document-summary">BYLAWS OF IOI LABS, INC. (A DELAWARE CORPORATION)</p>
                  </div>

                  <div className="bylaws-document-actions">
                    <a href={bylawsPdfUrl} className="bylaws-document-link" target="_blank" rel="noreferrer">
                      <ExternalLink size={15} />
                      Open PDF
                    </a>
                    <a href={bylawsPdfUrl} className="bylaws-document-link" download>
                      <Download size={15} />
                      Download
                    </a>
                  </div>
                </div>

                <object data={bylawsPdfUrl} type="application/pdf" className="bylaws-pdf-embed" aria-label="IOI Labs, Inc. bylaws PDF">
                  <div className="bylaws-pdf-fallback">
                    <p>Your browser cannot display the PDF inline.</p>
                    <p><a href={bylawsPdfUrl} target="_blank" rel="noreferrer">Open the bylaws PDF in a new tab</a> or download it directly from this page.</p>
                  </div>
                </object>
              </div>
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
            <a href="/governance">Governance</a>
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
