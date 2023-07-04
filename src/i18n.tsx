import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetactor from "i18next-browser-languagedetector"
import { enTranslate, frTranslate ,arTranslate } from "./localization";




const resources = {
  en: {
    translation: enTranslate
  },
  fr: {
    translation: frTranslate
  },
  ar: {
    translation: arTranslate
  }
};

i18n
  .use(LanguageDetactor)
  .use(initReactI18next) 
  .init({
    resources,
   
    

    interpolation: {
      escapeValue: false 
    },
    react:{
      useSuspense : false
    }

  });

  export default i18n;