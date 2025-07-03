import { ResourceProps } from "ra-core";
import { DollarSign } from "lucide-react";
import { OrderList } from "./OrderList";
import { OrderEdit } from "./OrderEdit";

export const orders: ResourceProps = {
  name: "orders",
  list: OrderList,
  edit: OrderEdit,
  recordRepresentation: "reference",
  icon: DollarSign,
};
