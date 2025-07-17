import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import { I18nContextProvider } from "ra-core";
import { Loading } from "@/components/admin/loading";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/admin";

export default {
  title: "Layout/Loading",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const StoryWrapper = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
}) => <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>;

const i18nProvider = polyglotI18nProvider(() => englishMessages, "en");

export const Basic = ({
  theme,
  delay,
}: {
  theme: "system" | "light" | "dark";
  delay?: number;
}) => (
  <StoryWrapper theme={theme}>
    <Loading delay={delay} />
  </StoryWrapper>
);

Basic.args = {
  theme: "system",
};

Basic.argTypes = {
  theme: {
    type: "select",
    options: ["light", "dark", "system"],
  },
  delay: {
    type: "number",
    defaultValue: 1000,
  },
};

export const I18N = ({
  theme,
  delay,
}: {
  theme: "system" | "light" | "dark";
  delay?: number;
}) => {
  return (
    <StoryWrapper theme={theme}>
      <I18nContextProvider value={i18nProvider}>
        <Loading delay={delay} />
      </I18nContextProvider>
    </StoryWrapper>
  );
};

I18N.args = {
  theme: "system",
};

I18N.argTypes = {
  theme: {
    type: "select",
    options: ["light", "dark", "system"],
  },
  delay: {
    type: "number",
    defaultValue: 1000,
  },
};
