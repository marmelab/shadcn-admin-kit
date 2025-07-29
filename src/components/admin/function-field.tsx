import { RaRecord, useRecordContext } from "ra-core";

export type FunctionFieldProps<T extends RaRecord = RaRecord> = {
  render: (record: T) => React.ReactNode;
  record?: T;
};

export function FunctionField<T extends RaRecord = RaRecord>({
  render,
  record: recordOverride = undefined,
}: FunctionFieldProps<T>) {
  const record = useRecordContext<T>();

  const value = recordOverride ?? record;
  return !value ? null : render(value);
}
