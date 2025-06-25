import {
  EditButton,
  CreateButton,
  Breadcrumb,
  BreadcrumbItem,
} from "@/components/admin";
import { useListController, useGetResourceLabel, Translate } from "ra-core";
import type { Category } from "@/types";
import { humanize } from "inflection";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const { data } = useListController<Category>({ perPage: 100 });
  const getResourceLabel = useGetResourceLabel();
  if (!data) {
    return null;
  }
  return (
    <div className="my-2">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">
            <Translate i18nKey="ra.page.dashboard">Home</Translate>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{getResourceLabel("categories", 2)}</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-start flex-wrap gap-2 my-2">
        <h2 className="text-2xl font-bold tracking-tight">
          <Translate i18nKey="ra.page.list" options={{ name: "Categories" }} />
        </h2>
        <div className="flex items-center gap-2">
          <CreateButton />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 my-2">
        {data.map((category) => (
          <div key={category.id} className="p-4 border rounded">
            <img
              src={`https://marmelab.com/posters/${category.name}-1.jpeg`}
              alt={category.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">{humanize(category.name)}</h3>
              <EditButton record={category} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
