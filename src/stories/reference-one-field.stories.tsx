import { CoreAdminContext, RecordContextProvider, ResourceContextProvider, TestMemoryRouter } from "ra-core";
import fakeRestProvider from "ra-data-fakerest";

import { ThemeProvider } from "@/components/admin";
import { RecordField } from "@/components/admin/record-field";
import { ReferenceOneField } from "@/components/admin/reference-one-field";

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
  workoutDetails: [
    { workout_id: 'LegDay01', duration: 120, note: 'Not very hard' },
  ],
};

const dataProvider = fakeRestProvider(fakeData, true);

const slowDataProvider = {
  getManyReference: () => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, workout_id: 'CardioDay08', duration: 120, note: 'Slow cardio today.' },
        ],
        total: 1
      });
    }, 2000);
  })
};

const Wrapper = ({
  children,
  dataProvider,
}: {
  children: React.ReactNode;
  dataProvider: any;
}) => (
  <TestMemoryRouter initialEntries={["/workouts/1/show"]}>
    <ThemeProvider>
      <CoreAdminContext dataProvider={dataProvider}>
        <ResourceContextProvider value="workouts">
          <RecordContextProvider value={{ id: 1, short_id: 'LegDay01', title: "Leg Day" }}>
            {children}
          </RecordContextProvider>
        </ResourceContextProvider>
      </CoreAdminContext>
    </ThemeProvider>
  </TestMemoryRouter >)


export const Basic = () => (
  <Wrapper dataProvider={dataProvider}>
    <ReferenceOneField reference="workoutDetails" source="short_id" target="workout_id">
      <RecordField source="note" label="Workout note" />
    </ReferenceOneField>
  </Wrapper>
);

export const Loading = () => (
  <Wrapper dataProvider={slowDataProvider}>
    <ReferenceOneField reference="workoutDetails" source="short_id" target="workout_id">
      <RecordField source="note" label="Workout note" />
    </ReferenceOneField>
  </Wrapper>
)

export const WithRenderProp = () => (
  <Wrapper dataProvider={slowDataProvider}>
    <ReferenceOneField
      reference="workoutDetails"
      source="short_id"
      target="workout_id"
      render={({ isPending, error, referenceRecord }) => {
        if (isPending) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p style={{ color: 'red' }}>{error.toString()}</p>
        }
        return (<span>{referenceRecord ? referenceRecord.note : <b>No note.</b>}</span>)
      }} />
  </Wrapper>
)
