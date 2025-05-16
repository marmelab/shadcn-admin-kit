import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { DataTable } from "@/components/DataTable";
import { ReferenceManyCount } from "@/components/ReferenceManyCount";
import { buttonVariants } from "@/components/ui/button";
import { ListContextProvider, useListController } from "ra-core";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  productCount: number;
};

const Column = DataTable.Col<Category>;

export const CategoryList = () => {
  const context = useListController<Category>();
  if (context.isLoading) {
    return null;
  }

  return (
    <ListContextProvider value={context}>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Categories</h2>
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Categories</BreadcrumbItem>
      </Breadcrumb>
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
    </ListContextProvider>
  );
};
