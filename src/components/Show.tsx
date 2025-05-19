import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import {
  ShowBase,
  useCreatePath,
  useShowContext,
  useGetRecordRepresentation,
  useGetResourceLabel,
  useResourceContext,
  useResourceDefinition,
} from "ra-core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { EditButton } from "@/components/EditButton";

export const Show = ({ children }: { children: ReactNode }) => (
  <ShowBase>
    <ShowView>{children}</ShowView>
  </ShowBase>
);

export const ShowView = ({ children }: { children: ReactNode }) => {
  const context = useShowContext();

  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The ShowView component must be used within a ResourceContextProvider"
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

  const { hasEdit } = useResourceDefinition({ resource });

  if (context.isLoading || !context.record) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight mb-2">
        {context.defaultTitle}
      </h2>
      <div className="flex justify-between items-center my-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={listLink}>{listLabel}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{recordRepresentation}</BreadcrumbItem>
        </Breadcrumb>
        {hasEdit ? <EditButton /> : null}
      </div>
      <div className="my-2">{children}</div>
    </>
  );
};
