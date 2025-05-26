import { ReferenceManyCount } from "@/components/ReferenceManyCount";
import { Show } from "@/components/Show";
import { SimpleShowLayout } from "@/components/SimpleShowLayout";
import { RecordField } from "@/components/RecordField";

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
