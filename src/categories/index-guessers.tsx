import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";
import { EditGuesser } from "@/components/EditGuesser";

export const categories: ResourceProps = {
  name: "categories",
  list: ListGuesser,
  show: ShowGuesser,
  edit: EditGuesser,
  recordRepresentation: "name",
};
