import { ExtractRecordPaths, RaRecord, useFieldValue } from "ra-core";
import { ReactElement } from "react";

export const TextField = <RecordType extends RaRecord = RaRecord>(
  props: TextFieldProps<RecordType>
) => {
  const value = useFieldValue(props);
  return (
    <span className={props.className}>
      {value != null && typeof value !== "string" ? value.toString() : value}
    </span>
  );
};

export interface TextFieldProps<RecordType extends RaRecord = RaRecord> {
  className?: string;
  source: ExtractRecordPaths<RecordType>;
  label?: string | ReactElement | boolean;
  record?: RecordType;
  resource?: string;
}
