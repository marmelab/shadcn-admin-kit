import fakeRestProvider from "ra-data-fakerest";
import { Resource } from "ra-core";

import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ReferenceArrayField } from "@/components/admin/reference-array-field";
import { TextField } from "@/components/admin/text-field";
import { Show } from "@/components/admin/show";
import { SimpleShowLayout } from "@/components/admin/simple-show-layout";

export default {
  title: "Fields/ReferenceArrayField",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const fakeData = {
  bands: [{ id: 1, name: "The Beatles", members: [1, 2, 3, 4, 5, 6, 7, 8] }],
  artists: [
    { id: 1, name: "John Lennon" },
    { id: 2, name: "Paul McCartney" },
    { id: 3, name: "Ringo Star" },
    { id: 4, name: "George Harrison" },
    { id: 5, name: "Mick Jagger" },
    { id: 6, name: "Keith Richards" },
    { id: 7, name: "Ronnie Wood" },
    { id: 8, name: "Charlie Watts" },
  ],
};
const dataProvider = fakeRestProvider(fakeData, true);

export const Basic = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="bands"
      list={ListGuesser}
      show={
        <Show>
          <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceArrayField source="members" reference="artists" />
          </SimpleShowLayout>
        </Show>
      }
    />
  </Admin>
);
