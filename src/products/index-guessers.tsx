import { ResourceProps } from "ra-core";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";
import { EditGuesser } from "@/components/EditGuesser";

export const products: ResourceProps = {
  name: "products",
  list: ListGuesser,
  show: ShowGuesser,
  edit: EditGuesser,
  recordRepresentation: "reference",
};
