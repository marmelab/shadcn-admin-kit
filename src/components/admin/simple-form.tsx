import { ReactNode } from "react";
import { Form, type FormProps } from "ra-core";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/admin/toolbar";

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

const defaultFormToolbar = <Toolbar />;
