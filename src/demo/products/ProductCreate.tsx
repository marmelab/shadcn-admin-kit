import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import { NumberInput } from "@/components/admin/number-input";
import { required } from "ra-core";

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="reference" label="Reference" validate={required()} />
      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput label="Category" validate={required()} />
      </ReferenceInput>
      <NumberInput source="width" />
      <NumberInput source="height" />
      <NumberInput source="price" />
      <NumberInput source="stock" label="Stock" />
    </SimpleForm>
  </Create>
);
