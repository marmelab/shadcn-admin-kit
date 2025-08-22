import { useListContext } from "ra-core";
import {
  ColumnsButton,
  DataTable,
  ExportButton,
  List,
  ReferenceField,
  Count,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "@/components/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { AddressField } from "../customers/AddressField";
import { FullNameField } from "../customers/FullNameField";

const storeKeyByStatus = {
  ordered: "orders.list1",
  delivered: "orders.list2",
  cancelled: "orders.list3",
};

const ListActions = () => {
  const { filterValues } = useListContext();
  const status =
    (filterValues.status as "ordered" | "delivered" | "cancelled") ?? "ordered";
  return (
    <div className="flex items-center gap-2">
      <ColumnsButton storeKey={storeKeyByStatus[status]} />
      <ExportButton />
    </div>
  );
};

const filters = [
  <TextInput source="q" placeholder="Search" label={false} alwaysOn />,
  <ReferenceInput
    source="customer_id"
    reference="customers"
    sort={{ field: "last_name", order: "ASC" }}
    alwaysOn
  >
    <AutocompleteInput placeholder="Filter by customer" label={false} />
  </ReferenceInput>,
];

export const OrderList = () => (
  <List
    sort={{ field: "date", order: "DESC" }}
    filterDefaultValues={{ status: "ordered" }}
    filters={filters}
    perPage={25}
    actions={<ListActions />}
  >
    <TabbedDataTable />
  </List>
);

const TabbedDataTable = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;
  const handleChange = (value: string) => () => {
    setFilters({ ...filterValues, status: value }, displayedFilters);
  };
  return (
    <Tabs value={filterValues.status ?? "ordered"} className="mb-4 -gap-2">
      <TabsList className="w-full">
        <TabsTrigger value="ordered" onClick={handleChange("ordered")}>
          Ordered{" "}
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "ordered",
              }}
            />
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="delivered" onClick={handleChange("delivered")}>
          Delivered
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "delivered",
              }}
            />
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="cancelled" onClick={handleChange("cancelled")}>
          Cancelled{" "}
          <Badge variant="outline" className="hidden md:inline-flex">
            <Count
              filter={{
                ...filterValues,
                status: "cancelled",
              }}
            />
          </Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ordered">
        <OrdersTable storeKey={storeKeyByStatus.ordered} />
      </TabsContent>
      <TabsContent value="delivered">
        <OrdersTable storeKey={storeKeyByStatus.delivered} />
      </TabsContent>
      <TabsContent value="cancelled">
        <OrdersTable storeKey={storeKeyByStatus.cancelled} />
      </TabsContent>
    </Tabs>
  );
};

const OrdersTable = ({ storeKey }: { storeKey: string }) => (
  <DataTable storeKey={storeKey}>
    <DataTable.Col
      source="date"
      render={(record) => new Date(record.date).toLocaleString()}
    />
    <DataTable.Col source="reference" className="hidden md:table-cell" />
    <DataTable.Col source="customer_id" className="hidden md:table-cell">
      <ReferenceField source="customer_id" reference="customers" link={false}>
        <FullNameField />
      </ReferenceField>
    </DataTable.Col>
    <DataTable.NumberCol
      source="basket.length"
      label="resources.orders.fields.nb_items"
      className="hidden md:table-cell"
    />
    <DataTable.NumberCol
      source="total"
      options={{ style: "currency", currency: "USD" }}
    />
    <DataTable.Col
      label="resources.orders.fields.address"
      className="hidden md:table-cell"
    >
      <ReferenceField source="customer_id" reference="customers" link={false}>
        <AddressField />
      </ReferenceField>
    </DataTable.Col>
  </DataTable>
);
