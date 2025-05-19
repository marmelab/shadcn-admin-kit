import { ResourceProps } from "ra-core";
import { ProductList } from "./ProductList";
import { ProductEdit } from "./ProductEdit";
import { ProductCreate } from "./ProductCreate";

export const products: ResourceProps = {
  name: "products",
  list: ProductList,
  edit: ProductEdit,
  create: ProductCreate,
  recordRepresentation: "reference",
};
