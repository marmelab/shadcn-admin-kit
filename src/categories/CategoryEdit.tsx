import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import { RaInput } from "@/components/RaInput";
import { Button } from "@/components/ui/button";
import { EditBase, Form, required, useEditContext } from "ra-core";
import { Link } from "react-router-dom";

export const CategoryEdit = () => (
  <EditBase mutationMode="pessimistic">
    <CategoryEditView />
  </EditBase>
);

const CategoryEditView = () => {
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
          <Link to="/categories">Categories</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{context.record.name}</BreadcrumbItem>
      </Breadcrumb>

      <Form>
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <RaInput source="name" label="Name" validate={required()} />
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
