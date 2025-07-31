import { PlusCircle } from "lucide-react";
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

export const AddItemButton = (props: React.ComponentProps<"button">) => {
  const { add, source } = useSimpleFormIterator();
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
            onClick={() => add()}
            className={cn("button-add", `button-add-${source}`, className)}
            {...rest}
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{translate("ra.action.add")}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
