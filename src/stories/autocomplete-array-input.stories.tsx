import {
  CoreAdminContext,
  RecordContextProvider,
  useCreateSuggestionContext,
  useTranslate,
} from "ra-core";
import {
  AutocompleteArrayInput,
  SimpleForm,
  ThemeProvider,
} from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { FormEvent, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

type TagChoice = { id: string; name: string };

const toChoice = (name: string): TagChoice => ({
  id: name.toLowerCase(),
  name,
});

/**
 * Creation through a function: enough when the new choice only needs the text
 * users typed in the input.
 */
export const OnCreate = () => {
  const [tagChoices, setTagChoices] = useState(choices);
  return (
    <StoryWrapper theme="system">
      <SimpleForm>
        <AutocompleteArrayInput
          source="tags"
          choices={tagChoices}
          onCreate={(filter) => {
            if (!filter) return;
            const newTag = toChoice(filter);
            setTagChoices((previous) => [...previous, newTag]);
            return newTag;
          }}
          createLabel="Start typing to create a new tag"
          createItemLabel="Create %{item}"
        />
      </SimpleForm>
    </StoryWrapper>
  );
};

const CreateTag = ({ onSave }: { onSave: (tag: TagChoice) => void }) => {
  const translate = useTranslate();
  const { onCancel, onCreate, filter } = useCreateSuggestionContext();
  const [newTagName, setNewTagName] = useState(filter ?? "");

  const saveTag = () => {
    const newTag = toChoice(newTagName);
    onSave(newTag);
    setNewTagName("");
    onCreate(newTag);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    saveTag();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">New tag name</Label>
            <Input
              id="name"
              value={newTagName}
              onChange={(event) => setNewTagName(event.currentTarget.value)}
              autoFocus
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {translate("ra.action.cancel")}
          </Button>
          <Button onClick={saveTag}>{translate("ra.action.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Creation through an element: required as soon as the new choice needs more
 * than the text users typed in the input.
 */
export const Create = () => {
  const [tagChoices, setTagChoices] = useState(choices);
  return (
    <StoryWrapper theme="system">
      <SimpleForm>
        <AutocompleteArrayInput
          source="tags"
          choices={tagChoices}
          create={
            <CreateTag
              onSave={(tag) => setTagChoices((previous) => [...previous, tag])}
            />
          }
          createLabel="Start typing to create a new tag"
          createItemLabel="Create %{item}"
        />
      </SimpleForm>
    </StoryWrapper>
  );
};

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
