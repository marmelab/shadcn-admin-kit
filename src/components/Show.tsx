import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import {
  ShowBase,
  Translate,
  useCreatePath,
  useHasDashboard,
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
  const hasDashboard = useHasDashboard();

  if (context.isLoading || !context.record) {
    return null;
  }

  return (
    <>
      <Breadcrumb>
        {hasDashboard && (
          <BreadcrumbItem>
            <Link to="/">
              <Translate i18nKey="ra.page.dashboard">Home</Translate>
            </Link>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem>
          <Link to={listLink}>{listLabel}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{recordRepresentation}</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-end flex-wrap gap-2 mb-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {context.defaultTitle}
        </h2>
        <div className="flex justify-end items-center">
          {hasEdit ? <EditButton /> : null}
        </div>
      </div>
      <div className="my-2">{children}</div>
    </>
  );
};
