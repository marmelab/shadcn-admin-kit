import { Download } from "lucide-react";
import { Translate } from "ra-core";

import { Button } from "../ui/button";
import {
  ResourceInformation,
  useBulkExport,
  UseBulkExportProps,
} from "@/hooks/useBulkExport";

/**
 * Export the selected rows
 *
 * To be used inside the <List bulkActionsToolbar> prop.
 *
 * @example // basic usage
 * import { BulkDeleteButton, BulkActionsToolbar, BulkExportButton, List, Datagrid } from '@/components/admin';
 *
 * export const PostList = () => (
 *   <List
 *     bulkActionsToolbar={
 *       <BulkActionsToolbar>
 *         <BulkExportButton />
 *         <BulkDeleteButton />
 *       </BulkActionsToolbar>
 *     }
 *   >
 *     <DataTable>
 *       ...
 *     </DataTable>
 *   </List>
 * );
 */
export const BulkExportButton = <T extends ResourceInformation>({
  icon = defaultIcon,
  label = "ra.action.export",
  ...props
}: BulkExportButtonProps<T>) => {
  const { bulkExport } = useBulkExport(props);

  return (
    <Button
      onClick={bulkExport}
      role="button"
      variant="outline"
      size="sm"
      className="flex items-center gap-2 h-9"
      {...sanitizeRestProps(props)}
    >
      {icon}
      {label && <Translate i18nKey={label}>{label}</Translate>}
    </Button>
  );
};

const defaultIcon = <Download className="h-4 w-4" />;

export type BulkExportButtonProps<T extends ResourceInformation> =
  UseBulkExportProps<T> & {
    icon?: React.ReactNode;
    label?: string;
  } & Omit<React.ComponentProps<typeof Button>, "onClick">;

const sanitizeRestProps = <T extends ResourceInformation>({
  resource: _resource,
  exporter: _exporter,
  onClick: _onClick,
  label: _label,
  icon: _icon,
  meta: _meta,
  ...rest
}: BulkExportButtonProps<T>) => rest;
