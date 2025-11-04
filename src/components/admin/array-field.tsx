// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { ReactNode } from "react";
import {
  ListContextProvider,
  useList,
  useFieldValue,
  RaRecord,
  UseListOptions,
  UseFieldValueOptions,
} from "ra-core";

export const ArrayField = <RecordType extends RaRecord = RaRecord>(
  props: ArrayFieldProps<RecordType>,
) => {
  const { children, resource, perPage, sort, filter } = props;
  const data = useFieldValue(props) || emptyArray;
  const listContext = useList({ data, resource, perPage, sort, filter });

  return (
    <ListContextProvider value={listContext}>{children}</ListContextProvider>
  );
};
export type ArrayFieldProps<
  RecordType extends RaRecord = RaRecord,
  ErrorType = Error,
> = UseListOptions<RecordType, ErrorType> &
  UseFieldValueOptions<RecordType> & {
    children?: ReactNode;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emptyArray: any[] = [];
