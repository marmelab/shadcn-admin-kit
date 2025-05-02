import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { DataTable } from "@/components/DataTable";
import { ReferenceManyCount } from "@/components/ReferenceManyCount";
import { buttonVariants } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ListContextProvider, useListController } from "ra-core";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  productCount: number;
};

const columnHelper = createColumnHelper<Category>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("productCount", {
    header: () => "Products",
    cell: (info) => {
      return (
        <ReferenceManyCount
          reference="products"
          resource="categories"
          record={info.row.original}
          target="category_id"
          source="id"
        />
      );
    },
    meta: {
      headerClassName: "w-24",
    },
  }),
  columnHelper.accessor((row) => row.id, {
    id: "actions",
    cell: (info) => (
      <Link
        className={buttonVariants({ variant: "outline" })}
        to={info.getValue().toString()}
      >
        Edit
      </Link>
    ),
    enableSorting: false,
    header: () => <span />,
    meta: {
      headerClassName: "w-12",
    },
  }),
];

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
      <DataTable<Category> columns={columns} />
    </ListContextProvider>
  );
};
