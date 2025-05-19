import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { BadgeField } from "@/components/BadgeField";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { DataTable } from "@/components/DataTable";
import { ReferenceField } from "@/components/ReferenceField";
import { ReferenceInput } from "@/components/ReferenceInput";
import { buttonVariants } from "@/components/ui/button";
import {
  ListContextProvider,
  useListController,
  FilterLiveForm,
} from "ra-core";
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

const Column = DataTable.Col<Product>;

export const ProductList = () => {
  const context = useListController<Product>();

  if (context.isLoading) {
    return null;
  }

  return (
    <ListContextProvider value={context}>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Products</h2>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Products</BreadcrumbItem>
      </Breadcrumb>
      <FilterLiveForm>
        <div className="flex items-center py-4 gap-2">
          <ReferenceInput
            source="category_id"
            reference="categories"
            sort={{ field: "name", order: "ASC" }}
          >
            <AutoCompleteInput label="Category" />
          </ReferenceInput>
        </div>
      </FilterLiveForm>
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
    </ListContextProvider>
  );
};
