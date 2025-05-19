import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import {
  EditBase,
  useCreatePath,
  useEditContext,
  useGetRecordRepresentation,
  useGetResourceLabel,
  useResourceContext,
} from "ra-core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Edit = ({ children }: { children: ReactNode }) => (
  <EditBase mutationMode="pessimistic">
    <EditView>{children}</EditView>
  </EditBase>
);

export const EditView = ({ children }: { children: ReactNode }) => {
  const context = useEditContext();

  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The EditView component must be used within a ResourceContextProvider"
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const listLabel = getResourceLabel(resource, 2);
  const createPath = useCreatePath();
  const listLink = createPath({
    resource,
    type: "list",
  });

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const recordRepresentation = getRecordRepresentation(context.record);

  if (context.isLoading || !context.record) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {context.defaultTitle}
      </h2>
      <Breadcrumb className="my-4">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={listLink}>{listLabel}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{recordRepresentation}</BreadcrumbItem>
      </Breadcrumb>
      {children}
    </>
  );
};
