import { XCircle } from "lucide-react";
import { useTranslate } from "ra-core";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSimpleFormIterator } from "./simple-form-iterator-context";
import { useSimpleFormIteratorItem } from "./simple-form-iterator-item-context";

export const RemoveItemButton = (props: React.ComponentProps<"button">) => {
  const { remove, index } = useSimpleFormIteratorItem();
  const { source } = useSimpleFormIterator();
  const { className, ...rest } = props;
  const translate = useTranslate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove()}
            className={cn(
              "button-remove",
              `button-remove-${source}-${index}`,
              className
            )}
            {...rest}
          >
            <XCircle className="h-5 w-5 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{translate("ra.action.remove")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
