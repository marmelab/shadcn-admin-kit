import { CoreAdminContext, I18nContextProvider, RecordContextProvider, ResourceContextProvider, TestMemoryRouter } from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { TextField, ThemeProvider } from "@/components/admin";
import { RecordField } from "@/components/admin/record-field";
import { ReferenceOneField } from "@/components/admin/reference-one-field";
import englishMessages from "ra-language-english";

export default {
  title: "Fields/ReferenceOneField",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const i18nProvider = polyglotI18nProvider(
  () => ({
    ...englishMessages,
    resources: {
      workouts: {
        name: "Workouts",
        not_found: 'Workout not found'
      }
    }
  }),
  'en'
);

const fakeData = {
  workoutDetails: [
    {
      id: 1,
      workout_id: 'LegDay01',
      duration: 120,
      name: 'Leg Day',
      note: 'Not very hard. Bit tired after!'
    },
  ],
};

const dataProvider = fakeRestProvider(fakeData, true);

const slowDataProvider = {
  getManyReference: () => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          fakeData.workoutDetails[0]
        ],
        total: 1
      });
    }, 2000);
  })
};

const emptyDataProvider = {
  getManyReference: () => new Promise(resolve => {
    resolve({
      data: [],
      total: 0
    });
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

export const InShowLayout = () => (
  <Wrapper dataProvider={dataProvider}>
    <div className="flex flex-col gap-4">
      <TextField source="name" />
      <ReferenceOneField reference="workoutDetails" source="short_id" target="workout_id">
        <RecordField source="note" label="Workout note" />
        <RecordField source="duration" label="Duration" />
      </ReferenceOneField>
    </div>
  </Wrapper>
)

export const EmptyWithString = () => (
  <Wrapper dataProvider={emptyDataProvider}>
    <I18nContextProvider value={i18nProvider}>
      <ReferenceOneField
        reference="workoutDetails"
        source="short_id"
        target="workout_id"
        empty="This workout does not exists"
      >
        <TextField source="note" />
      </ReferenceOneField>
    </I18nContextProvider>
  </Wrapper>
)

export const EmptyWithTranslate = () => (
  <Wrapper dataProvider={emptyDataProvider}>
    <I18nContextProvider value={i18nProvider}>
      <ReferenceOneField
        reference="workoutDetails"
        source="short_id"
        target="workout_id"
        empty="resources.workouts.not_found"
      >
        <TextField source="note" />
      </ReferenceOneField>
    </I18nContextProvider>
  </Wrapper>
)