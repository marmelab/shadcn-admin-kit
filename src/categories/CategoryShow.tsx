import { ReferenceManyCount } from "@/components/reference-many-count";
import { Show } from "@/components/show";
import { SimpleShowLayout } from "@/components/simple-show-layout";
import { RecordField } from "@/components/record-field";

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
