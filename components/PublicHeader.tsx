import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import './LandingPage.css';
import { HeaderLogo } from './ui/HeaderLogo';
import { LANDING_TRANSLATIONS } from './landingTranslations';
import { DEFAULT_LANGUAGE_CODE, LanguageOption, SUPPORTED_LANGUAGE_OPTIONS } from './publicLanguage';
import { buildPublicPath, PublicRouteKey } from '../lib/publicRoutes';

const LanguageGlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.667 10a8.333 8.333 0 1 1 16.666 0 8.333 8.333 0 0 1-16.666 0M10 3.333h-.009v.002c-.031.008-.186.074-.41.409-.214.319-.43.792-.622 1.414-.325 1.056-.55 2.446-.61 4.009h3.302c-.06-1.563-.285-2.953-.61-4.009-.192-.622-.408-1.095-.622-1.414-.224-.335-.379-.401-.41-.41zm1.65 7.5h-3.3c.061 1.621.301 3.056.645 4.124.203.627.428 1.088.644 1.382.107.146.198.232.265.28a.4.4 0 0 0 .07.04l.024.008h.004l.023-.007a.4.4 0 0 0 .071-.041 1.3 1.3 0 0 0 .265-.28c.216-.294.441-.755.643-1.382.345-1.068.585-2.503.647-4.124M6.682 9.167c.06-1.704.305-3.264.685-4.499q.152-.494.338-.929a6.67 6.67 0 0 0-4.32 5.428zm-3.296 1.666H6.68c.063 1.766.323 3.379.728 4.635q.135.417.295.793a6.67 6.67 0 0 1-4.32-5.428m9.934 0h3.296a6.67 6.67 0 0 1-4.32 5.428q.162-.376.296-.793c.405-1.256.665-2.87.728-4.635m3.296-1.666h-3.296c-.06-1.704-.305-3.264-.686-4.499q-.15-.494-.337-.929a6.67 6.67 0 0 1 4.319 5.428"
    />
  </svg>
);

interface PublicHeaderProps {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (language: LanguageOption) => void;
  routeKey: PublicRouteKey;
  variant?: 'landing' | 'page';
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  routeKey,
  variant = 'page',
}) => {
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageSearchRef = useRef<HTMLInputElement>(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [languageQuery, setLanguageQuery] = useState('');
  const [isLandingHeaderStuck, setIsLandingHeaderStuck] = useState(false);

  const languageCopy =
    LANDING_TRANSLATIONS[selectedLanguage.code]?.languageSelector ??
    LANDING_TRANSLATIONS[DEFAULT_LANGUAGE_CODE].languageSelector;

  const closeLanguageSelector = () => {
    setIsLanguageOpen(false);
    setLanguageQuery('');
  };

  useEffect(() => {
    const updateHeaderState = () => {
      const nextIsStuck = window.scrollY > (variant === 'landing' ? 28 : 20);
      setIsLandingHeaderStuck((current) => (current === nextIsStuck ? current : nextIsStuck));
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, [variant]);

  useEffect(() => {
    if (!isLanguageOpen) return;

    languageSearchRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        closeLanguageSelector();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLanguageSelector();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLanguageOpen]);

  const normalizedLanguageQuery = languageQuery.trim().toLowerCase();
  const filteredLanguageOptions = SUPPORTED_LANGUAGE_OPTIONS.filter((option) => {
    if (!normalizedLanguageQuery) return true;

    return [
      option.nativeLabel,
      option.nativeRegion ?? '',
      option.englishLabel,
      option.englishRegion ?? '',
      option.code,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedLanguageQuery);
  });

  const headerClassName =
    variant === 'landing'
      ? `landing-header ${isLandingHeaderStuck ? 'is-stuck' : ''}`
      : `landing-header public-page-header ${isLandingHeaderStuck ? 'is-stuck' : ''}`;

  const homePath = buildPublicPath('home', selectedLanguage.code);

  return (
    <header className={headerClassName}>
      <div className="landing-header-shell">
        <a href={homePath} className="nav-brand" aria-label="Return to IOI Foundation home">
          <HeaderLogo className="nav-brand-logo" label="IOI Foundation" />
        </a>

        <div className="language-selector" ref={languageMenuRef}>
          {isLanguageOpen && (
            <button
              type="button"
              className="language-selector-overlay"
              aria-label={languageCopy.closeLabel}
              onClick={closeLanguageSelector}
            />
          )}

          <button
            type="button"
            className={`language-selector-button ${isLanguageOpen ? 'is-open' : ''}`}
            aria-label={languageCopy.buttonAriaLabel}
            aria-expanded={isLanguageOpen}
            aria-haspopup="dialog"
            aria-controls="public-language-popover"
            onClick={() => {
              if (isLanguageOpen) {
                closeLanguageSelector();
                return;
              }

              setIsLanguageOpen(true);
            }}
          >
            <LanguageGlobeIcon className="language-selector-icon" aria-hidden="true" />
            <span className="language-selector-label">
              <span>{selectedLanguage.nativeLabel}</span>
              {selectedLanguage.nativeRegion && <span className="language-selector-region">{selectedLanguage.nativeRegion}</span>}
            </span>
            <ChevronDown size={14} className={`language-selector-caret ${isLanguageOpen ? 'is-open' : ''}`} />
          </button>

          {isLanguageOpen && (
            <div
              id="public-language-popover"
              className="language-selector-popover"
              role="dialog"
              aria-labelledby="public-language-title"
              tabIndex={-1}
            >
              <div className="language-selector-popover-header">
                <span id="public-language-title">{languageCopy.title}</span>
                <button
                  type="button"
                  className="language-selector-close"
                  aria-label={languageCopy.closeLabel}
                  onClick={closeLanguageSelector}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="language-selector-results">
                <ul id="public-language-listbox" role="listbox" aria-label={languageCopy.listAriaLabel}>
                  {filteredLanguageOptions.map((option) => {
                    const isSelected = option.code === selectedLanguage.code;

                    return (
                      <li key={option.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`language-option ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => {
                            setSelectedLanguage(option);
                            if (typeof window !== 'undefined') {
                              const nextPath = buildPublicPath(routeKey, option.code, window.location.hash);
                              window.location.href = nextPath;
                            }
                            closeLanguageSelector();
                          }}
                        >
                          <span className="language-option-copy">
                            <span className="language-option-text">
                              <span>{option.nativeLabel}</span>
                              {option.nativeRegion && <span className="language-option-region">{option.nativeRegion}</span>}
                            </span>
                            <span className="language-option-subtext">
                              <span>{option.englishLabel}</span>
                              {option.englishRegion && <span className="language-option-region">{option.englishRegion}</span>}
                            </span>
                          </span>
                          {isSelected && (
                            <span className="language-option-check-wrap" aria-hidden="true">
                              <Check size={14} className="language-option-check" />
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {filteredLanguageOptions.length === 0 && (
                  <div className="language-selector-empty">{languageCopy.empty}</div>
                )}
              </div>

              <label className="language-selector-search">
                <Search size={14} className="language-selector-search-icon" />
                <input
                  ref={languageSearchRef}
                  type="text"
                  value={languageQuery}
                  onChange={(event) => setLanguageQuery(event.target.value)}
                  placeholder={languageCopy.searchPlaceholder}
                  aria-autocomplete="list"
                  aria-controls="public-language-listbox"
                  aria-expanded={isLanguageOpen}
                  aria-label={languageCopy.searchAriaLabel}
                  role="combobox"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
