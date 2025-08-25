import { RaRecord, useFieldValue, useTranslate } from "ra-core";
import { Badge } from "@/components/ui/badge";
import { FieldProps } from "@/lib/field.type.ts";

type BadgeProps = Parameters<typeof Badge>[0];

export const BadgeField = <RecordType extends RaRecord = RaRecord>({
  defaultValue,
  source,
  record,
  empty,
  resource: _,
  variant = "outline",
  ...rest
}: BadgeFieldProps<RecordType>) => {
  const value = useFieldValue({ defaultValue, source, record });
  const translate = useTranslate();

  if (value == null) {
    return empty && typeof empty === "string"
      ? translate(empty, { _: empty })
      : empty;
  }

  return (
    <Badge variant={variant} {...rest}>
      {typeof value !== "string" ? value.toString() : value}
    </Badge>
  );
};

export interface BadgeFieldProps<RecordType extends RaRecord = RaRecord>
  extends FieldProps<RecordType>,
    BadgeProps {
  variant?: "default" | "outline" | "secondary" | "destructive";
}
