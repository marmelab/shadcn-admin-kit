import { ReferenceManyCount } from "@/components/admin/reference-many-count";
import { Show } from "@/components/admin/show";
import { SimpleShowLayout } from "@/components/admin/simple-show-layout";
import { RecordField } from "@/components/admin/record-field";

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
