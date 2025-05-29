import {
  DataTable,
  EditButton,
  List,
  ReferenceManyCount,
} from "@/components/admin";

type Category = {
  id: number;
  name: string;
  productCount: number;
};

const Column = DataTable.Col<Category>;

export const CategoryList = () => {
  return (
    <List>
      <DataTable>
        <Column source="name" />
        <Column
          source="productCount"
          headerClassName="w-24 text-right"
          cellClassName="text-right"
          disableSort
        >
          <ReferenceManyCount
            reference="products"
            resource="categories"
            target="category_id"
            source="id"
          />
        </Column>
        <Column label="Actions" headerClassName="w-12">
          <EditButton />
        </Column>
      </DataTable>
    </List>
  );
};
