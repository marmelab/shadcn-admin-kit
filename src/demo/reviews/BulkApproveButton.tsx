import {
  useUpdateMany,
  useNotify,
  useUnselectAll,
  useListContext,
  Translate,
  type Identifier,
} from "ra-core";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

const noSelection: Identifier[] = [];

export const BulkApproveButton = () => {
  const { selectedIds = noSelection } = useListContext();
  const notify = useNotify();
  const unselectAll = useUnselectAll("reviews");

  const [updateMany, { isPending }] = useUpdateMany(
    "reviews",
    { ids: selectedIds, data: { status: "accepted" } },
    {
      mutationMode: "undoable",
      onSuccess: () => {
        notify("resources.reviews.notifications.approved_success", {
          type: "info",
          undoable: true,
        });
        unselectAll();
      },
      onError: () => {
        notify("resources.reviews.notifications.approved_error", {
          type: "error",
        });
      },
    },
  );

  return (
    <Button onClick={() => updateMany()} disabled={isPending}>
      <ThumbsUp />
      <Translate i18nKey="ra.action.bulk_approve">Approve</Translate>
    </Button>
  );
};
