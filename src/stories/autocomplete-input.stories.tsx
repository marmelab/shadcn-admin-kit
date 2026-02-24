import React from "react";
import {
  CoreAdminContext,
  Form,
  RecordContextProvider,
  useCreateSuggestionContext,
  useRecordContext,
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default {
  title: "Inputs/AutocompleteInput",
};

const record = {
  id: 1,
  name: "John Doe",
  tag_id: "enthusiast",
  contact_id: 1,
};

const tags = [
  { id: "enthusiast", label: "Enthusiast" },
  { id: "football fan", label: "Football Fan" },
  { id: "vip", label: "VIP" },
  { id: "musician", label: "Musician" },
];

const contacts = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    title: "Senior Developer",
    company_name: "Tech Corp",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    title: "Product Manager",
    company_name: "Innovation Incorporated",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    first_name: "Mike",
    last_name: "Johnson",
    title: "Designer",
    company_name: "Creative Studio",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    first_name: "Sarah",
    last_name: "Wilson",
    title: "Marketing Director",
    company_name: null,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Brown",
    title: "Software Engineer",
    company_name: "StartupXYZ",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 6,
    first_name: "Emily",
    last_name: "Davis",
    title: "UX Researcher",
    company_name: "Design Labs",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 7,
    first_name: "Alex",
    last_name: "Garcia",
    title: "Data Scientist",
    company_name: "AI Solutions",
    avatar:
      "https://images.unsplash.com/photo-1539571696257-f0389e7e00f7?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 8,
    first_name: "Lisa",
    last_name: "Rodriguez",
    title: "Sales Manager",
    company_name: "Global Enterprises",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 9,
    first_name: "Tom",
    last_name: "Anderson",
    title: "DevOps Engineer",
    company_name: null,
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 10,
    first_name: "Rachel",
    last_name: "Martinez",
    title: "Business Analyst",
    company_name: "Consulting Plus",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
  },
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

const ContactOptionRender = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <div className="flex flex-row gap-4 items-center justify-start whitespace-normal text-left">
      <Avatar>
        <AvatarImage
          src={record.avatar}
          alt={`${record.first_name} ${record.last_name}`}
        />
      </Avatar>
      <div className="flex flex-col items-start gap-1">
        <span>
          {record.first_name} {record.last_name}
        </span>
        <span className="text-xs text-muted-foreground">
          {record.title}
          {record.title && record.company_name && " at "}
          {record.company_name}
        </span>
      </div>
    </div>
  );
};

export const OptionText = () => (
  <Wrapper>
    <AutocompleteInput
      source="contact_id"
      choices={contacts}
      optionText={<ContactOptionRender />}
    />
  </Wrapper>
);

export const InsideModal = () => {
  return (
    <ThemeProvider>
      <CoreAdminContext i18nProvider={i18nProvider}>
        <RecordContextProvider value={record}>
          <div>
            <Dialog open>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Select a Contact</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Form>
                    <AutocompleteInput
                      source="contact_id"
                      choices={contacts}
                      optionText={<ContactOptionRender />}
                      label="Contact"
                    />
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </RecordContextProvider>
      </CoreAdminContext>
    </ThemeProvider>
  );
};
