import { createElement, ReactNode, useCallback } from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DataTableBase,
  DataTableBaseProps,
  DataTableRenderContext,
  ExtractRecordPaths,
  FieldTitle,
  HintedString,
  Identifier,
  RaRecord,
  RecordContextProvider,
  SortPayload,
  useDataTableCallbacksContext,
  useDataTableDataContext,
  useDataTableRenderContext,
  useDataTableSortContext,
  useGetPathForRecordCallback,
  useListPaginationContext,
  useRecordContext,
  useResourceContext,
  useTranslate,
  useTranslateLabel,
} from "ra-core";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";

export function DataTable<RecordType extends RaRecord = RaRecord>(
  props: DataTableProps<RecordType>
) {
  const { children, ...rest } = props;
  return (
    <DataTableBase<RecordType>
      hasBulkActions={false}
      loading={null}
      empty={<DataTableEmpty />}
      {...rest}
    >
      <div className="rounded-md border">
        <Table>
          <DataTableRenderContext.Provider value="header">
            <DataTableHead>{children}</DataTableHead>
          </DataTableRenderContext.Provider>
          <DataTableBody>{children}</DataTableBody>
        </Table>
        <Pagination />
      </div>
    </DataTableBase>
  );
}

DataTable.Col = DataTableColumn;

const DataTableHead = ({ children }: { children: ReactNode }) => {
  return (
    <TableHeader>
      <TableRow>{children}</TableRow>
    </TableHeader>
  );
};

const DataTableBody = ({ children }: { children: ReactNode }) => {
  const data = useDataTableDataContext();
  return (
    <TableBody>
      {data?.map((record, rowIndex) => (
        <RecordContextProvider
          value={record}
          key={record.id ?? `row${rowIndex}`}
        >
          <DataTableRow>{children}</DataTableRow>
        </RecordContextProvider>
      ))}
    </TableBody>
  );
};

const DataTableRow = ({ children }: { children: ReactNode }) => {
  const { rowClick } = useDataTableCallbacksContext();

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
    <TableRow key={record.id} onClick={handleClick}>
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

const Pagination = () => {
  const { hasPreviousPage, hasNextPage, page, perPage, total, setPage } =
    useListPaginationContext();

  const pageStart = (page - 1) * perPage + 1;
  const pageEnd = hasNextPage ? page * perPage : total;

  return (
    <div className="flex items-center justify-end space-x-2 py-4 px-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {total != null ? `${pageStart} - ${pageEnd} of ${total}` : null}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={!hasPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

interface DataTableProps<RecordType extends RaRecord = RaRecord>
  extends Partial<DataTableBaseProps<RecordType>> {
  children: ReactNode;
}

export function DataTableColumn<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableColumnProps<RecordType>) {
  const renderContext = useDataTableRenderContext();
  switch (renderContext) {
    case "header":
      return <DataTableHeadCell {...props} />;
    case "data":
      return <DataTableCell {...props} />;
  }
}

function DataTableHeadCell<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
>(props: DataTableColumnProps<RecordType>) {
  const { disableSort, source, label, sortByOrder, headerClassName } = props;

  const sort = useDataTableSortContext();
  const { handleSort } = useDataTableCallbacksContext();
  const resource = useResourceContext();
  const translate = useTranslate();
  const translateLabel = useTranslateLabel();

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
    <TableHead className={headerClassName}>
      {handleSort && sort && !disableSort && source ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" data-field={source} onClick={handleSort}>
                {sort.field === source ? (
                  sort.order === "ASC" ? (
                    <ArrowDownAZ className="ml-2 h-6 w-6" />
                  ) : (
                    <ArrowUpZA className="ml-2 h-6 w-6" />
                  )
                ) : null}
                <FieldTitle label={label} source={source} resource={resource} />
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
  const { children, render, field, source, cellClassName } = props;

  const record = useRecordContext<RecordType>();
  if (!render && !field && !children && !source) {
    throw new Error(
      "DataTableColumn: Missing at least one of the following props: render, field, children, or source"
    );
  }

  return (
    <TableCell className={cn("py-1", cellClassName)}>
      {children ??
        (render
          ? record && render(record)
          : field
          ? createElement(field, { source })
          : get(record, source!))}
    </TableCell>
  );
}

interface DataTableColumnProps<
  RecordType extends RaRecord<Identifier> = RaRecord<Identifier>
> {
  cellClassName?: string;
  headerClassName?: string;
  children?: ReactNode;
  render?: (record: RecordType) => React.ReactNode;
  field?: React.ElementType;
  source?: NoInfer<HintedString<ExtractRecordPaths<RecordType>>>;
  label?: React.ReactNode;
  disableSort?: boolean;
  sortByOrder?: SortPayload["order"];
}
