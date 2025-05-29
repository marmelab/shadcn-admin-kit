import {
  RecordField,
  ReferenceManyCount,
  Show,
  SimpleShowLayout,
} from "@/components/admin";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <RecordField source="name" />
      <RecordField label="Product count">
        <ReferenceManyCount
          reference="products"
          resource="categories"
          target="category_id"
          source="id"
        />
      </RecordField>
    </SimpleShowLayout>
  </Show>
);
