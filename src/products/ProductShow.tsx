import { Labeled } from "@/components/Labeled";
import { ReferenceField } from "@/components/ReferenceField";
import { Show } from "@/components/Show";
import { SimpleShowLayout } from "@/components/SimpleShowLayout";
import { TextField } from "@/components/TextField";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <Labeled label="Reference">
        <TextField source="reference" />
      </Labeled>
      <Labeled label="Category">
        <ReferenceField source="category_id" reference="categories">
          <TextField source="name" />
        </ReferenceField>
      </Labeled>
      <Labeled label="Width">
        <TextField source="width" />
      </Labeled>
      <Labeled label="Height">
        <TextField source="height" />
      </Labeled>
      <Labeled label="Price">
        <TextField source="price" />
      </Labeled>
      <Labeled label="Stock">
        <TextField source="stock" />
      </Labeled>
    </SimpleShowLayout>
  </Show>
);
