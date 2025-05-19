import { List } from "@/components/List";
import { DataTable } from "@/components/DataTable";
import { ReferenceManyCount } from "@/components/ReferenceManyCount";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        <Column
          label="Actions"
          headerClassName="w-12"
          render={(record) => (
            <Link
              className={buttonVariants({ variant: "outline" })}
              to={(record?.id || "").toString()}
            >
              Edit
            </Link>
          )}
        />
      </DataTable>
    </List>
  );
};
