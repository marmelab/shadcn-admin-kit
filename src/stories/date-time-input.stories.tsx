/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import {
  Resource,
  CoreAdminContext,
  TestMemoryRouter,
  minValue,
  required,
  useRecordContext,
} from "ra-core";
import { useFormContext, useWatch } from "react-hook-form";
import get from "lodash/get";

import {
  Admin,
  Create,
  Edit,
  SimpleForm,
  SimpleFormProps,
  DateTimeInput,
  DateTimeInputProps,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default { title: "Inputs/DateTimeInput" };

export const Basic = ({
  dateTimeInputProps,
  simpleFormProps = { toolbar: null },
}: StoryProps) => (
  <Wrapper simpleFormProps={simpleFormProps}>
    <DateTimeInput source="publishedAt" {...dateTimeInputProps} />
    <DateHelper source="publishedAt" />
  </Wrapper>
);

export const WithRecord = () => (
  <TestMemoryRouter initialEntries={["/posts/1"]}>
    <Admin
      i18nProvider={i18nProvider}
      dataProvider={
        {
          getOne: async () => ({
            data: { id: 1, publishedAt: new Date().toISOString() },
          }),
        } as any
      }
    >
      <Resource
        name="posts"
        edit={() => (
          <Edit resource="posts" redirect={false}>
            <SimpleForm>
              <DateTimeInput source="publishedAt" />
              <DateHelper source="publishedAt" />
            </SimpleForm>
          </Edit>
        )}
      />
    </Admin>
  </TestMemoryRouter>
);

export const ClassName = () => (
  <Wrapper>
    <DateTimeInput source="publishedAt" className="max-w-xs" />
  </Wrapper>
);

export const DefaultValue = () => (
  <Wrapper>
    <DateTimeInput
      source="publishedAt"
      defaultValue="2021-09-11T06:51:17.772Z"
    />
  </Wrapper>
);

export const DefaultValueTimezone = () => (
  <Wrapper>
    All the displayed values should be the same: 2021-09-11 when displayed in
    the fr-FR browser locale.
    {[
      "2021-09-11",
      "09/11/2021", // US date format
      "2021-09-11T20:46:20.000+02:00",
      "2021-09-11 20:46:20.000+02:00",
      "2021-09-10T20:46:20.000-04:00",
      "2021-09-10 20:46:20.000-04:00",
      "2021-09-11T20:46:20.000Z",
      "2021-09-11 20:46:20.000Z",
      new Date("2021-09-11T20:46:20.000+02:00"),
      // although this one is 2021-09-10, its local timezone makes it 2021-09-11 in the test timezone
      new Date("2021-09-10T23:46:20.000-09:00"),
      new Date("2021-09-11T20:46:20.000Z"),
      1631385980000,
    ].map((defaultValue, index) => (
      <DateTimeInput
        key={index}
        source={`publishedAt-${index}`}
        defaultValue={defaultValue}
        helperText={false}
      />
    ))}
  </Wrapper>
);
export const Disabled = () => (
  <Wrapper>
    <DateTimeInput source="publishedAt" disabled />
    <DateTimeInput source="announcement" defaultValue="01/01/2000" disabled />
  </Wrapper>
);

export const ReadOnly = () => (
  <Wrapper>
    <DateTimeInput source="publishedAt" readOnly />
    <DateTimeInput source="announcement" defaultValue="01/01/2000" readOnly />
  </Wrapper>
);

export const Validate = () => (
  <Wrapper>
    <Alert>
      <AlertDescription>
        Published at must be after October 26, 2022
      </AlertDescription>
    </Alert>
    <DateTimeInput source="publishedAt" validate={minValue("2022-10-26")} />
  </Wrapper>
);

export const ValidateOnChange = ({
  dateTimeInputProps = {
    validate: [required(), minValue("2022-10-26")],
  },
  simpleFormProps = { mode: "onChange" },
}: StoryProps) => (
  <Wrapper simpleFormProps={simpleFormProps}>
    <Alert>
      <AlertDescription>
        Published at must be after October 26, 2022
      </AlertDescription>
    </Alert>
    <DateTimeInput source="publishedAt" {...dateTimeInputProps} />
  </Wrapper>
);

export const Parse = ({ simpleFormProps }: StoryProps) => (
  <Wrapper simpleFormProps={simpleFormProps}>
    <DateTimeInput source="publishedAt" parse={(value) => new Date(value)} />
    <DateHelper source="publishedAt" value={new Date("2021-10-20")} />
  </Wrapper>
);

export const NoLabel = () => (
  <Wrapper>
    <DateTimeInput source="publishedAt" label={false} />
  </Wrapper>
);

export const ExternalChanges = ({
  dateTimeInputProps = {},
  simpleFormProps = {
    defaultValues: { publishedAt: "2021-09-11" },
  },
}: {
  dateTimeInputProps?: Partial<DateTimeInputProps>;
  simpleFormProps?: Omit<SimpleFormProps, "children">;
}) => (
  <Wrapper simpleFormProps={simpleFormProps}>
    <DateTimeInput source="publishedAt" {...dateTimeInputProps} />
    <DateHelper source="publishedAt" value="2021-10-20" />
  </Wrapper>
);

export const ExternalChangesWithParse = ({
  dateTimeInputProps = {
    parse: (value) => new Date(value),
  },
  simpleFormProps = {
    defaultValues: { publishedAt: new Date("2021-09-11") },
  },
}: StoryProps) => (
  <Wrapper simpleFormProps={simpleFormProps}>
    <DateTimeInput source="publishedAt" {...dateTimeInputProps} />
    <DateHelper source="publishedAt" value={new Date("2021-10-20")} />
  </Wrapper>
);

const i18nProvider = polyglotI18nProvider(() => englishMessages);

const Wrapper = ({
  children,
  simpleFormProps,
}: {
  children: React.ReactNode;
  simpleFormProps?: Partial<SimpleFormProps>;
}) => (
  <CoreAdminContext i18nProvider={i18nProvider}>
    <Create resource="posts">
      <SimpleForm {...simpleFormProps}>{children}</SimpleForm>
    </Create>
  </CoreAdminContext>
);

const DateHelper = ({
  source,
  value,
}: {
  source: string;
  value?: string | Date;
}) => {
  const record = useRecordContext();
  const { resetField, setValue } = useFormContext();
  const currentValue = useWatch({ name: source });

  return (
    <div className="space-y-4">
      <p className="text-sm">
        Record value: {get(record, source)?.toString() ?? "-"}
      </p>
      <p className="text-sm">
        Current value: <span>{currentValue?.toString() ?? "-"}</span>
      </p>
      {value != null && (
        <>
          <Button
            onClick={() => {
              setValue(source, value, { shouldDirty: true });
            }}
            type="button"
          >
            Change value
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              resetField(source);
            }}
            type="button"
          >
            Reset
          </Button>
        </>
      )}
    </div>
  );
};

type StoryProps = {
  dateTimeInputProps?: Partial<DateTimeInputProps>;
  simpleFormProps?: Partial<SimpleFormProps>;
};
