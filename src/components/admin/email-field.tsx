import { useFieldValue, useTranslate } from "ra-core";
import { AnchorHTMLAttributes, MouseEvent } from "react";
import { sanitizeFieldRestProps } from "./sanitizeFieldRestProps";

import { cn } from "@/lib/utils";
import { FieldProps } from "../../lib/field.type";
import { genericMemo } from "./genericMemo";

const EmailFieldImpl = <
  RecordType extends Record<string, any> = Record<string, any>,
>(
  inProps: EmailFieldProps<RecordType>
) => {
  const { className, emptyText, content, ...rest } = inProps;
  const value = useFieldValue(inProps);
  const translate = useTranslate();

  if (value == null) {
    return (
      <a className={className} {...sanitizeFieldRestProps(rest)}>
        {emptyText && translate(emptyText, { _: emptyText })}
      </a>
    );
  }

  return (
    <a
      className={cn("underline hover:no-underline", className)}
      href={`mailto:${value}`}
      onClick={stopPropagation}
      {...sanitizeFieldRestProps(rest)}
    >
      {content ?? value}
    </a>
  );
};
EmailFieldImpl.displayName = "EmailFieldImpl";

export const EmailField = genericMemo(EmailFieldImpl);

export interface EmailFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  content?: string;
}

// useful to prevent click bubbling in a Datagrid with rowClick
const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) =>
  e.stopPropagation();
