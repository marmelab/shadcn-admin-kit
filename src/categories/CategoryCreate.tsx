import { Create, SimpleForm, TextInput } from "@/components/admin";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Create>
);
