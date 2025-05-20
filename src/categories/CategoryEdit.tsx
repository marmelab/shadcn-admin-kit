import { Edit } from "@/components/Edit";
import { TextInput } from "@/components/TextInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Edit>
);
