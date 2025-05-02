import {
  CreatePathType,
  Identifier,
  LinkToType,
  RaRecord,
  RecordContextProvider,
  ResourceContextProvider,
  UseReferenceResult,
  useCreatePath,
  useGetRecordRepresentation,
  useRecordContext,
  useReference,
  useResourceDefinition,
  useTranslate,
} from "ra-core";
import { ReactNode, memo } from "react";
import { Link } from "react-router-dom";
import { UseQueryOptions } from "@tanstack/react-query";
import get from "lodash/get";

export const ReferenceField = (props: ReferenceFieldProps) => {
  const { source, emptyText, link = "edit", ...rest } = props;
  const record = useRecordContext(props);
  const id = get(record, source);
  const translate = useTranslate();

  return id == null ? (
    emptyText ? (
      <span>{emptyText && translate(emptyText, { _: emptyText })}</span>
    ) : null
  ) : (
    <NonEmptyReferenceField
      {...rest}
      link={link}
      emptyText={emptyText}
      source={source}
      record={record}
      id={id as Identifier}
    />
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

/**
 * This intermediate component is made necessary by the useReference hook,
 * which cannot be called conditionally when get(record, source) is empty.
 */
export const NonEmptyReferenceField = ({
  children,
  id,
  reference,
  queryOptions,
  link,
  ...props
}: ReferenceFieldProps & {
  id: Identifier;
}) => {
  return (
    <ResourceContextProvider value={reference}>
      <PureReferenceFieldView
        reference={reference}
        {...props}
        {...useReference({
          reference,
          id,
          options: queryOptions,
        })}
        resourceLinkPath={link}
      >
        {children}
      </PureReferenceFieldView>
    </ResourceContextProvider>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();

export const ReferenceFieldView = (props: ReferenceFieldViewProps) => {
  const {
    children,
    className,
    emptyText,
    error,
    isLoading,
    reference,
    referenceRecord,
    resourceLinkPath,
  } = props;
  const getRecordRepresentation = useGetRecordRepresentation(reference);
  const translate = useTranslate();
  const createPath = useCreatePath();
  const resourceDefinition = useResourceDefinition({ resource: reference });

  if (error) {
    return null;
  }
  if (isLoading) {
    return null;
  }
  if (!referenceRecord) {
    return emptyText ? (
      <>{emptyText && translate(emptyText, { _: emptyText })}</>
    ) : null;
  }

  const link =
    resourceLinkPath === false ||
    (resourceLinkPath === "edit" && !resourceDefinition.hasEdit) ||
    (resourceLinkPath === "show" && !resourceDefinition.hasShow)
      ? false
      : createPath({
          resource: reference,
          id: referenceRecord.id,
          type:
            typeof resourceLinkPath === "function"
              ? (resourceLinkPath(referenceRecord, reference) as CreatePathType)
              : (resourceLinkPath as CreatePathType),
        });

  const child = children || (
    <span>{getRecordRepresentation(referenceRecord)}</span>
  );

  if (link) {
    return (
      <div className={className}>
        <RecordContextProvider value={referenceRecord}>
          <Link to={link} onClick={stopPropagation}>
            {child}
          </Link>
        </RecordContextProvider>
      </div>
    );
  }

  return (
    <RecordContextProvider value={referenceRecord}>
      {child}
    </RecordContextProvider>
  );
};

export interface ReferenceFieldViewProps extends UseReferenceResult {
  children?: ReactNode;
  className?: string;
  emptyText?: string;
  record?: RaRecord;
  reference: string;
  source: string;
  resource?: string;
  translateChoice?: ((record: RaRecord) => string) | boolean;
  resourceLinkPath?: LinkToType;
}

const PureReferenceFieldView = memo(ReferenceFieldView);
