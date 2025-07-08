import { Resource, TestMemoryRouter } from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import fakeRestProvider from "ra-data-fakerest";

import { Admin } from "@/components/admin/admin";
import { Create } from "@/components/admin/create";
import { SimpleForm } from "@/components/admin/simple-form";
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceArrayInput } from "@/components/admin/reference-array-input";
import { ReferenceArrayField } from "@/components/admin/reference-array-field";
import { BadgeField, SingleFieldList } from "@/components/admin";

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
        list={
          <List>
            <DataTable>
              <DataTable.Col source="id" />
              <DataTable.Col source="tags_ids">
                <ReferenceArrayField source="tags_ids" reference="tags">
                  <SingleFieldList>
                    <BadgeField source="name" />
                  </SingleFieldList>
                </ReferenceArrayField>
              </DataTable.Col>
            </DataTable>
          </List>
        }
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
      />
    </Admin>
  </TestMemoryRouter>
);
