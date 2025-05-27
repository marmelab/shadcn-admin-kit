import { ExtractRecordPaths, RaRecord, useFieldValue } from "ra-core";
import { ReactNode } from "react";

export const TextField = <RecordType extends RaRecord = RaRecord>(
  props: TextFieldProps<RecordType>
) => {
  const value = useFieldValue(props);
  return (
    <span className={props.className}>
      {value != null && typeof value !== "string"
        ? value.toString()
        : value ?? props.empty}
    </span>
  );
};

export interface TextFieldProps<RecordType extends RaRecord = RaRecord> {
  className?: string;
  empty?: ReactNode;
  source: ExtractRecordPaths<RecordType>;
  record?: RecordType;
  resource?: string;
}
