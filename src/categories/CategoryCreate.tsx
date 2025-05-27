import { Create } from "@/components/create";
import { TextInput } from "@/components/text-input";
import { SimpleForm } from "@/components/simple-form";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Create>
);
