import * as React from "react";
import { Children, ReactNode } from "react";
import { Form, type FormProps, WithRecord } from "ra-core";
import { cn } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/delete-button.tsx";
import { CancelButton } from "@/components/admin/cancel-button.tsx";
import { SaveButton } from "@/components/admin/save-button.tsx";

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
  const { children, className, resource, ...rest } = inProps;

  return (
    <div
      {...rest}
      className={cn(
        // Responsive styles - mobile-first approach
        "pt-4 flex flex-row flex-auto justify-end",
        className,
      )}
      role="toolbar"
    >
      {Children.count(children) === 0 ? (
        <div className="flex-1 flex justify-between gap-4">
          <WithRecord
            render={(record) =>
              record.id !== null && <DeleteButton resource={resource} />
            }
          />
          <div className="flex-1" />
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
  resource?: string;
}

const defaultFormToolbar = <FormToolbar />;
