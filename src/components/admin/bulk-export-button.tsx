import { Download } from "lucide-react";
import {
  Exporter,
  fetchRelatedRecords,
  Translate,
  useDataProvider,
  useListContext,
  useNotify,
  useResourceContext,
} from "ra-core";
import * as React from "react";
import { useCallback } from "react";

import { Button } from "../ui/button";

/**
 * Export the selected rows
 *
 * To be used inside the <Datagrid bulkActionButtons> prop.
 *
 * @example // basic usage
 * import { BulkDeleteButton, BulkExportButton, List, Datagrid } from 'react-admin';
 *
 * const PostBulkActionButtons = () => (
 *     <>
 *         <BulkExportButton />
 *         <BulkDeleteButton />
 *     </>
 * );
 *
 * export const PostList = () => (
 *     <List>
 *        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
 *          ...
 *       </Datagrid>
 *     </List>
 * );
 */
export const BulkExportButton = (props: BulkExportButtonProps) => {
  const {
    onClick,
    label = "ra.action.export",
    icon = defaultIcon,
    exporter: customExporter,
    meta,
    ...rest
  } = props;
  const resource = useResourceContext(props);
  const { exporter: exporterFromContext, selectedIds } = useListContext();
  const exporter = customExporter || exporterFromContext;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (exporter && resource) {
        dataProvider
          .getMany(resource, { ids: selectedIds, meta })
          .then(({ data }) =>
            exporter(
              data,
              fetchRelatedRecords(dataProvider),
              dataProvider,
              resource
            )
          )
          .catch((error) => {
            console.error(error);
            notify("ra.notification.http_error", {
              type: "error",
            });
          });
      }
      if (typeof onClick === "function") {
        onClick(event);
      }
    },
    [dataProvider, exporter, notify, onClick, resource, selectedIds, meta]
  );

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 h-9"
      {...sanitizeRestProps(rest)}
    >
      {icon}
      {label && <Translate i18nKey={label}>{label}</Translate>}
    </Button>
  );
};

const defaultIcon = <Download className="h-4 w-4" />;

const sanitizeRestProps = ({
  resource: _resource,
  ...rest
}: Omit<BulkExportButtonProps, "exporter" | "label" | "meta">) => rest;

interface Props {
  exporter?: Exporter;
  icon?: React.ReactNode;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  resource?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

export type BulkExportButtonProps = Props &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
