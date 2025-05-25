import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import {
  EditBase,
  Translate,
  useCreatePath,
  useEditContext,
  useGetRecordRepresentation,
  useGetResourceLabel,
  useResourceContext,
  useResourceDefinition,
} from "ra-core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShowButton } from "@/components/ShowButton";

export const Edit = ({ children }: { children: ReactNode }) => (
  <EditBase>
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

  const { hasShow } = useResourceDefinition({ resource });

  if (context.isLoading || !context.record) {
    return null;
  }

  return (
    <>
      <h2 className="text-2xl font-bold tracking-tight">
        {context.defaultTitle}
      </h2>
      <div className="flex justify-between items-center my-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">
              <Translate i18nKey="ra.page.dashboard">Home</Translate>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={listLink}>{listLabel}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{recordRepresentation}</BreadcrumbItem>
        </Breadcrumb>
        {hasShow ? <ShowButton /> : null}
      </div>
      <div className="my-2">{children}</div>
    </>
  );
};
