import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

interface ToolbarButtonProps extends React.ComponentProps<typeof Toggle> {
  isActive?: boolean
  tooltip?: string
  tooltipOptions?: React.ComponentProps<typeof TooltipContent>
}

export const ToolbarButton = ({
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}: ToolbarButtonProps) => {
  const toggleButton = (
    <Toggle className={cn({ "bg-accent": isActive }, className)} {...props}>
      {children}
    </Toggle>
  )

  if (!tooltip) {
    return toggleButton
  }

  return (
    // Base UI defaults tooltips to a 600ms open delay; the provider keeps
    // them instant without app-level setup.
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger render={toggleButton} />
        <TooltipContent {...tooltipOptions}>
          <div className="flex flex-col items-center text-center">{tooltip}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

ToolbarButton.displayName = "ToolbarButton"

export default ToolbarButton
