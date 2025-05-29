import { ResourceProps } from "ra-core";
import { OrderList } from "./OrderList";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";
import { DollarSign } from "lucide-react";

export const orders: ResourceProps = {
  name: "orders",
  list: OrderList,
  edit: EditGuesser,
  show: ShowGuesser,
  recordRepresentation: "reference",
  icon: DollarSign,
};
