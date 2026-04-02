import { useEffect, useState } from 'react';

export type SupportedLanguageCode = 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE';

export interface LanguageOption {
  code: SupportedLanguageCode;
  nativeLabel: string;
  nativeRegion?: string;
  englishLabel: string;
  englishRegion?: string;
}

export const SUPPORTED_LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en-US',
    nativeLabel: 'English',
    nativeRegion: 'United States',
    englishLabel: 'English',
    englishRegion: 'United States',
  },
  {
    code: 'es-ES',
    nativeLabel: 'Español',
    nativeRegion: 'España',
    englishLabel: 'Spanish',
    englishRegion: 'Spain',
  },
  {
    code: 'fr-FR',
    nativeLabel: 'Français',
    nativeRegion: 'France',
    englishLabel: 'French',
    englishRegion: 'France',
  },
  {
    code: 'de-DE',
    nativeLabel: 'Deutsch',
    nativeRegion: 'Deutschland',
    englishLabel: 'German',
    englishRegion: 'Germany',
  },
];

export const DEFAULT_LANGUAGE_CODE: SupportedLanguageCode = 'en-US';
export const PUBLIC_LANGUAGE_STORAGE_KEY = 'ioi_foundation_public_language';

export const findLanguageOption = (code?: string | null) => {
  if (!code) return undefined;

  const normalizedCode = code.toLowerCase();
  const primarySubtag = normalizedCode.split('-')[0];

  return SUPPORTED_LANGUAGE_OPTIONS.find((option) => {
    const optionCode = option.code.toLowerCase();
    return optionCode === normalizedCode || optionCode.split('-')[0] === primarySubtag;
  });
};

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return SUPPORTED_LANGUAGE_OPTIONS.find((option) => option.code === DEFAULT_LANGUAGE_CODE) ?? SUPPORTED_LANGUAGE_OPTIONS[0];
  }

  try {
    const storedLanguage = findLanguageOption(window.localStorage.getItem(PUBLIC_LANGUAGE_STORAGE_KEY));
    if (storedLanguage) return storedLanguage;
  } catch (error) {
    console.warn('Unable to read language preference from local storage.', error);
  }

  const browserLanguages = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language];
  for (const browserLanguage of browserLanguages) {
    const matchedLanguage = findLanguageOption(browserLanguage);
    if (matchedLanguage) return matchedLanguage;
  }

  return SUPPORTED_LANGUAGE_OPTIONS.find((option) => option.code === DEFAULT_LANGUAGE_CODE) ?? SUPPORTED_LANGUAGE_OPTIONS[0];
};

export const usePublicLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.code;

    try {
      window.localStorage.setItem(PUBLIC_LANGUAGE_STORAGE_KEY, selectedLanguage.code);
    } catch (error) {
      console.warn('Unable to persist language preference.', error);
    }
  }, [selectedLanguage]);

  return { selectedLanguage, setSelectedLanguage };
};
