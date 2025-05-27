import { Edit } from "@/components/edit";
import { TextInput } from "@/components/text-input";
import { SimpleForm } from "@/components/simple-form";
import { required } from "ra-core";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Edit>
);
