import { CoreAdminContext, RecordContextProvider } from "ra-core";
import {
  AutocompleteArrayInput,
  SimpleForm,
  ThemeProvider,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { ReactNode } from "react";

const record = {
  id: 1,
  tags: ["tech"],
  title: "My Post",
};

export default {
  title: "Inputs/AutocompleteArrayInput",
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
}) => (
  <ThemeProvider defaultTheme={theme}>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

const choices = [
  { id: "tech", name: "Tech" },
  { id: "news", name: "News" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "entertainment", name: "Entertainment" },
  { id: "sports", name: "Sports" },
  { id: "health", name: "Health" },
  { id: "education", name: "Education" },
  { id: "finance", name: "Finance" },
  { id: "travel", name: "Travel" },
];

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <SimpleForm>
      <AutocompleteArrayInput source="tags" choices={choices} />
    </SimpleForm>
  </StoryWrapper>
);

const getCurrencyChoices = () => {
  const displayNames = new Intl.DisplayNames(
    typeof navigator !== "undefined"
      ? (navigator.languages as string[])
      : ["en"],
    { type: "currency" },
  );
  // @ts-expect-error supportedValuesOf is not yet in ts type, but it is supported in all modern browsers
  return Intl.supportedValuesOf("currency").map((code: string) => ({
    id: code,
    name: `${code} - ${displayNames.of(code)}`,
  }));
};

const currencyChoices = getCurrencyChoices();

export const WithMismatchedOptionTextAndValue = () => (
  <StoryWrapper theme="system">
    <SimpleForm>
      <AutocompleteArrayInput
        source="contact_id"
        optionValue="id"
        choices={currencyChoices}
      />
    </SimpleForm>
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
