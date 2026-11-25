import type { ReactNode } from "react";
import {
  minValue,
  number,
  required,
  Resource,
  TestMemoryRouter,
} from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import {
  Admin,
  BooleanInput,
  DataTable,
  DateField,
  DateInput,
  Edit,
  EditButton,
  EditGuesser,
  NumberInput,
  ReferenceManyField,
  TabbedForm,
  TextInput,
} from "@/components/admin";
import { RichTextInput } from "@/components/rich-text-input";

export default {
  title: "Forms/TabbedForm",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const dataProvider = fakeRestProvider(
  {
    books: [
      {
        id: 1,
        title: "War and Peace",
        author: "Leo Tolstoy",
        bio: "Leo Tolstoy (1828-1910) was a Russian writer who is regarded as one of the greatest authors of all time.",
        year: 1869,
      },
    ],
    posts: [
      {
        id: 1,
        title: "Better code reviews",
        teaser:
          "Small habits that make reviews faster, kinder and more useful for the whole team.",
        body: "<p>Reviews work best when pull requests are <strong>small and frequent</strong>. Aim for changes a reviewer can read in fifteen minutes.</p><p>Comment on the code, not the person, and <em>always</em> explain why a change matters.</p>",
        password: "",
        published_at: "2012-08-06",
        average_note: 2,
        commentable: true,
        views: 143,
      },
    ],
    comments: [
      {
        id: 1,
        post_id: 1,
        body: "Great tips, thanks for sharing.",
        created_at: "2012-08-07T09:12:00Z",
      },
      {
        id: 2,
        post_id: 1,
        body: "Small PRs changed our team.",
        created_at: "2012-08-12T16:40:00Z",
      },
    ],
  },
  process.env.NODE_ENV !== "test",
);

const StoryWrapper = ({
  children,
  initialEntry = "/books/1",
}: {
  children: ReactNode;
  initialEntry?: string;
}) => (
  <TestMemoryRouter initialEntries={[initialEntry]}>
    <Admin dataProvider={dataProvider}>
      <Resource name="books" edit={<Edit>{children}</Edit>} />
    </Admin>
  </TestMemoryRouter>
);

export const Basic = () => (
  <StoryWrapper>
    <TabbedForm>
      <TabbedForm.Tab label="main">
        <TextInput source="title" />
        <TextInput source="author" />
        <TextInput source="year" type="number" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="details" count={3}>
        <TextInput source="bio" multiline />
      </TabbedForm.Tab>
    </TabbedForm>
  </StoryWrapper>
);

export const Validation = () => (
  <StoryWrapper>
    <TabbedForm validate={() => ({ bio: "incorrect details" })}>
      <TabbedForm.Tab label="main">
        <TextInput source="title" />
        <TextInput source="author" />
        <TextInput source="year" type="number" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="details">
        <TextInput source="bio" multiline />
      </TabbedForm.Tab>
    </TabbedForm>
  </StoryWrapper>
);

export const CustomPath = () => (
  <StoryWrapper initialEntry="/books/1/details">
    <TabbedForm>
      <TabbedForm.Tab label="main">
        <TextInput source="title" />
        <TextInput source="author" />
        <TextInput source="year" type="number" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="details" path="details">
        <TextInput source="bio" multiline />
      </TabbedForm.Tab>
    </TabbedForm>
  </StoryWrapper>
);

export const NoSyncWithLocation = () => (
  <StoryWrapper>
    <TabbedForm syncWithLocation={false}>
      <TabbedForm.Tab label="main">
        <TextInput source="title" />
        <TextInput source="author" />
        <TextInput source="year" type="number" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="details">
        <TextInput source="bio" multiline />
      </TabbedForm.Tab>
    </TabbedForm>
  </StoryWrapper>
);

export const PostEdit = () => (
  <TestMemoryRouter initialEntries={["/posts/1"]}>
    <Admin dataProvider={dataProvider}>
      <Resource
        name="posts"
        edit={
          <Edit>
            <TabbedForm>
              <TabbedForm.Tab label="Summary">
                <TextInput disabled label="Id" source="id" />
                <TextInput source="title" validate={required()} />
                <TextInput multiline source="teaser" validate={required()} />
              </TabbedForm.Tab>
              <TabbedForm.Tab label="Body">
                <RichTextInput
                  source="body"
                  validate={required()}
                  label={false}
                />
              </TabbedForm.Tab>
              <TabbedForm.Tab label="Miscellaneous">
                <TextInput
                  label="Password (if protected post)"
                  source="password"
                  type="password"
                />
                <DateInput label="Publication date" source="published_at" />
                <NumberInput
                  source="average_note"
                  validate={[number(), minValue(0)]}
                />
                <BooleanInput
                  label="Allow comments?"
                  source="commentable"
                  defaultValue
                />
                <TextInput disabled label="Nb views" source="views" />
              </TabbedForm.Tab>
              <TabbedForm.Tab label="Comments">
                <ReferenceManyField reference="comments" target="post_id">
                  <DataTable bulkActionButtons={false}>
                    <DataTable.Col source="body" />
                    <DataTable.Col source="created_at" field={DateField} />
                    <DataTable.Col>
                      <EditButton />
                    </DataTable.Col>
                  </DataTable>
                </ReferenceManyField>
              </TabbedForm.Tab>
            </TabbedForm>
          </Edit>
        }
      />
      <Resource name="comments" edit={EditGuesser} />
    </Admin>
  </TestMemoryRouter>
);
