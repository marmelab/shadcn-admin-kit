import { ResourceProps } from "ra-core";
import { CustomerList } from "./CustomerList";
import { CustomerEdit } from "./CustomerEdit";
import { CustomerCreate } from "./CustomerCreate";
import { Users } from "lucide-react";

export const customers: ResourceProps = {
  name: "customers",
  list: CustomerList,
  edit: CustomerEdit,
  create: CustomerCreate,
  show: CustomerEdit,
  recordRepresentation: (record) => `${record.first_name} ${record.last_name}`,
  icon: Users,
};
