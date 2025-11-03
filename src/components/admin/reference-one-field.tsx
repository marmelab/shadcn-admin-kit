import {
  LinkToType,
  RaRecord,
  type UseReferenceFieldControllerResult,
  useFieldValue,
  useGetRecordRepresentation,
  useReferenceFieldContext,
  useTranslate,
  ExtractRecordPaths,
  ReferenceOneFieldBase,
  SortPayload,
  UseReferenceOneFieldControllerParams,
} from "ra-core";
import { MouseEvent, ReactNode } from "react";
import { Link } from "react-router";

export const ReferenceOneField = <
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
>(
  props: ReferenceOneFieldProps<RecordType, ReferenceRecordType>
) => {
  const { loading, error, empty, render, ...rest } = props;
  const id = useFieldValue<RecordType>(props);
  const translate = useTranslate();

  return id == null ? (
    typeof empty === "string" ? (
      <>{empty && translate(empty, { _: empty })}</>
    ) : (
      empty
    )
  ) : (
    <ReferenceOneFieldBase {...rest}>
      <ReferenceOneFieldView<ReferenceRecordType>
        render={render}
        loading={loading}
        error={error}
        empty={empty}
        {...rest}
      />
    </ReferenceOneFieldBase>
  );
};

export interface ReferenceOneFieldProps<
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
> extends Partial<ReferenceOneFieldViewProps<ReferenceRecordType>> {
  children?: ReactNode;
  queryOptions?: UseReferenceOneFieldControllerParams['queryOptions']
  record?: RecordType;
  sort?: SortPayload;
  reference: string;
  translateChoice?: ((record: ReferenceRecordType) => string) | boolean;
  link?: LinkToType;
  source: ExtractRecordPaths<RecordType>;
  target: string;
}

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) =>
  e.stopPropagation();

export const ReferenceOneFieldView = <
  ReferenceRecordType extends RaRecord = RaRecord
>(
  props: ReferenceOneFieldViewProps<ReferenceRecordType>
) => {
  const {
    children,
    className,
    empty,
    error: errorElement,
    render,
    reference,
    loading,
  } = props;
  const referenceFieldContext = useReferenceFieldContext();
  const { error, link, isPending, referenceRecord } = referenceFieldContext;
  const getRecordRepresentation = useGetRecordRepresentation(reference);
  const translate = useTranslate();

  if (error && errorElement !== false) {
    return errorElement;
  }
  if (isPending && loading !== false) {
    return loading;
  }
  if (!referenceRecord && empty !== false) {
    return typeof empty === "string" ? (
      <>{empty && translate(empty, { _: empty })}</>
    ) : (
      empty
    );
  }

  const child = render
    ? render(referenceFieldContext)
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

export interface ReferenceOneFieldViewProps<
  ReferenceRecordType extends RaRecord = RaRecord
> {
  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  loading?: ReactNode;
  render?: (props: UseReferenceFieldControllerResult) => ReactNode;
  reference: string;
  source: string;
  target: string;
  resource?: string;
  translateChoice?: ((record: ReferenceRecordType) => string) | boolean;
  resourceLinkPath?: LinkToType;
  error?: ReactNode;
}
