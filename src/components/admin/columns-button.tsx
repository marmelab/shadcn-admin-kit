import * as React from "react";
import { useTranslate, useResourceContext } from "ra-core";
import { Columns } from "lucide-react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Renders a button that lets users show / hide columns in a DataTable
 *
 * @example
 * import { ColumnsButton, DataTable } from 'shadcn-admin-kit';
 *
 * const PostListActions = () => (
 *   <div className="flex items-center gap-2">
        <ColumnsButton />
        <FilterButton />
 *   </div>
 * );
 *
 * const PostList = () => (
 *   <List actions={<PostListActions />}>
 *     <DataTable>
 *       <DataTable.Col source="title" />
 *       <DataTable.Col source="author" />
         ...
 *     </DataTable>
 *   </List>
 * );
 */
export const ColumnsButton = (props: ColumnsButtonProps) => {
  const { className, ...rest } = props;
  const resource = useResourceContext(props);
  const storeKey = props.storeKey || `${resource}.datatable`;

  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const translate = useTranslate();

  const title = translate("ra.action.select_columns", { _: "Columns" });

  return (
    <span className={cn("inline-flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={title}
                  {...rest}
                >
                  <Columns className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{title}</TooltipContent>
            </Tooltip>
          ) : (
            <Button variant="outline" className="cursor-pointer" {...rest}>
              <Columns />
              {title}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverPrimitive.Portal forceMount>
          <div className={open ? "block" : "hidden"}>
            <PopoverPrimitive.Content
              data-slot="popover-content"
              sideOffset={4}
              align="start"
              className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border shadow-md outline-hidden p-0 min-w-[200px]"
            >
              <div id={`${storeKey}-columnsSelector`} className="p-2" />
            </PopoverPrimitive.Content>
          </div>
        </PopoverPrimitive.Portal>
      </Popover>
    </span>
  );
};

export interface ColumnsButtonProps
  extends React.ComponentProps<typeof Button> {
  resource?: string;
  storeKey?: string;
}
