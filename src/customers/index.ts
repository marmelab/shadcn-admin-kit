import { ResourceProps } from "ra-core";
import { CustomerList } from "./CustomerList";
import { EditGuesser, ShowGuesser } from "@/components/admin";
import { Users } from "lucide-react";

export const customers: ResourceProps = {
  name: "customers",
  list: CustomerList,
  edit: EditGuesser,
  show: ShowGuesser,
  recordRepresentation: (record) => `${record.first_name} ${record.last_name}`,
  icon: Users,
};
