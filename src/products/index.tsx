import { ResourceProps } from "ra-core";
import { ProductList } from "./ProductList";
import { ProductEdit } from "./ProductEdit";
import { ProductCreate } from "./ProductCreate";
import { ProductShow } from "./ProductShow";
import { Images } from "lucide-react";

export const products: ResourceProps = {
  name: "products",
  list: ProductList,
  edit: ProductEdit,
  create: ProductCreate,
  show: ProductShow,
  recordRepresentation: "reference",
  icon: Images,
};
