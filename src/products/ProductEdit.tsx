import { AutocompleteInput } from "@/components/AutocompleteInput";
import { Edit } from "@/components/Edit";
import { TextInput } from "@/components/TextInput";
import { ReferenceInput } from "@/components/ReferenceInput";
import { SimpleForm } from "@/components/SimpleForm";
import { required } from "ra-core";

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="reference" label="Reference" validate={required()} />
      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput label="Category" validate={required()} />
      </ReferenceInput>
      <TextInput source="stock" label="Stock" type="number" />
    </SimpleForm>
  </Edit>
);
