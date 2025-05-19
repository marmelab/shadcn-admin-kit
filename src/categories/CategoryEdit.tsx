import { Edit } from "@/components/Edit";
import { RaInput } from "@/components/RaInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const CategoryEdit = () => (
  <Edit>
    <SimpleForm>
      <RaInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Edit>
);
