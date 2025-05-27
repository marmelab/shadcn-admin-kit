import { DataTable } from "@/components/admin/data-table";
import { EditButton } from "@/components/admin/edit-button";
import { List } from "@/components/admin/list";
import { ReferenceManyCount } from "@/components/admin/reference-many-count";

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
