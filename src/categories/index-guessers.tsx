import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";

export const categories: ResourceProps = {
  name: "categories",
  list: ListGuesser,
  recordRepresentation: "name",
};
