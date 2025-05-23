import { Button } from "@/components/ui/button";
import { useListPaginationContext } from "ra-core";

export const ListPagination = () => {
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
