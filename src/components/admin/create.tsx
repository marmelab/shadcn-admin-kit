import { Breadcrumb, BreadcrumbItem } from "@/components/admin/breadcrumb";
import {
  CreateBase,
  useCreatePath,
  useCreateContext,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  Translate,
} from "ra-core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const Create = ({
  title,
  children,
}: {
  title?: ReactNode | string | false;
  children: ReactNode;
}) => (
  <CreateBase>
    <CreateView title={title}>{children}</CreateView>
  </CreateBase>
);

export const CreateView = ({
  title,
  children,
}: {
  title?: ReactNode | string | false;
  children: ReactNode;
}) => {
  const context = useCreateContext();

  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The CreateView component must be used within a ResourceContextProvider"
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const listLabel = getResourceLabel(resource, 2);
  const createPath = useCreatePath();
  const listLink = createPath({
    resource,
    type: "list",
  });
  const hasDashboard = useHasDashboard();

  return (
    <>
      <Breadcrumb className="my-4">
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
        <BreadcrumbItem>
          <Translate i18nKey="ra.action.create">Create</Translate>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-start flex-wrap gap-2 my-2">
        <h2 className="text-2xl font-bold tracking-tight">
          {title !== undefined ? title : context.defaultTitle}
        </h2>
      </div>
      <div className="my-2">{children}</div>
    </>
  );
};
