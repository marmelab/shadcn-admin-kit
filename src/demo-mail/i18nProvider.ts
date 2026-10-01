import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "./i18n/en";
import frenchMessages from "./i18n/fr";

export const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === "fr" ? frenchMessages : englishMessages),
  "en",
  [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
  ],
);
