import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";

export const products: ResourceProps = {
  name: "products",
  list: ListGuesser,
  show: ShowGuesser,
  recordRepresentation: "reference",
};
