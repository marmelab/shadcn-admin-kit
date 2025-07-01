import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { ReferenceField } from "@/components/admin/reference-field";

import { FullNameField } from "../customers/FullNameField";
import { StarRatingField } from "./StarRatingField";
import type { Review } from "../types";

export const ReviewList = () => (
  <List sort={{ field: "date", order: "DESC" }} perPage={25}>
    <DataTable
      rowClassName={(record: Review) => {
        if (record.status === "accepted") {
          return "border-l-green-400 dark:border-l-green-800 border-l-5";
        }
        if (record.status === "rejected") {
          return "border-l-red-400 dark:border-l-red-800 border-l-5";
        }
        return "border-l-yellow-400 dark:border-l-yellow-800 border-l-5";
      }}
      className="[&_thead_tr]:border-l-transparent [&_thead_tr]:border-l-5"
    >
      <DataTable.Col
        source="date"
        render={(record) => new Date(record.date).toLocaleDateString()}
      />
      <DataTable.Col source="customer_id">
        <ReferenceField source="customer_id" reference="customers">
          <FullNameField />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="product_id">
        <ReferenceField source="product_id" reference="products" />
      </DataTable.Col>
      <DataTable.Col
        source="rating"
        render={() => <StarRatingField size="small" />}
      />
      <DataTable.Col
        source="comment"
        cellClassName="max-w-[18em] overflow-hidden text-ellipsis whitespace-nowrap"
      />
      <DataTable.Col source="status" />
    </DataTable>
  </List>
);
