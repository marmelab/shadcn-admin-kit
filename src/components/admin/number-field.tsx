/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractRecordPaths, RaRecord, useFieldValue } from "ra-core";
import { ReactNode } from "react";

export const NumberField = <RecordType extends RaRecord = RaRecord>(
  props: NumberFieldProps<RecordType>
) => {
  let value = useFieldValue(props);
  const {
    className,
    locales,
    options,
    empty = null,
    transform = defaultTransform,
  } = props;
  if (value == null) {
    return empty;
  }
  if (transform) {
    value = transform(value);
  }
  return (
    <span className={className}>
      {hasNumberFormat && typeof value === "number"
        ? value.toLocaleString(locales, options)
        : value}
    </span>
  );
};

export interface NumberFieldProps<RecordType extends RaRecord = RaRecord> {
  className?: string;
  empty?: ReactNode;
  source: ExtractRecordPaths<RecordType>;
  record?: RecordType;
  resource?: string;
  locales?: string | string[];
  options?: object;
  transform?: (value: any) => number;
}

const defaultTransform = (value: any) =>
  value && typeof value === "string" && !isNaN(value as any) ? +value : value;

const hasNumberFormat = !!(
  typeof Intl === "object" &&
  Intl &&
  typeof Intl.NumberFormat === "function"
);
