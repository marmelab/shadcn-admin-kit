import { ResourceProps } from "ra-core";
import { CategoryList } from "./CategoryList";
import { CategoryEdit } from "./CategoryEdit";
import { CategoryCreate } from "./CategoryCreate";
import { Bookmark } from "lucide-react";

export const categories: ResourceProps = {
  name: "categories",
  list: CategoryList,
  edit: CategoryEdit,
  create: CategoryCreate,
  recordRepresentation: "name",
  icon: Bookmark,
};
