import { useMemo } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListContext } from "ra-core";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DataTable<TData>({ columns }: DataTableProps<TData>) {
  const { data, page, perPage, setPage, setSort, sort, total } =
    useListContext();

  const pagination = useMemo(
    () => ({
      pageIndex: page - 1,
      pageSize: perPage,
    }),
    [page, perPage]
  );
  const sorting = useMemo<SortingState>(
    () => [
      {
        id: sort.field,
        desc: sort.order === "DESC",
      },
    ],
    [sort]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(total / perPage),
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={
                      (header.column.columnDef.meta as any)?.headerClassName
                    }
                  >
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (!header.column.getCanSort() || !header.column.id) {
                          return;
                        }
                        const order =
                          !header.column.getIsSorted() ||
                          header.column.getIsSorted() === "desc"
                            ? "ASC"
                            : "DESC";

                        setSort({
                          field: header.column.id,
                          order,
                        });
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: <ArrowDownAZ className="ml-2 h-6 w-6" />,
                        desc: <ArrowUpZA className="ml-2 h-6 w-6" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Button>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-1" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {total} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
}
