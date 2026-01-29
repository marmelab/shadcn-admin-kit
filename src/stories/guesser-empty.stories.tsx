import { ReactNode } from "react";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { I18nContextProvider } from "ra-core";
import type { TranslationMessages } from "ra-core";
import { GuesserEmpty } from "@/components/admin/guesser-empty";
import { ThemeProvider } from "@/components/admin";

export default {
  title: "Layout/Empty",
  parameters: {
    docs: {
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

const englishProvider = polyglotI18nProvider(
  () =>
    ({
      ra: {
        guesser: {
          empty: {
            title: "No data to display",
            message: "Please check your data provider",
          },
        },
      },
    }) as unknown as TranslationMessages,
  "en",
);

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <GuesserEmpty />
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
};

export const English = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <I18nContextProvider value={englishProvider}>
      <GuesserEmpty
        title="ra.guesser.empty.title"
        message="ra.guesser.empty.message"
      />
    </I18nContextProvider>
  </StoryWrapper>
);

English.args = {
  theme: "system",
};

English.argTypes = {
  theme: {
    type: "select",
    options: ["light", "dark", "system"],
  },
};
