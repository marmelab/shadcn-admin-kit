import { cn } from "@/lib/utils";
import { Form, type FormProps } from "ra-core";
import { ReactNode } from "react";
import { Toolbar } from "./toolbar";

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
    <Form className={cn(`flex flex-col gap-4 w-full`, className)} {...rest}>
      {children}
      {toolbar}
    </Form>
  );
};

const defaultFormToolbar = <Toolbar />;

export const FormToolbar = Toolbar;