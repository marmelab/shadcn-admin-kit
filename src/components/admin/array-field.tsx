/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import {
  ListContextProvider,
  useList,
  SortPayload,
  FilterPayload,
  useFieldValue,
  ExtractRecordPaths,
  RaRecord,
} from "ra-core";

export const ArrayField = (props: ArrayFieldProps) => {
  const { children, resource, perPage, sort, filter } = props;
  const data = useFieldValue(props) || emptyArray;
  const listContext = useList({ data, resource, perPage, sort, filter });
  return (
    <ListContextProvider value={listContext}>{children}</ListContextProvider>
  );
};

export interface ArrayFieldProps<RecordType extends RaRecord = RaRecord> {
  source: ExtractRecordPaths<RecordType>;
  record?: RecordType;
  resource?: string;
  children?: ReactNode;
  perPage?: number;
  sort?: SortPayload;
  filter?: FilterPayload;
}

const emptyArray: any[] = [];
