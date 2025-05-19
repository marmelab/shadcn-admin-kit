import { Create } from "@/components/Create";
import { RaInput } from "@/components/RaInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <RaInput source="name" label="Name" validate={required()} />
    </SimpleForm>
  </Create>
);
