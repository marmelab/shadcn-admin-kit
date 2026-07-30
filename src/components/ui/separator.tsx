import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorPrimitive.Props & {
  /**
   * When true (the default), the separator is hidden from assistive
   * technologies. Base UI hardcodes `role="separator"`, but external props take
   * precedence over its internal ones, so `role="none"` restores the behaviour
   * Radix gave us through its own `decorative` prop.
   */
  decorative?: boolean
}) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      // Passing role={undefined} would strip Base UI's own role, so the prop is
      // only spread in when we actually want to override it.
      {...(decorative ? { role: "none" as const } : {})}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
