import { ReactNode } from "react";
import {
  ListContextProvider,
  useList,
  useFieldValue,
  RaRecord,
  UseListOptions,
  UseFieldValueOptions,
} from "ra-core";

export const ArrayField = <RecordType extends RaRecord = RaRecord>({
  defaultValue,
  source,
  resource,
  perPage,
  sort,
  filter,
  children,
}: ArrayFieldProps<RecordType>) => {
  const data: RecordType[] = useFieldValue({ defaultValue, source }) || [];
  const listContext = useList({
    resource,
    perPage,
    sort,
    filter,
    data,
  });

  return (
    <ListContextProvider value={listContext}>{children}</ListContextProvider>
  );
};

export type ArrayFieldProps<
  RecordType extends RaRecord = RaRecord,
  ErrorType = Error
> = Pick<
  UseListOptions<RecordType, ErrorType>,
  "perPage" | "sort" | "filter" | "resource"
> &
  Pick<UseFieldValueOptions<RecordType>, "defaultValue" | "source"> & {
    children?: ReactNode;
  };
