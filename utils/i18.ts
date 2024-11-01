import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translations/en.json";
import bengali from "./translations/bn.json";

const userLanguage = localStorage.getItem("default-lang") || "en";

const resources = {
  en: english,
  bn: bengali
};

i18n.use(initReactI18next).init({
  resources,
  lng: `${userLanguage}`,
  fallbackLng: "en",
  returnNull: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
