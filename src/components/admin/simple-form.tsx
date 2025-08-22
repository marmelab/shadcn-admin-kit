import * as React from "react";
import { Children, ReactNode } from "react";
import { Form, type FormProps, WithRecord } from "ra-core";
import { cn } from "@/lib/utils";
import { DeleteButton, CancelButton, SaveButton } from "@/components/admin";

export const SimpleForm = ({
  children,
  className,
  toolbar = defaultFormToolbar,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  toolbar?: ReactNode;
} & FormProps) => {
  return (
    <Form
      className={cn(`flex flex-col gap-4 w-full max-w-lg`, className)}
      {...rest}
    >
      {children}
      {toolbar}
    </Form>
  );
};

export const FormToolbar = (inProps: FormToolbarProps) => {
  const { children, className, ...rest } = inProps;

  return (
    <div
      {...rest}
      className={cn(
        "sticky pt-4 pb-4 md:block md:pt-2 md:pb-0 bottom-0 bg-linear-to-b from-transparent to-background to-10%",
        className,
      )}
      role="toolbar"
    >
      {Children.count(children) === 0 ? (
        <div className="flex flex-row gap-2 justify-end">
          <CancelButton />
          <SaveButton />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export interface FormToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const defaultFormToolbar = <FormToolbar />;
