import { Check, type LucideIcon, X } from "lucide-react";
import { useFieldValue, useTranslate } from "ra-core";

import type { FieldProps } from "@/lib/field.type";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

/** TODO: replace with whatever is decided by PR #144 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

/**
 * Displays a boolean value as a colored check or close icon.
 *
 * @see {@link https://marmelab.com/react-admin/BooleanField.html BooleanField documentation}
 *
 * @example
 * import { Show, SimpleShowLayout, BooleanField } from '@/components/admin-ui';
 *
 * const PostShow = () => (
 *   <Show>
 *     <SimpleShowLayout>
 *       <BooleanField source="is_published" />
 *       <BooleanField source="allow_comments" />
 *     </SimpleShowLayout>
 *   </Show>
 * );
 */
export const BooleanField = <RecordType extends AnyRecord = AnyRecord>({
  source,
  record,
  defaultValue,
  className,
  TrueIcon = Check,
  FalseIcon = X,
  valueLabelFalse = "false",
  valueLabelTrue = "true",
  looseValue = false,
  empty = null,
}: BooleanFieldProps<RecordType>) => {
  const value = useFieldValue({ source, record, defaultValue });
  const isTruthyValue = value === true || (looseValue && value);
  const baseClassName = "size-5 text-foreground";

  if (looseValue || typeof value === "boolean") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isTruthyValue ? (
              TrueIcon ? (
                <TrueIcon className={cn(baseClassName, className)} />
              ) : (
                <div />
              )
            ) : FalseIcon ? (
              <FalseIcon className={cn(baseClassName, className)} />
            ) : (
              <div />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <RenderLabel
              value={!!value}
              valueLabelFalse={valueLabelFalse}
              valueLabelTrue={valueLabelTrue}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <>{empty}</>;
};

function RenderLabel({
  value,
  valueLabelTrue,
  valueLabelFalse,
}: Pick<BooleanFieldProps, "valueLabelFalse" | "valueLabelTrue"> & {
  value: boolean;
}) {
  const translate = useTranslate();

  let label = value ? valueLabelTrue : valueLabelFalse;
  if (typeof label === "string") {
    label = translate(label, { _: label });
  }
  if (!label) {
    label = value ? "ra.boolean.true" : "ra.boolean.false";
  }

  return <p>{label}</p>;
}

export interface BooleanFieldProps<
  RecordType extends AnyRecord = AnyRecord,
> extends FieldProps<RecordType> {
  className?: string;
  defaultValue?: unknown;
  TrueIcon?: LucideIcon | null;
  FalseIcon?: LucideIcon | null;
  valueLabelTrue?: string;
  valueLabelFalse?: string;
  looseValue?: boolean;
}
