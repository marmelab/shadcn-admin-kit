import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";

export const categories: ResourceProps = {
  name: "categories",
  list: ListGuesser,
  show: ShowGuesser,
  recordRepresentation: "name",
};
