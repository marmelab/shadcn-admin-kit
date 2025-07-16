import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import { I18nContextProvider } from "ra-core";
import { Loading } from "@/components/admin/loading";

export default {
  title: "Layout/Loading",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const i18nProvider = polyglotI18nProvider(() => englishMessages, "en");

export const Basic = () => <Loading />;

export const I18N = () => {
  return (
    <I18nContextProvider value={i18nProvider}>
      <Loading />
    </I18nContextProvider>
  );
};
