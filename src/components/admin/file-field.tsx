import { cn } from "@/lib/utils";
import get from "lodash/get";
import {
  type ExtractRecordPaths,
  type HintedString,
  useFieldValue,
  useTranslate,
} from "ra-core";
import type { FieldProps } from "../../lib/field.type";
import { sanitizeFieldRestProps } from "./sanitizeFieldRestProps";

/**
 * Render a link to a file based on a path contained in a record field
 *
 * @example
 * import { FileField } from 'react-admin';
 *
 * <FileField source="url" title="title" />
 *
 * // renders the record { id: 123, url: 'doc.pdf', title: 'Presentation' } as
 * <div>
 *     <a href="doc.pdf" title="Presentation">Presentation</a>
 * </div>
 */
export const FileField = <
  RecordType extends Record<string, any> = Record<string, any>,
>(
  inProps: FileFieldProps<RecordType>
) => {
  const { className, emptyText, title, src, target, download, ...rest } =
    inProps;
  const sourceValue = useFieldValue(inProps);
  const titleValue =
    useFieldValue({
      ...inProps,
      // @ts-expect-error We ignore here because title might be a custom label or undefined instead of a field name
      source: title,
    })?.toString() ?? title;
  const translate = useTranslate();

  if (!sourceValue) {
    return emptyText ? (
      <span className={className} {...sanitizeFieldRestProps(rest)}>
        {emptyText && translate(emptyText, { _: emptyText })}
      </span>
    ) : (
      <div
        className={cn("inline-block", className)}
        {...sanitizeFieldRestProps(rest)}
      />
    );
  }

  if (Array.isArray(sourceValue)) {
    return (
      <ul
        className={cn("inline-block", className)}
        {...sanitizeFieldRestProps(rest)}
      >
        {sourceValue.map((file, index) => {
          const fileTitleValue = title ? get(file, title, title) : title;
          const srcValue = src ? get(file, src, title) : title;

          return (
            <li key={index}>
              <a
                href={srcValue}
                title={fileTitleValue}
                target={target}
                download={download}
                onClick={(e: any) => e.stopPropagation()}
              >
                {fileTitleValue}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className={cn("inline-block", className)}
      {...sanitizeFieldRestProps(rest)}
    >
      <a
        href={sourceValue?.toString()}
        title={titleValue}
        target={target}
        download={download}
      >
        {titleValue}
      </a>
    </div>
  );
};

export interface FileFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType> {
  src?: string;
  title?: HintedString<ExtractRecordPaths<RecordType>>;
  target?: string;
  download?: boolean | string;
  className?: string;
}
