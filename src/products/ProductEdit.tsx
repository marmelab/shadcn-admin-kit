import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { RaInput } from "@/components/RaInput";
import { ReferenceInput } from "@/components/ReferenceInput";
import { Button } from "@/components/ui/button";
import { EditBase, Form, required, useEditContext } from "ra-core";
import { Link } from "react-router-dom";

export const ProductEdit = () => (
  <EditBase mutationMode="pessimistic">
    <ProductEditView />
  </EditBase>
);

const ProductEditView = () => {
  const context = useEditContext();

  if (context.isLoading || !context.record) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {context.record.reference}
      </h2>
      <Breadcrumb className="mb-8">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/products">Products</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{context.record.reference}</BreadcrumbItem>
      </Breadcrumb>

      <Form>
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <RaInput source="reference" label="Reference" validate={required()} />
          <ReferenceInput source="category_id" reference="categories">
            <AutoCompleteInput label="Category" />
          </ReferenceInput>
          <div className="flex flex-row gap-4">
            <Button className="btn btn-primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};
