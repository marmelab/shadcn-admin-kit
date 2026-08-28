import { useRecordContext } from "ra-core";
import type { Customer } from "../types";

export const AddressField = () => {
  const record = useRecordContext<Customer>();

  return record ? (
    <span>
      {record.address}, {record.city}, {record.stateAbbr} {record.zipcode}
    </span>
  ) : null;
};
