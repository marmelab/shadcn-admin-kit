import {
  AutocompleteArrayInput,
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
} from "@/components/admin";
import segments from "@/demo/segments/data";
import { required, email, Translate } from "ra-core";

export const CustomerEdit = () => (
  <Edit>
    <SimpleForm
      className="max-w-2xl"
      toolbar={
        <Toolbar className="md:pl-36 pt-4 pb-4 sticky bottom-0 bg-linear-to-b from-transparent to-background to-10%" />
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
              className="[&>input]:bg-white flex-1"
            />
            <TextInput
              source="last_name"
              validate={required()}
              className="[&>input]:bg-white flex-1"
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
            <TextInput source="city" className="[&>input]:bg-white flex-1" />
            <TextInput
              source="stateAbbr"
              className="[&>input]:bg-white flex-1"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <h3 className="min-w-32 text-sm font-semibold">
          <Translate i18nKey="resources.customers.fieldGroups.misc" />
        </h3>
        <div className="border rounded-sm p-4 bg-secondary flex-1 flex flex-col gap-4">
          <BooleanInput source="has_newsletter" />
          <TextInput source="avatar" className="[&>input]:bg-white" />
          <TextInput
            source="birthday"
            type="date"
            format={(value) => value?.split("T")[0]} // Format date to YYYY-MM-DD
            className="[&>input]:bg-white"
          />
          <AutocompleteArrayInput source="groups" choices={segments} />
        </div>
      </div>
    </SimpleForm>
  </Edit>
);
