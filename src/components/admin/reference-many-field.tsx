import { ReactElement, ReactNode } from "react";
import {
  useReferenceManyFieldController,
  ListContextProvider,
  ResourceContextProvider,
  useRecordContext,
  RaRecord,
  UseReferenceManyFieldControllerParams,
  ListControllerResult,
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
    render,
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
        {render && render(controllerProps)}
        {children}
        {pagination}
      </ListContextProvider>
    </ResourceContextProvider>
  );
};

export interface ReferenceManyFieldProps<
  RecordType extends RaRecord = RaRecord,
  ReferenceRecordType extends RaRecord = RaRecord
> extends UseReferenceManyFieldControllerParams<
    RecordType,
    ReferenceRecordType
  > {
  children?: ReactNode;
  render?: (props: ListControllerResult<ReferenceRecordType>) => ReactNode;
  pagination?: ReactElement;
}

const defaultFilter = {};
const defaultSort = { field: "id", order: "DESC" as const };
