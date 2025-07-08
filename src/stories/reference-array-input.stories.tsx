import { Resource, TestMemoryRouter } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import fakeRestProvider from "ra-data-fakerest";

import { Admin } from "@/components/admin/admin";
import { Create } from "@/components/admin/create";
import { EditGuesser } from "@/components/admin/edit-guesser";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { SimpleForm } from "@/components/admin/simple-form";
import { ReferenceArrayInput } from "@/components/admin/reference-array-input";

export default {
  title: "Inputs/ReferenceArrayInput",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const tags = [
  { id: 0, name: "3D" },
  { id: 1, name: "Architecture" },
  { id: 2, name: "Design" },
  { id: 3, name: "Painting" },
  { id: 4, name: "Photography" },
];

const dataProvider = fakeRestProvider({ tags, posts: [] }, true);

const i18nProvider = polyglotI18nProvider(() => englishMessages);

export const Basic = () => (
  <TestMemoryRouter initialEntries={["/posts/create"]}>
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource name="tags" recordRepresentation={"name"} />
      <Resource
        name="posts"
        list={ListGuesser}
        create={
          <Create resource="posts" record={{ tags_ids: [1, 3] }}>
            <SimpleForm>
              <ReferenceArrayInput
                reference="tags"
                resource="posts"
                source="tags_ids"
              />
            </SimpleForm>
          </Create>
        }
        edit={EditGuesser}
        show={ShowGuesser}
      />
    </Admin>
  </TestMemoryRouter>
);
