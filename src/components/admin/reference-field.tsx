import {
  LinkToType,
  RaRecord,
  ReferenceFieldBase,
  useFieldValue,
  useGetRecordRepresentation,
  useReferenceFieldContext,
  useTranslate,
  ExtractRecordPaths,
} from "ra-core";
import { ReactNode } from "react";
import { Link } from "react-router";
import { UseQueryOptions } from "@tanstack/react-query";

export const ReferenceField = <
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
>(
  props: ReferenceFieldProps<RecordType, ReferenceRecordType>
) => {
  const { empty } = props;
  const id = useFieldValue<RecordType>(props);
  const translate = useTranslate();

  return id == null ? (
    typeof empty === "string" ? (
      <>{empty && translate(empty, { _: empty })}</>
    ) : (
      empty
    )
  ) : (
    <ReferenceFieldBase {...props}>
      <ReferenceFieldView<ReferenceRecordType> {...props} />
    </ReferenceFieldBase>
  );
};

export interface ReferenceFieldProps<
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
> extends Partial<ReferenceFieldViewProps<ReferenceRecordType>> {
  children?: ReactNode;
  queryOptions?: UseQueryOptions<RaRecord[], Error> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: any;
  };
  record?: RecordType;
  reference: string;
  translateChoice?: ((record: ReferenceRecordType) => string) | boolean;
  link?: LinkToType;
  source: ExtractRecordPaths<RecordType>;
}

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();

export const ReferenceFieldView = <
  ReferenceRecordType extends RaRecord = RaRecord
>(
  props: ReferenceFieldViewProps<ReferenceRecordType>
) => {
  const {
    children,
    className,
    empty,
    render,
    reference,
    loading = null,
  } = props;
  const { error, link, isLoading, referenceRecord } =
    useReferenceFieldContext();
  const getRecordRepresentation = useGetRecordRepresentation(reference);
  const translate = useTranslate();

  if (error) {
    return null;
  }
  if (isLoading) {
    return loading;
  }
  if (!referenceRecord) {
    return typeof empty === "string" ? (
      <>{empty && translate(empty, { _: empty })}</>
    ) : (
      empty
    );
  }

  const child = render
    ? render(referenceRecord as ReferenceRecordType)
    : children || <span>{getRecordRepresentation(referenceRecord)}</span>;

  if (link) {
    return (
      <div className={className}>
        <Link to={link} onClick={stopPropagation}>
          {child}
        </Link>
      </div>
    );
  }

  return <>{child}</>;
};

export interface ReferenceFieldViewProps<
  ReferenceRecordType extends RaRecord = RaRecord
> {
  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  loading?: ReactNode;
  render?: (record: ReferenceRecordType) => ReactNode;
  reference: string;
  source: string;
  resource?: string;
  translateChoice?: ((record: ReferenceRecordType) => string) | boolean;
  resourceLinkPath?: LinkToType;
  error?: ReactNode;
}
