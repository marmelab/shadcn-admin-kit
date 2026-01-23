import React from "react";
import {
  CoreAdminContext,
  Form,
  RecordContextProvider,
  useCreateSuggestionContext,
  useTranslate,
} from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AutocompleteInput, ThemeProvider } from "@/components/admin";

export default {
  title: "Inputs/AutocompleteInput",
};

const record = {
  id: 1,
  name: "John Doe",
  tag_id: "enthusiast",
};

const tags = [
  { id: "enthusiast", label: "Enthusiast" },
  { id: "football fan", label: "Football Fan" },
  { id: "vip", label: "VIP" },
  { id: "musician", label: "Musician" },
];

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>
        <Form>{children}</Form>
      </RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <AutocompleteInput source="tag_id" choices={tags} optionText="label" />
  </Wrapper>
);

const CreateTag = () => {
  const translate = useTranslate();
  const { onCancel, onCreate, filter } = useCreateSuggestionContext();
  const [newTagName, setNewTagName] = React.useState(filter ?? "");

  const handleChangeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagName(event.currentTarget.value);
  };
  const saveTag = () => {
    const newTag = { label: newTagName, id: newTagName.toLowerCase() };
    tags.push(newTag);
    setNewTagName("");
    onCreate(newTag);
  };
  const handleSubmit = (event: React.FormEvent) => {
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
              onChange={handleChangeTagName}
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

export const Create = () => (
  <Wrapper>
    <AutocompleteInput
      source="tag_id"
      choices={tags}
      optionText="label"
      create={<CreateTag />}
      createLabel="Start typing to create a new tag"
      createItemLabel="Create %{item}"
    />
  </Wrapper>
);
