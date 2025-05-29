import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

import { AddressField } from "../customers/AddressField";

export const OrderList = () => (
  <List sort={{ field: "date", order: "DESC" }}>
    <DataTable>
      <DataTable.Col source="date" />
      <DataTable.Col source="reference" />
      <DataTable.Col source="customer_id">
        <ReferenceField source="customer_id" reference="customers" />
      </DataTable.Col>
      <DataTable.Col label="resources.orders.fields.address">
        <ReferenceField source="customer_id" reference="customers" link={false}>
          <AddressField />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.NumberCol
        source="basket.length"
        label="resources.orders.fields.nb_items"
      />
      <DataTable.NumberCol source="total" />
    </DataTable>
  </List>
);
