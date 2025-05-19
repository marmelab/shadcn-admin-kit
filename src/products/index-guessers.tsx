import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";

export const products: ResourceProps = {
  name: "products",
  list: ListGuesser,
  recordRepresentation: "reference",
};
