import fakeRestProvider from "ra-data-fakerest";
import { Resource, TestMemoryRouter } from "ra-core";

import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { Show } from "@/components/admin/show";
import { RecordField } from "@/components/admin/record-field";
import { ReferenceOneField } from "@/components/admin/reference-one-field";
import { TextField } from "@/components/admin";

export default {
  title: "Fields/ReferenceOneField",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const fakeData = {
  workouts: [{ id: 1, short_id: 'LegDay01', title: "Leg Day" }],
  workoutDetails: [
    { workout_id: 'LegDay01', duration: 120, note: 'Not very hard' },
  ],
};
const dataProvider = fakeRestProvider(fakeData, true);

export const Basic = () => (
  <TestMemoryRouter initialEntries={["/workouts/1/show"]}>
    <Admin dataProvider={dataProvider}>
      <Resource
        name="workouts"
        list={ListGuesser}
        show={
          <Show>
            <div className="flex flex-col gap-4">
              <RecordField source="id" />
              <RecordField source="title" />
              <ReferenceOneField reference="workoutDetails" source="short_id" target="workout_id">
                <TextField source="note" />
              </ReferenceOneField>
            </div>
          </Show>
        }
      />
    </Admin>
  </TestMemoryRouter >
);

