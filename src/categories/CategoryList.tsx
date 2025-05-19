import { DataTable } from "@/components/DataTable";
import { EditButton } from "@/components/EditButton";
import { List } from "@/components/List";
import { ReferenceManyCount } from "@/components/ReferenceManyCount";

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
        <Column source="productCount" headerClassName="w-24" disableSort>
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
