import {
  AutocompleteInput,
  BooleanInput,
  Edit,
  RecordField,
  ReferenceField,
  SimpleForm,
} from "@/components/admin";
import { RecordRepresentation } from "ra-core";
import { Link } from "react-router";
import { Basket } from "./Basket";
import { Totals } from "./Totals";

export const OrderEdit = () => (
  <Edit>
    <SimpleForm className="max-w-xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <RecordField
              source="date"
              render={(record) => new Date(record.date).toLocaleString()}
              className="flex-1 md:text-sm"
            />
            <RecordField source="reference" className="flex-1 md:text-sm" />
          </div>
          <AutocompleteInput
            source="status"
            choices={[
              { id: "ordered", name: "Ordered" },
              { id: "delivered", name: "Delivered" },
              { id: "cancelled", name: "Cancelled" },
            ]}
            className="mb-4"
          />
          <BooleanInput source="returned" />
        </div>
        <div className="flex-1">
          <div className="text-xs opacity-75">Customer</div>
          <ReferenceField
            source="customer_id"
            reference="customers"
            link={false}
            render={({ referenceRecord }) => (
              <div className="mb-4 md:text-sm">
                <Link to={`/customers/${referenceRecord?.id}`}>
                  <RecordRepresentation />
                </Link>
                <br />
                <a
                  className="underline md:text-sm"
                  href={`mailto:${referenceRecord?.email}`}
                >
                  {referenceRecord?.email}
                </a>
              </div>
            )}
          />
          <div className="text-xs opacity-75">Shipping Address</div>
          <ReferenceField
            source="customer_id"
            reference="customers"
            render={({ referenceRecord }) =>
              referenceRecord && (
                <div className="md:text-sm">
                  {referenceRecord.address}
                  <br />
                  {referenceRecord.city}, {referenceRecord.stateAbbr}{" "}
                  {referenceRecord.zipcode}
                </div>
              )
            }
          ></ReferenceField>
        </div>
      </div>
      <Basket />
      <Totals />
    </SimpleForm>
  </Edit>
);
