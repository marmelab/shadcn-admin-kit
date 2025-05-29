import { useListContext } from "ra-core";
import { DataTable, List, ReferenceField, Count } from "@/components/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AddressField } from "../customers/AddressField";

const storeKeyByStatus = {
  ordered: "orders.list1",
  delivered: "orders.list2",
  cancelled: "orders.list3",
};

export const OrderList = () => (
  <List
    sort={{ field: "date", order: "DESC" }}
    filterDefaultValues={{ status: "ordered" }}
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
          <Badge variant="outline">
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
          <Badge variant="outline">
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
          <Badge variant="outline">
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
);
