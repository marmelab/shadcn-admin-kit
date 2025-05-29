import {
  LinkToType,
  RaRecord,
  ReferenceFieldBase,
  useFieldValue,
  useGetRecordRepresentation,
  useReferenceFieldContext,
  useTranslate,
} from "ra-core";
import { ReactNode, memo } from "react";
import { Link } from "react-router-dom";
import { UseQueryOptions } from "@tanstack/react-query";

export const ReferenceField = (props: ReferenceFieldProps) => {
  const { empty } = props;
  const id = useFieldValue(props);
  const translate = useTranslate();

  return id == null ? (
    typeof empty === "string" ? (
      <>{empty && translate(empty, { _: empty })}</>
    ) : (
      empty
    )
  ) : (
    <ReferenceFieldBase {...props}>
      <PureReferenceFieldView {...props} />
    </ReferenceFieldBase>
  );
};

export interface ReferenceFieldProps extends Partial<ReferenceFieldViewProps> {
  children?: ReactNode;
  queryOptions?: UseQueryOptions<RaRecord[], Error> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta?: any;
  };
  reference: string;
  translateChoice?: ((record: RaRecord) => string) | boolean;
  link?: LinkToType;
  source: string;
}

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();

export const ReferenceFieldView = (props: ReferenceFieldViewProps) => {
  const { children, className, empty, reference, loading = null } = props;
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

  const child = children || (
    <span>{getRecordRepresentation(referenceRecord)}</span>
  );

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

export interface ReferenceFieldViewProps {
  children?: ReactNode;
  className?: string;
  empty?: ReactNode;
  loading?: ReactNode;
  record?: RaRecord;
  reference: string;
  source: string;
  resource?: string;
  translateChoice?: ((record: RaRecord) => string) | boolean;
  resourceLinkPath?: LinkToType;
  error?: ReactNode;
}

const PureReferenceFieldView = memo(ReferenceFieldView);
