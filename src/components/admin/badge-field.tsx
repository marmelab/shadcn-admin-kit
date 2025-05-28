import { ExtractRecordPaths, RaRecord, useFieldValue } from "ra-core";
import { Badge } from "@/components/ui/badge";

export const BadgeField = <RecordType extends RaRecord = RaRecord>(
  props: BadgeFieldProps<RecordType>
) => {
  const value = useFieldValue(props);
  const { className, variant = "outline" } = props;
  return (
    <Badge className={className} variant={variant}>
      {value != null && typeof value !== "string" ? value.toString() : value}
    </Badge>
  );
};

export interface BadgeFieldProps<RecordType extends RaRecord = RaRecord> {
  className?: string;
  source: ExtractRecordPaths<RecordType>;
  record?: RecordType;
  resource?: string;
  variant?: "default" | "outline" | "secondary" | "destructive";
}
