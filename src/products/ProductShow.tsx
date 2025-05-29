import {
  RecordField,
  ReferenceField,
  Show,
  SimpleShowLayout,
} from "@/components/admin";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <RecordField variant="inline" source="reference" />
      <RecordField variant="inline" label="Category">
        <ReferenceField source="category_id" reference="categories" />
      </RecordField>
      <RecordField variant="inline" source="width" />
      <RecordField variant="inline" source="height" />
      <RecordField variant="inline" source="price" />
      <RecordField variant="inline" source="stock" />
    </SimpleShowLayout>
  </Show>
);
