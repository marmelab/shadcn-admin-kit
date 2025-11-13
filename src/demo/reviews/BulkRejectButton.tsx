import {
  useUpdateMany,
  useNotify,
  useUnselectAll,
  useListContext,
  Translate,
  type Identifier,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { ThumbsDown } from "lucide-react";

const noSelection: Identifier[] = [];

export const BulkRejectButton = () => {
  const { selectedIds = noSelection } = useListContext();
  const notify = useNotify();
  const unselectAll = useUnselectAll("reviews");

  const [updateMany, { isPending }] = useUpdateMany(
    "reviews",
    { ids: selectedIds, data: { status: "rejected" } },
    {
      mutationMode: "undoable",
      onSuccess: () => {
        notify("resources.reviews.notifications.rejected_success", {
          type: "info",
          undoable: true,
        });
        unselectAll();
      },
      onError: () => {
        notify("resources.reviews.notifications.rejected_error", {
          type: "error",
        });
      },
    },
  );

  return (
    <Button onClick={() => updateMany()} disabled={isPending}>
      <ThumbsDown />
      <Translate i18nKey="ra.action.bulk_reject">Reject</Translate>
    </Button>
  );
};
