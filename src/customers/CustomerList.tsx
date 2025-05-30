import { useRecordContext } from "ra-core";
import { DataTable, List } from "@/components/admin";
import { Badge } from "@/components/ui/badge";

export const CustomerList = () => (
  <List>
    <DataTable>
      <DataTable.Col
        label="resources.customers.fields.name"
        render={(record) => (
          <>
            {record.first_name} {record.last_name}
          </>
        )}
      />
      <DataTable.NumberCol source="nb_orders" />
      <DataTable.NumberCol
        source="total_spent"
        options={{ style: "currency", currency: "USD" }}
      />
      <DataTable.Col
        source="last_seen"
        render={(record) => new Date(record.last_seen).toLocaleString()}
      />
      <DataTable.Col label="resources.customers.fields.groups">
        <SegmentList />
      </DataTable.Col>
    </DataTable>
  </List>
);

const SegmentList = () => {
  const record = useRecordContext();
  if (!record || !record.groups) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {record.groups.map((segment: string) => (
        <Badge variant="outline" key={segment}>
          {segment}
        </Badge>
      ))}
    </div>
  );
};
