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

export const WithMismatchedOptionTextAndValue = () => (
  <StoryWrapper theme="system">
    <SimpleForm>
      <AutocompleteArrayInput
        source="contact_id"
        optionValue="id"
        optionText={(choice) => `${choice.firstName} ${choice.lastName}`}
        choices={[
          { id: 1, firstName: "John", lastName: "Doe" },
          { id: 2, firstName: "Jane", lastName: "Smith" },
          { id: 3, firstName: "Sarah", lastName: "Wilson" },
          { id: 4, firstName: "Michael", lastName: "Johnson" },
          { id: 5, firstName: "Emily", lastName: "Davis" },
          { id: 6, firstName: "David", lastName: "Brown" },
          { id: 7, firstName: "Lisa", lastName: "Rodriguez" },
          { id: 8, firstName: "James", lastName: "Miller" },
          { id: 9, firstName: "Tom", lastName: "Anderson" },
          { id: 10, firstName: "Karen", lastName: "Lee" },
        ]}
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
