import { cn } from "@/lib/utils";
import { FieldTitle } from "ra-core";
import type { ReactElement } from "react";

/**
 * Wrap a field or an input with a label if necessary.
 *
 * The label is displayed if:
 * - the field or input has a label prop that is not false, or
 * - the field or input has a source prop
 *
 * @example
 * <Labeled>
 *     <FooComponent source="title" />
 * </Labeled>
 */
export const Labeled = (props: LabeledProps): ReactElement => {
  const {
    children,
    className = "",
    fullWidth,
    isRequired,
    label,
    resource,
    source,
    ...rest
  } = props;

  return (
    <span
      className={cn(
        "inline-flex flex-col mb-1",
        fullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {label !== false &&
      // @ts-expect-error: TypeScript doesn't recognize context prop
      children.props.label !== false &&
      typeof children.type !== "string" &&
      // @ts-expect-error: TypeScript doesn't recognize context prop
      children.type?.displayName !== "Labeled" &&
      // @ts-expect-error: TypeScript doesn't recognize context prop
      children.type?.displayName !== "Labeled" ? (
        <span className="block text-sm text-muted-foreground mb-1">
          <FieldTitle
            // @ts-expect-error: TypeScript doesn't recognize context prop
            label={label || children.props.label}
            // @ts-expect-error: TypeScript doesn't recognize context prop
            source={source || children.props.source}
            resource={resource}
            isRequired={isRequired}
          />
        </span>
      ) : null}
      {children}
    </span>
  );
};

Labeled.displayName = "Labeled";

export interface LabeledProps {
  children: ReactElement;
  className?: string;
  fullWidth?: boolean;
  htmlFor?: string;
  isRequired?: boolean;
  label?: string | ReactElement | boolean;
  resource?: string;
  source?: string;
}
