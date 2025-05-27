import { Create } from "@/components/admin/create";
import { TextInput } from "@/components/admin/text-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Create>
);
