import { Trash } from "lucide-react";
import { useTranslate } from "ra-core";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ClearArrayButton = (props: React.ComponentProps<"button">) => {
  const translate = useTranslate();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" variant="ghost" size="icon" {...props}>
            <Trash className="h-5 w-5 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {translate("ra.action.clear_array_input")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default null;
