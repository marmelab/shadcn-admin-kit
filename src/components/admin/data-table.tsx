import {
  createElement,
  ReactNode,
  useCallback,
  Children,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import {
  DataTableBase,
  DataTableBaseProps,
  DataTableRenderContext,
  DataTableColumnRankContext,
  DataTableColumnFilterContext,
  ExtractRecordPaths,
  FieldTitle,
  HintedString,
  Identifier,
  RaRecord,
  RecordContextProvider,
  SortPayload,
  useDataTableCallbacksContext,
  useDataTableColumnRankContext,
  useDataTableColumnFilterContext,
  useDataTableConfigContext,
  useDataTableDataContext,
  useDataTableRenderContext,
  useDataTableSelectedIdsContext,
  useDataTableSortContext,
  useDataTableStoreContext,
  useGetPathForRecordCallback,
  useRecordContext,
  useResourceContext,
  useStore,
  useTranslate,
  useTranslateLabel,
} from "ra-core";
import * as diacritic from "diacritic";
import { ArrowDownAZ, ArrowUpZA, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NumberField } from "@/components/admin/number-field";
import { FieldToggle } from "@/components/admin/field-toggle";
import get from "lodash/get";

export function DataTable<RecordType extends RaRecord = RaRecord>(
  props: DataTableProps<RecordType>
) {
  const { children, className, rowClassName, ...rest } = props;
  const resourceFromContext = useResourceContext(props);
  const storeKey = props.storeKey || `${resourceFromContext}.datatable`;
  const [columnRanks] = useStore<number[]>(`${storeKey}_columnRanks`);
  const columns = columnRanks
    ? reorderChildren(children, columnRanks)
    : children;

  return (
    <DataTableBase<RecordType>
      hasBulkActions
      loading={null}
      empty={<DataTableEmpty />}
      {...rest}
    >
      <div className={cn("rounded-md border", className)}>
        <Table>
          <DataTableRenderContext.Provider value="header">
            <DataTableHead>{columns}</DataTableHead>
          </DataTableRenderContext.Provider>
          <DataTableBody<RecordType> rowClassName={rowClassName}>
            {columns}
          </DataTableBody>
        </Table>
      </div>
      <DataTableRenderContext.Provider value="columnsSelector">
        <ColumnsSelector>{children}</ColumnsSelector>
      </DataTableRenderContext.Provider>
    </DataTableBase>
  );
}

DataTable.Col = DataTableColumn;
DataTable.NumberCol = DataTableNumberColumn;

const DataTableHead = ({ children }: { children: ReactNode }) => {
  const data = useDataTableDataContext();
  const { hasBulkActions = false } = useDataTableConfigContext();
  const { onSelect } = useDataTableCallbacksContext();
  const selectedIds = useDataTableSelectedIdsContext();
  const handleToggleSelectAll = (checked: boolean) => {
    if (!onSelect || !data || !selectedIds) return;
    onSelect(
      checked
        ? selectedIds.concat(
            data
              .filter((record) => !selectedIds.includes(record.id))
              .map((record) => record.id)
          )
        : []
    );
  };
  const selectableIds = Array.isArray(data)
    ? data.map((record) => record.id)
    : [];
  return (
    <TableHeader>
      <TableRow>
        {hasBulkActions ? (
          <TableHead className="w-8">
            <Checkbox
              onCheckedChange={handleToggleSelectAll}
              checked={
                selectedIds &&
                selectedIds.length > 0 &&
                selectableIds.length > 0 &&
                selectableIds.every((id) => selectedIds.includes(id))
              }
              className="mb-2"
            />
          </TableHead>
        ) : null}
        {children}
      </TableRow>
    </TableHeader>
  );
};

const DataTableBody = <RecordType extends RaRecord = RaRecord>({
  children,
  rowClassName,
}: {
  children: ReactNode;
  rowClassName?: (record: RecordType) => string | undefined;
}) => {
  const data = useDataTableDataContext();
  return (
    <TableBody>
      {data?.map((record, rowIndex) => (
        <RecordContextProvider
          value={record}
          key={record.id ?? `row${rowIndex}`}
        >
          <DataTableRow className={rowClassName?.(record)}>
            {children}
          </DataTableRow>
        </RecordContextProvider>
      ))}
    </TableBody>
  );
};

const DataTableRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { rowClick, handleToggleItem } = useDataTableCallbacksContext();
  const selectedIds = useDataTableSelectedIdsContext();
  const { hasBulkActions = false } = useDataTableConfigContext();

  const record = useRecordContext();
  if (!record) {
    throw new Error("DataTableRow can only be used within a RecordContext");
  }

  const resource = useResourceContext();
  if (!resource) {
    throw new Error("DataTableRow can only be used within a ResourceContext");
  }

  const navigate = useNavigate();
  const getPathForRecord = useGetPathForRecordCallback();

  const handleToggle = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (!handleToggleItem) return;
      handleToggleItem(record.id, event);
    },
    [handleToggleItem, record.id]
  );

  const handleClick = useCallback(async () => {
    const temporaryLink =
      typeof rowClick === "function"
        ? rowClick(record.id, resource, record)
        : rowClick;

    const link = isPromise(temporaryLink) ? await temporaryLink : temporaryLink;

    const path = await getPathForRecord({
      record,
      resource,
      link,
    });
    if (path === false || path == null) {
      return;
    }
    navigate(path, {
      state: { _scrollToTop: true },
    });
  }, [record, resource, rowClick, navigate, getPathForRecord]);

  return (
    <TableRow
      key={record.id}
      onClick={handleClick}
      className={cn(rowClick !== false && "cursor-pointer", className)}
    >
      {hasBulkActions ? (
        <TableCell className="flex w-8" onClick={handleToggle}>
          <Checkbox
            checked={selectedIds?.includes(record.id)}
            onClick={handleToggle}
          />
        </TableCell>
      ) : null}
      {children}
    </TableRow>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPromise = (value: any): value is Promise<any> =>
  value && typeof value.then === "function";

const DataTableEmpty = () => {
  return (
    <Alert>
      <AlertDescription>No results found.</AlertDescription>
    </Alert>
  );
};

export interface DataTableProps<RecordType extends RaRecord = RaRecord>
  extends Partial<DataTableBaseProps<RecordType>> {
  children: ReactNode;
  className?: string;
  rowClassName?: (record: RecordType) => string | undefined;
}

export function DataTableColumn<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableColumnProps<RecordType>) {
  const renderContext = useDataTableRenderContext();
  switch (renderContext) {
    case "columnsSelector":
      return <ColumnsSelectorItem<RecordType> {...props} />;
    case "header":
      return <DataTableHeadCell {...props} />;
    case "data":
      return <DataTableCell {...props} />;
  }
}

// Function to help with column ranking
const padRanks = (ranks: number[], length: number) =>
  ranks.concat(
    Array.from({ length: length - ranks.length }, (_, i) => ranks.length + i)
  );

const fieldLabelMatchesFilter = (fieldLabel: string, columnFilter?: string) =>
  columnFilter
    ? diacritic
        .clean(fieldLabel)
        .toLowerCase()
        .includes(diacritic.clean(columnFilter).toLowerCase())
    : true;

/**
 * Reorder children based on columnRanks
 *
 * Note that columnRanks may be shorter than the number of children
 */
const reorderChildren = (children: ReactNode, columnRanks: number[]) =>
  Children.toArray(children).reduce((acc: ReactNode[], child, index) => {
    const rank = columnRanks.indexOf(index);
    if (rank === -1) {
      // if the column is not in columnRanks, keep it at the same index
      acc[index] = child;
    } else {
      // if the column is in columnRanks, move it to the rank index
      acc[rank] = child;
    }
    return acc;
  }, []);

/**
 * Render DataTable.Col elements in the ColumnsButton selector using a React Portal.
 *
 * @see ColumnsButton
 */
export const ColumnsSelector = ({ children }: ColumnsSelectorProps) => {
  const translate = useTranslate();
  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [columnRanks, setColumnRanks] = useStore<number[] | undefined>(
    `${storeKey}_columnRanks`
  );
  const [_hiddenColumns, setHiddenColumns] = useStore<string[]>(
    storeKey,
    defaultHiddenColumns
  );
  const elementId = `${storeKey}-columnsSelector`;

  const [container, setContainer] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined" ? document.getElementById(elementId) : null
  );

  // on first mount, we don't have the container yet, so we wait for it
  useEffect(() => {
    if (
      container &&
      typeof document !== "undefined" &&
      document.body.contains(container)
    )
      return;
    // look for the container in the DOM every 100ms
    const interval = setInterval(() => {
      const target = document.getElementById(elementId);
      if (target) setContainer(target);
    }, 100);
    // stop looking after 500ms
    const timeout = setTimeout(() => clearInterval(interval), 500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [elementId, container]);

  const [columnFilter, setColumnFilter] = useState<string>("");

  if (!container) return null;

  const childrenArray = Children.toArray(children);
  const paddedColumnRanks = padRanks(columnRanks ?? [], childrenArray.length);
  const shouldDisplaySearchInput = childrenArray.length > 5;

  return createPortal(
    <ul className="max-h-[50vh] p-1 overflow-auto">
      {shouldDisplaySearchInput ? (
        <li className="pb-2" tabIndex={-1}>
          <div className="relative">
            <Input
              value={columnFilter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setColumnFilter(e.target.value);
              }}
              placeholder={translate("ra.action.search_columns", {
                _: "Search columns",
              })}
              className="pr-8"
            />
            <Search className="absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
            {columnFilter && (
              <button
                onClick={() => setColumnFilter("")}
                className="absolute right-8 top-2 h-4 w-4 text-muted-foreground"
                aria-label="Clear"
              >
                ×
              </button>
            )}
          </div>
        </li>
      ) : null}
      {paddedColumnRanks.map((position, index) => (
        <DataTableColumnRankContext.Provider value={position} key={index}>
          <DataTableColumnFilterContext.Provider
            value={columnFilter}
            key={index}
          >
            {childrenArray[position]}
          </DataTableColumnFilterContext.Provider>
        </DataTableColumnRankContext.Provider>
      ))}
      <li className="text-center mt-2 px-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setColumnRanks(undefined);
            setHiddenColumns(defaultHiddenColumns);
          }}
        >
          Reset
        </Button>
      </li>
    </ul>,
    container
  );
};

interface ColumnsSelectorProps {
  children?: React.ReactNode;
}

export const ColumnsSelectorItem = <
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>({
  source,
  label,
}: DataTableColumnProps<RecordType>) => {
  const resource = useResourceContext();
  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [hiddenColumns, setHiddenColumns] = useStore<string[]>(
    storeKey,
    defaultHiddenColumns
  );
  const columnRank = useDataTableColumnRankContext();
  const [columnRanks, setColumnRanks] = useStore<number[]>(
    `${storeKey}_columnRanks`
  );
  const columnFilter = useDataTableColumnFilterContext();
  const translateLabel = useTranslateLabel();
  if (!source && !label) return null;
  const fieldLabel = translateLabel({
    label: typeof label === "string" ? label : undefined,
    resource,
    source,
  }) as string;
  const isColumnHidden = hiddenColumns.includes(source!);
  const isColumnFiltered = fieldLabelMatchesFilter(fieldLabel, columnFilter);

  const handleMove = (
    index1: number | string,
    index2: number | string | null
  ) => {
    const colRanks = !columnRanks
      ? padRanks([], Math.max(Number(index1), Number(index2 || 0)) + 1)
      : Math.max(Number(index1), Number(index2 || 0)) > columnRanks.length - 1
      ? padRanks(columnRanks, Math.max(Number(index1), Number(index2 || 0)) + 1)
      : columnRanks;
    const index1Pos = colRanks.findIndex((index) => index == Number(index1));
    const index2Pos = colRanks.findIndex((index) => index == Number(index2));
    if (index1Pos === -1 || index2Pos === -1) {
      return;
    }
    let newColumnRanks;
    if (index1Pos > index2Pos) {
      newColumnRanks = [
        ...colRanks.slice(0, index2Pos),
        colRanks[index1Pos],
        ...colRanks.slice(index2Pos, index1Pos),
        ...colRanks.slice(index1Pos + 1),
      ];
    } else {
      newColumnRanks = [
        ...colRanks.slice(0, index1Pos),
        ...colRanks.slice(index1Pos + 1, index2Pos + 1),
        colRanks[index1Pos],
        ...colRanks.slice(index2Pos + 1),
      ];
    }
    setColumnRanks(newColumnRanks);
  };

  return isColumnFiltered ? (
    <FieldToggle
      key={columnRank}
      source={source!}
      label={fieldLabel}
      index={String(columnRank)}
      selected={!isColumnHidden}
      onToggle={() =>
        isColumnHidden
          ? setHiddenColumns(
              hiddenColumns.filter((column) => column !== source!)
            )
          : setHiddenColumns([...hiddenColumns, source!])
      }
      onMove={handleMove}
    />
  ) : null;
};

function DataTableHeadCell<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableColumnProps<RecordType>) {
  const {
    disableSort,
    source,
    label,
    sortByOrder,
    className,
    headerClassName,
  } = props;

  const sort = useDataTableSortContext();
  const { handleSort } = useDataTableCallbacksContext();
  const resource = useResourceContext();
  const translate = useTranslate();
  const translateLabel = useTranslateLabel();
  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [hiddenColumns] = useStore<string[]>(storeKey, defaultHiddenColumns);
  const isColumnHidden = hiddenColumns.includes(source!);
  if (isColumnHidden) return null;

  const nextSortOrder =
    sort && sort.field === source
      ? oppositeOrder[sort.order]
      : sortByOrder ?? "ASC";
  const fieldLabel = translateLabel({
    label: typeof label === "string" ? label : undefined,
    resource,
    source,
  });
  const sortLabel = translate("ra.sort.sort_by", {
    field: fieldLabel,
    field_lower_first:
      typeof fieldLabel === "string"
        ? fieldLabel.charAt(0).toLowerCase() + fieldLabel.slice(1)
        : undefined,
    order: translate(`ra.sort.${nextSortOrder}`),
    _: translate("ra.action.sort"),
  });

  return (
    <TableHead className={cn(className, headerClassName)}>
      {handleSort && sort && !disableSort && source ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 -mr-3 h-8 data-[state=open]:bg-accent cursor-pointer"
                data-field={source}
                onClick={handleSort}
              >
                {headerClassName?.includes("text-right") ? null : (
                  <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                  />
                )}
                {sort.field === source ? (
                  sort.order === "ASC" ? (
                    <ArrowDownAZ className="ml-2 h-6 w-6" />
                  ) : (
                    <ArrowUpZA className="ml-2 h-6 w-6" />
                  )
                ) : null}
                {headerClassName?.includes("text-right") ? (
                  <FieldTitle
                    label={label}
                    source={source}
                    resource={resource}
                  />
                ) : null}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sortLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <FieldTitle label={label} source={source} resource={resource} />
      )}
    </TableHead>
  );
}

const oppositeOrder: Record<SortPayload["order"], SortPayload["order"]> = {
  ASC: "DESC",
  DESC: "ASC",
};

function DataTableCell<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableColumnProps<RecordType>) {
  const {
    children,
    render,
    field,
    source,
    className,
    cellClassName,
    conditionalClassName,
  } = props;

  const { storeKey, defaultHiddenColumns } = useDataTableStoreContext();
  const [hiddenColumns] = useStore<string[]>(storeKey, defaultHiddenColumns);
  const record = useRecordContext<RecordType>();
  const isColumnHidden = hiddenColumns.includes(source!);
  if (isColumnHidden) return null;
  if (!render && !field && !children && !source) {
    throw new Error(
      "DataTableColumn: Missing at least one of the following props: render, field, children, or source"
    );
  }

  return (
    <TableCell
      className={cn(
        "py-1",
        className,
        cellClassName,
        record && conditionalClassName?.(record)
      )}
    >
      {children ??
        (render
          ? record && render(record)
          : field
          ? createElement(field, { source })
          : get(record, source!))}
    </TableCell>
  );
}

export interface DataTableColumnProps<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
> {
  className?: string;
  cellClassName?: string;
  headerClassName?: string;
  conditionalClassName?: (record: RecordType) => string | false | undefined;
  children?: ReactNode;
  render?: (record: RecordType) => React.ReactNode;
  field?: React.ElementType;
  source?: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  label?: React.ReactNode;
  disableSort?: boolean;
  sortByOrder?: SortPayload["order"];
}

export function DataTableNumberColumn<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableNumberColumnProps<RecordType>) {
  const {
    source,
    options,
    locales,
    className,
    headerClassName,
    cellClassName,
    ...rest
  } = props;
  return (
    <DataTableColumn
      source={source}
      {...rest}
      className={className}
      headerClassName={cn("text-right", headerClassName)}
      cellClassName={cn("text-right", cellClassName)}
    >
      <NumberField source={source} options={options} locales={locales} />
    </DataTableColumn>
  );
}

export interface DataTableNumberColumnProps<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
> extends DataTableColumnProps<RecordType> {
  source: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  locales?: string | string[];
  options?: Intl.NumberFormatOptions;
}
