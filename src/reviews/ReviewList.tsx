import {
  DataTable,
  List,
  ReferenceField,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "@/components/admin";

import { FullNameField } from "../customers/FullNameField";
import { StarRatingField } from "./StarRatingField";
import type { Review } from "../types";
import { cn } from "@/lib/utils";

const filters = [
  <TextInput source="q" placeholder="Search" label={false} />,
  <ReferenceInput
    source="customer_id"
    reference="customers"
    sort={{ field: "last_name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by customer" label={false} />
  </ReferenceInput>,
  <ReferenceInput
    source="product_id"
    reference="products"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by product" label={false} />
  </ReferenceInput>,
  <AutocompleteInput
    source="status"
    placeholder="Filter by status"
    choices={[
      { id: "accepted", name: "Accepted" },
      { id: "rejected", name: "Rejected" },
      { id: "pending", name: "Pending" },
    ]}
    optionText={(choice) => (
      <>
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            choice.id === "accepted"
              ? "bg-green-400 dark:bg-green-800"
              : choice.id === "rejected"
              ? "bg-red-400 dark:bg-red-800"
              : "bg-yellow-400 dark:bg-yellow-800"
          )}
        />
        {choice.name}
      </>
    )}
    label={false}
  />,
];

export const ReviewList = () => (
  <List sort={{ field: "date", order: "DESC" }} perPage={25} filters={filters}>
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
