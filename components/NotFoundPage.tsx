import React from 'react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { PublicHeader } from './PublicHeader';
import { PublicFooterLinks } from './PublicFooterLinks';
import { SeoHead } from './SeoHead';
import { usePublicLanguage } from './publicLanguage';
import { buildPublicPath } from '../lib/publicRoutes';

const NOT_FOUND_COPY = {
  'en-US': {
    foundation: 'Foundation',
    title: 'Page Not Found',
    body: 'The requested public page could not be found. Return to the Foundation home page or continue to one of the published public documents.',
    home: 'Return Home',
    charter: 'Read the Charter',
    login: 'Login',
  },
  'es-ES': {
    foundation: 'Fundación',
    title: 'Página no encontrada',
    body: 'No se pudo encontrar la página pública solicitada. Vuelve al inicio de la Fundación o continúa con uno de los documentos públicos publicados.',
    home: 'Volver al inicio',
    charter: 'Leer la Carta',
    login: 'Acceso',
  },
  'fr-FR': {
    foundation: 'Fondation',
    title: 'Page introuvable',
    body: 'La page publique demandée est introuvable. Revenez à l’accueil de la Fondation ou consultez l’un des documents publics publiés.',
    home: 'Retour à l’accueil',
    charter: 'Lire la Charte',
    login: 'Connexion',
  },
  'de-DE': {
    foundation: 'Stiftung',
    title: 'Seite nicht gefunden',
    body: 'Die angeforderte öffentliche Seite konnte nicht gefunden werden. Kehren Sie zur Startseite der Stiftung zurück oder öffnen Sie eines der veröffentlichten öffentlichen Dokumente.',
    home: 'Zur Startseite',
    charter: 'Charta lesen',
    login: 'Login',
  },
} as const;

interface NotFoundPageProps {
  onEnterApp: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onEnterApp }) => {
  const { selectedLanguage, setSelectedLanguage } = usePublicLanguage();
  const copy = NOT_FOUND_COPY[selectedLanguage.code] ?? NOT_FOUND_COPY['en-US'];
  const homePath = buildPublicPath('home', selectedLanguage.code);
  const charterPath = buildPublicPath('charter', selectedLanguage.code);

  return (
    <div className="landing-page-wrapper bylaws-page-wrapper">
      <SeoHead
        title={`${copy.title} | IOI Foundation`}
        description={copy.body}
        robots="noindex,follow"
        canonical={homePath.startsWith('http') ? homePath : `https://ioi.foundation${homePath}`}
        htmlLang={selectedLanguage.code}
        ogTitle={copy.title}
        ogDescription={copy.body}
        ogType="website"
        ogImage="https://ioi.foundation/og-image.svg"
        siteName="IOI Foundation"
        locale={selectedLanguage.code.replace('-', '_')}
        alternates={[]}
        structuredData={[]}
      />
      <PublicHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} routeKey="home" onEnterApp={onEnterApp} />

      <main className="bylaws-main">
        <section className="bylaws-hero landing-section">
          <div className="container">
            <div className="bylaws-hero-grid">
              <div className="bylaws-hero-main">
                <h1 className="bylaws-title">{copy.title}</h1>
                <p className="bylaws-subhead">{copy.body}</p>
              </div>

              <aside className="bylaws-hero-rail">
                <div className="bylaws-hero-actions">
                  <a href={homePath} className="hero-cta">{copy.home}</a>
                  <a href={charterPath} className="hero-cta">{copy.charter}</a>
                </div>
              </aside>
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
        </div>
      </footer>
    </div>
  );
};
