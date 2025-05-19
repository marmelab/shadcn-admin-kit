import { Labeled } from "@/components/Labeled";
import { ReferenceManyCount } from "@/components/ReferenceManyCount";
import { Show } from "@/components/Show";
import { SimpleShowLayout } from "@/components/SimpleShowLayout";
import { TextField } from "@/components/TextField";

export const CategoryShow = () => (
  <Show>
    <SimpleShowLayout>
      <Labeled label="Name">
        <TextField source="name" />
      </Labeled>
      <Labeled label="Product count">
        <ReferenceManyCount
          reference="products"
          resource="categories"
          target="category_id"
          source="id"
        />
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
