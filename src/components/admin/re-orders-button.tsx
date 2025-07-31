import { cn } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { IconButtonWithTooltip } from "./icon-button-with-tooltip";
import { useSimpleFormIterator } from "./simple-form-iterator-context";
import { useSimpleFormIteratorItem } from "./simple-form-iterator-item-context";

export const ReOrderButtons = ({ className }: { className?: string }) => {
  const { index, total, reOrder } = useSimpleFormIteratorItem();
  const { source } = useSimpleFormIterator();

  return (
    <span
      className={cn(
        "button-reorder",
        `button-reorder-${source}-${index}`,
        className
      )}
    >
      <IconButtonWithTooltip
        label="ra.action.move_up"
        onClick={() => reOrder(index - 1)}
        disabled={index <= 0}
      >
        <ArrowUpCircle className="h-4 w-4" />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip
        label="ra.action.move_down"
        onClick={() => reOrder(index + 1)}
        disabled={total == null || index >= total - 1}
      >
        <ArrowDownCircle className="h-4 w-4" />
      </IconButtonWithTooltip>
    </span>
  );
};
