import { Create } from "@/components/Create";
import { TextInput } from "@/components/TextInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Create>
);
