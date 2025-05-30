/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode } from "react";
import {
  useReferenceManyFieldController,
  ListContextProvider,
  ResourceContextProvider,
  useRecordContext,
  RaRecord,
  UseReferenceManyFieldControllerParams,
} from "ra-core";

export const ReferenceManyField = <
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
>(
  props: ReferenceManyFieldProps<RecordType, ReferenceRecordType>
) => {
  const {
    children,
    debounce,
    filter = defaultFilter,
    page = 1,
    pagination = null,
    perPage = 25,
    reference,
    resource,
    sort = defaultSort,
    source = "id",
    storeKey,
    target,
    queryOptions,
  } = props;
  const record = useRecordContext(props);

  const controllerProps = useReferenceManyFieldController<
    RecordType,
    ReferenceRecordType
  >({
    debounce,
    filter,
    page,
    perPage,
    record,
    reference,
    resource,
    sort,
    source,
    storeKey,
    target,
    queryOptions,
  });

  return (
    <ResourceContextProvider value={reference}>
      <ListContextProvider value={controllerProps}>
        {children}
        {pagination}
      </ListContextProvider>
    </ResourceContextProvider>
  );
};

export interface ReferenceManyFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
  ReferenceRecordType extends Record<string, any> = Record<string, any>
> extends UseReferenceManyFieldControllerParams<
    RecordType,
    ReferenceRecordType
  > {
  children: ReactNode;
  pagination?: ReactElement;
}

const defaultFilter = {};
const defaultSort = { field: "id", order: "DESC" as const };
