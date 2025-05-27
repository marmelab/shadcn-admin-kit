import { AutocompleteInput } from "@/components/AutocompleteInput";
import { BadgeField } from "@/components/BadgeField";
import { DataTable } from "@/components/DataTable";
import { EditButton } from "@/components/EditButton";
import { List } from "@/components/List";
import { ReferenceField } from "@/components/ReferenceField";
import { ReferenceInput } from "@/components/ReferenceInput";
import { TextInput } from "@/components/TextInput";

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

const filters = [
  <TextInput source="q" placeholder="Search products..." label={false} />,
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by category" label={false} />
  </ReferenceInput>,
];

const Column = DataTable.Col<Product>;

export const ProductList = () => {
  return (
    <List filters={filters} sort={{ field: "reference", order: "ASC" }}>
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
        <Column
          source="width"
          headerClassName="text-right"
          cellClassName="text-right"
          render={(record) => record.width?.toLocaleString()}
        />
        <Column
          source="height"
          headerClassName="text-right"
          cellClassName="text-right"
          render={(record) => record.height?.toLocaleString()}
        />
        <Column
          source="price"
          headerClassName="text-right"
          cellClassName="text-right"
          render={(record) =>
            record.price?.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })
          }
        />
        <Column
          source="stock"
          headerClassName="text-right"
          cellClassName="text-right"
        />
        <Column label="Actions" headerClassName="w-12">
          <EditButton />
        </Column>
      </DataTable>
    </List>
  );
};
