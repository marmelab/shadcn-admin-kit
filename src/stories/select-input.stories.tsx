import React from "react";
import {
  CoreAdminContext,
  Form,
  RecordContextProvider,
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
import { useCreateSuggestionContext } from "@/hooks/useSupportCreateSuggestion.tsx";
import { SelectInput, ThemeProvider } from "@/components/admin";
import { useWatch } from "react-hook-form";

export default {
  title: "Inputs/SelectInput",
};

const record = {
  id: 1,
  name: "John Doe",
  gender: "male",
};

const genders = [
  { id: "male", label: "He/Him" },
  { id: "female", label: "She/Her" },
  { id: "nonbinary", label: "They/Them" },
];

const FormValues = () => {
  const values = useWatch();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

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
    <SelectInput source="gender" choices={genders} optionText="label" />
    <FormValues />
  </Wrapper>
);

const CreateGender = () => {
  const translate = useTranslate();
  const { onCancel, onCreate } = useCreateSuggestionContext();
  const [newGenderName, setNewGenderName] = React.useState("");

  const handleChangeGenderName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewGenderName(event.currentTarget.value);
  };
  const saveGender = () => {
    const newGender = { label: newGenderName, id: newGenderName.toLowerCase() };
    genders.push(newGender);
    setNewGenderName("");
    onCreate(newGender.id);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveGender();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a gender</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">New gender name</Label>
            <Input
              id="name"
              value={newGenderName}
              onChange={handleChangeGenderName}
              autoFocus
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {translate("ra.action.cancel")}
          </Button>
          <Button onClick={saveGender}>{translate("ra.action.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const Create = () => (
  <Wrapper>
    <SelectInput
      source="gender"
      choices={genders}
      optionText="label"
      create={<CreateGender />}
      createLabel="Create a gender"
    />
    <FormValues />
  </Wrapper>
);
