import * as React from "react";
import { type ReactNode, type ElementType } from "react";
import {
  FieldTitle,
  useRecordContext,
  useResourceContext,
  useTranslate,
  type ExtractRecordPaths,
  type HintedString,
} from "ra-core";
import { cn } from "@/lib/utils";

import { TextField } from "@/components/admin/text-field";

export const RecordField = <
  RecordType extends Record<string, any> = Record<string, any>
>(
  props: RecordFieldProps<RecordType>
) => {
  const {
    children,
    className,
    empty,
    field,
    label,
    render,
    source,
    variant,
    ...rest
  } = props;
  const resource = useResourceContext();
  const record = useRecordContext<RecordType>(props);
  const translate = useTranslate();
  if (!source && !label && !render) return null;
  return (
    <div
      className={cn(
        className,
        "flex",
        variant === "inline" ? "flex-row" : "flex-col"
      )}
      {...rest}
    >
      {label !== "" && label !== false ? (
        <div
          className={cn(
            variant === "inline" ? "block min-w-50" : "text-xs",
            "opacity-75"
          )}
        >
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={false}
          />
        </div>
      ) : null}
      {children ? (
        <span className="flex-1">{children}</span>
      ) : render ? (
        record && (
          <span className="flex-1">
            {render(record) ||
              (typeof empty === "string"
                ? translate(empty, { _: empty })
                : empty)}
          </span>
        )
      ) : field ? (
        React.createElement(field, {
          source,
          empty,
          className: "flex-1",
        })
      ) : source ? (
        <TextField
          source={source}
          empty={empty}
          resource={resource}
          className="flex-1"
        />
      ) : null}
    </div>
  );
};

// FIXME remove custom type when using TypeScript >= 5.4 as it is now native
type NoInfer<T> = T extends infer U ? U : never;

export interface RecordFieldProps<
  RecordType extends Record<string, any> = Record<string, any>
> {
  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  field?: ElementType;
  label?: ReactNode;
  render?: (record: RecordType) => React.ReactNode;
  source?: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  record?: RecordType;
  variant?: "default" | "inline";
}
