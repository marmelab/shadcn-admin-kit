import { AutocompleteInput } from "@/components/AutocompleteInput";
import { Create } from "@/components/Create";
import { TextInput } from "@/components/TextInput";
import { ReferenceInput } from "@/components/ReferenceInput";
import { SimpleForm } from "@/components/SimpleForm";
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
