import {
  ExtractRecordPaths,
  LinkToType,
  RaRecord,
  ReferenceOneFieldBase,
  SortPayload,
  TranslateFunction,
  type UseReferenceFieldControllerResult,
  UseReferenceOneFieldControllerParams,
  useFieldValue,
  useGetRecordRepresentation,
  useReferenceFieldContext,
  useTranslate,
} from "ra-core";
import { MouseEvent, ReactNode } from "react";
import { Link } from "react-router";

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) =>
  e.stopPropagation();

// might be usefull for other components
const renderEmpty = (translate: TranslateFunction, empty: ReferenceOneFieldProps['empty']) => {
  return typeof empty === "string" ? (
    <>{empty && translate(empty, { _: empty })}</>
  ) : (
    empty
  );
}

export interface ReferenceOneFieldProps<
  RecordType extends RaRecord = RaRecord,
> extends ReferenceOneFieldViewProps {
  source: ExtractRecordPaths<RecordType>;

  queryOptions?: UseReferenceOneFieldControllerParams['queryOptions']
  record?: RecordType;
  sort?: SortPayload;
  link?: LinkToType;
}

export interface ReferenceOneFieldViewProps {
  reference: string;
  source: string;
  target: string;

  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  loading?: ReactNode;
  render?: (props: UseReferenceFieldControllerResult) => ReactNode;
  error?: ReactNode;
}

export const ReferenceOneField = <
  RecordType extends RaRecord = RaRecord,
>(
  props: ReferenceOneFieldProps<RecordType>
) => {
  const { loading, error, empty, render, ...rest } = props;
  const id = useFieldValue<RecordType>(props);
  const translate = useTranslate();

  return id == null ? (
    renderEmpty(translate, empty)
  ) : (
    <ReferenceOneFieldBase {...rest}>
      <ReferenceOneFieldView
        render={render}
        loading={loading}
        error={error}
        empty={empty}
        {...rest}
      />
    </ReferenceOneFieldBase>
  );
};

export const ReferenceOneFieldView = (
  props: ReferenceOneFieldViewProps
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
    return renderEmpty(translate, empty);
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