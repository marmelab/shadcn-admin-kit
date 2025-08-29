import { HTMLAttributes } from "react";
import { RaRecord, useFieldValue, useTranslate } from "ra-core";
import { FieldProps } from "@/lib/field.type.ts";

export const TextField = <RecordType extends RaRecord = RaRecord>({
  defaultValue,
  source,
  record,
  empty,
  resource: _,
  ...rest
}: TextFieldProps<RecordType>) => {
  const value = useFieldValue({ defaultValue, source, record });
  const translate = useTranslate();

  if (value == null) {
    if (!empty) {
      return null;
    }

    return (
      <span {...rest}>
        {typeof empty === "string" ? translate(empty, { _: empty }) : empty}
      </span>
    );
  }

  return (
    <span {...rest}>
      {typeof value !== "string" ? value.toString() : value}
    </span>
  );
};

export interface TextFieldProps<RecordType extends RaRecord = RaRecord>
  extends FieldProps<RecordType>,
    HTMLAttributes<HTMLSpanElement> {}
