import { ResourceProps } from "ra-core";
import { CategoryList } from "./CategoryList";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryCreate } from "./CategoryCreate";
import { CategoryShow } from "./CategoryShow";

export const categories: ResourceProps = {
  name: "categories",
  list: CategoryList,
  edit: CategoryEdit,
  create: CategoryCreate,
  show: CategoryShow,
  recordRepresentation: "name",
};
