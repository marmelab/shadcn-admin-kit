import { useRecordContext } from "ra-core";
import get from "lodash/get";
import { Badge } from "@/components/ui/badge";

export const BadgeField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const value = get(record, source);
  return <Badge variant="outline">{value}</Badge>;
};
