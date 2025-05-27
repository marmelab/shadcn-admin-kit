import { AutocompleteInput } from "@/components/autocomplete-input";
import { Edit } from "@/components/edit";
import { TextInput } from "@/components/text-input";
import { ReferenceInput } from "@/components/reference-input";
import { SimpleForm } from "@/components/simple-form";
import { required } from "ra-core";

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="reference" label="Reference" validate={required()} />
      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput label="Category" validate={required()} />
      </ReferenceInput>
      <TextInput source="width" type="number" />
      <TextInput source="height" type="number" />
      <TextInput source="price" type="number" />
      <TextInput source="stock" label="Stock" type="number" />
    </SimpleForm>
  </Edit>
);
