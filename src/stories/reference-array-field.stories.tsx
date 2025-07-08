import fakeRestProvider from "ra-data-fakerest";
import { Resource, TestMemoryRouter } from "ra-core";

import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { EditGuesser, ShowGuesser } from "@/components/admin";

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
  bands: [{ id: 1, name: "The Beatles", artists_ids: [1, 2, 3, 4] }],
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
  <TestMemoryRouter initialEntries={["/bands/1/show"]}>
    <Admin dataProvider={dataProvider}>
      <Resource
        name="bands"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
      <Resource name="artists" list={ListGuesser} />
    </Admin>
  </TestMemoryRouter>
);
