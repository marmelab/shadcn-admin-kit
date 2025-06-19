import {
  AutocompleteInput,
  BooleanInput,
  Edit,
  RecordField,
  ReferenceField,
  SimpleForm,
} from "@/components/admin";
import { Basket } from "./Basket";
import { Totals } from "./Totals";

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-2">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <RecordField
              source="date"
              render={(record) => new Date(record.date).toLocaleString()}
              className="flex-1"
            />
            <RecordField source="reference" className="flex-1" />
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
          <ReferenceField
            source="customer_id"
            reference="customers"
            className="mb-4"
          >
            <RecordField
              label="Customer"
              render={(record) => `${record.first_name} ${record.last_name}`}
            />
            <RecordField
              render={(record) => (
                <a className="underline" href={`mailto:${record.email}`}>
                  {record.email}
                </a>
              )}
            />
          </ReferenceField>
          <ReferenceField source="customer_id" reference="customers">
            <RecordField
              label="Shipping Address"
              render={(record) => `${record.first_name} ${record.last_name}`}
            />
            <RecordField label={false} source="address" />
            <RecordField
              render={(record) =>
                `${record?.city}, ${record?.stateAbbr} ${record?.zipcode}`
              }
            />
          </ReferenceField>
        </div>
      </div>
      <Basket />
      <Totals />
    </SimpleForm>
  </Edit>
);
