import { AutocompleteInput } from "@/components/AutocompleteInput";
import { BadgeField } from "@/components/BadgeField";
import { DataTable } from "@/components/DataTable";
import { EditButton } from "@/components/EditButton";
import { List } from "@/components/List";
import { ReferenceField } from "@/components/ReferenceField";
import { ReferenceInput } from "@/components/ReferenceInput";

type Product = {
  id: number;
  reference: string;
  description: string;
  category_id: number;
  width: number;
  height: number;
  price: number;
  stock: number;
  thumbnail: string;
  image: string;
};

const Column = DataTable.Col<Product>;

const filters = [
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput label="Filter by category" />
  </ReferenceInput>,
];

export const ProductList = () => {
  return (
    <List filters={filters}>
      <DataTable>
        <Column source="reference" />
        <Column source="category_id">
          <ReferenceField
            reference="categories"
            source="category_id"
            link="edit"
          >
            <BadgeField source="name" />
          </ReferenceField>
        </Column>
        <Column source="stock" headerClassName="w-24" />
        <Column label="Actions" headerClassName="w-12">
          <EditButton />
        </Column>
      </DataTable>
    </List>
  );
};
