import frenchMessages from "./i18n/fr";
import englishMessages from "./i18n/en";
import polyglotI18nProvider from "ra-i18n-polyglot";

export const i18nProvider = polyglotI18nProvider(
  (locale) => {
    if (locale === "fr") {
      return frenchMessages;
    }

    // Always fallback on english
    return englishMessages;
  },
  "en",
  [
    { locale: "en", name: "English" },
    { locale: "fr", name: "Français" },
  ],
);
