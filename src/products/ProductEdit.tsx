import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { Edit } from "@/components/Edit";
import { RaInput } from "@/components/RaInput";
import { ReferenceInput } from "@/components/ReferenceInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <RaInput source="reference" label="Reference" validate={required()} />
      <ReferenceInput source="category_id" reference="categories">
        <AutoCompleteInput label="Category" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
