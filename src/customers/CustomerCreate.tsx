import { Create, SimpleForm, TextInput, FormToolbar } from "@/components/admin";
import { required, email, Translate } from "ra-core";

export const CustomerCreate = () => (
  <Create>
    <SimpleForm
      defaultValues={{ last_seen: new Date().toISOString() }}
      toolbar={
        <FormToolbar className="md:pl-36 pt-4 pb-4 sticky bottom-0 bg-linear-to-b from-transparent to-background to-10%" />
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <h3 className="min-w-32 text-sm font-semibold">
          <Translate i18nKey="resources.customers.fieldGroups.identity" />
        </h3>
        <div className="border rounded-sm p-4 bg-secondary flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <TextInput
              source="first_name"
              validate={required()}
              className="[&>input]:bg-white"
            />
            <TextInput
              source="last_name"
              validate={required()}
              className="[&>input]:bg-white"
            />
          </div>
          <TextInput
            source="email"
            validate={[required(), email()]}
            className="[&>input]:bg-white"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <h3 className="min-w-32 text-sm font-semibold">
          <Translate i18nKey="resources.customers.fieldGroups.address" />
        </h3>
        <div className="border rounded-sm p-4 bg-secondary flex-1 flex flex-col gap-4">
          <TextInput source="address" className="[&>input]:bg-white" />
          <TextInput source="zipcode" className="[&>input]:bg-white" />
          <div className="flex flex-col md:flex-row gap-4">
            <TextInput source="city" className="[&>input]:bg-white" />
            <TextInput source="stateAbbr" className="[&>input]:bg-white" />
          </div>
        </div>
      </div>
    </SimpleForm>
  </Create>
);
