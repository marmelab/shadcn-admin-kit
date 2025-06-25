import {
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  FormToolbar,
} from "@/components/admin";
import { required, Translate } from "ra-core";

export const CustomerEdit = () => (
  <Edit>
    <SimpleForm
      toolbar={
        <FormToolbar className="md:pl-36 pt-4 pb-4 sticky bottom-0 bg-linear-to-b from-transparent to-background to-10%" />
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
            validate={required()}
            className="[&>input]:bg-white"
          />
          <TextInput
            source="birthday"
            type="date"
            validate={required()}
            className="[&>input]:bg-white"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <h3 className="min-w-32 text-sm font-semibold">
          <Translate i18nKey="resources.customers.fieldGroups.stats" />
        </h3>
        <div className="border rounded-sm p-4 bg-secondary flex-1 flex flex-col gap-4">
          <BooleanInput source="has_newsletter" />
          <TextInput source="groups" />
        </div>
      </div>
    </SimpleForm>
  </Edit>
);
