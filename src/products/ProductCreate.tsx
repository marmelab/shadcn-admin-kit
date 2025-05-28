import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { Create } from "@/components/admin/create";
import { TextInput } from "@/components/admin/text-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { required } from "ra-core";

export const ProductCreate = () => (
  <Create>
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
  </Create>
);
