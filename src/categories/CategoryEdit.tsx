import { Edit } from "@/components/admin/edit";
import { TextInput } from "@/components/admin/text-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { required } from "ra-core";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Edit>
);
