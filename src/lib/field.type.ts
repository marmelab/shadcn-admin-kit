import type { BaseFieldProps } from "ra-core";
import type { ReactNode } from "react";
import { UnknownRecord } from "./unknown-types";

export interface FieldProps<
  RecordType extends UnknownRecord = UnknownRecord,
> extends Omit<BaseFieldProps<RecordType>, "resource"> {
  /**
   * The component to display when the field value is empty. Defaults to empty string.
   *
   * @example
   * const PostList = () => (
   *     <List>
   *         <DataTable>
   *             <TextField source="title" />
   *             <TextField source="author" empty="missing data" />
   *         </DataTable>
   *     </List>
   * );
   */
  empty?: ReactNode;
}
