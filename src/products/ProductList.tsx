import { BadgeField } from "@/components/BadgeField";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { DataTable } from "@/components/DataTable";
import { ReferenceField } from "@/components/ReferenceField";
import { buttonVariants } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { ListContextProvider, useListController } from "ra-core";
import { Link } from "react-router-dom";

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

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("reference", {
    header: () => "Reference",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category_id", {
    header: () => "Category",
    cell: (info) => {
      return (
        <ReferenceField
          reference="categories"
          record={info.row.original}
          source="category_id"
          link="edit"
        >
          <BadgeField source="name" />
        </ReferenceField>
      );
    },
  }),
  columnHelper.accessor("stock", {
    header: () => "Stock",
    cell: (info) => info.renderValue(),
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

export const ProductList = () => {
  const context = useListController<Product>();

  if (context.isLoading) {
    return null;
  }

  return (
    <ListContextProvider value={context}>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Products</h2>
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>
      <DataTable<Product> columns={columns} />
    </ListContextProvider>
  );
};
