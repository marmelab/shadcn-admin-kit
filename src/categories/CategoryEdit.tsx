import { Edit, SimpleForm, TextInput } from "@/components/admin";
import { required } from "ra-core";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Edit>
);
