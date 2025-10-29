import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en/translation';
import translationVI from './vi/translation';

const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI }
};

i18next.use(initReactI18next).init({
    lng: localStorage.getItem('i18nextLng') ? (localStorage.getItem('i18nextLng') as string) : 'en',
    fallbackLng: localStorage.getItem('i18nextLng') ? (localStorage.getItem('i18nextLng') as string) : 'en',
    resources
})