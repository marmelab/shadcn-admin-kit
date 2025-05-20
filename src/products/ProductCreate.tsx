import { AutocompleteInput } from "@/components/AutocompleteInput";
import { Create } from "@/components/Create";
import { RaInput } from "@/components/RaInput";
import { ReferenceInput } from "@/components/ReferenceInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <RaInput source="reference" label="Reference" validate={required()} />
      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput label="Category" validate={required()} />
      </ReferenceInput>
      <RaInput source="stock" label="Stock" type="number" />
    </SimpleForm>
  </Create>
);
