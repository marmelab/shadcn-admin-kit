import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, type FormProps, Translate, WithRecord } from "ra-core";
import { Save } from "lucide-react";
import { ReactNode } from "react";
import { DeleteButton } from "@/components/admin/delete-button";

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

export const FormToolbar = ({ className }: { className?: string }) => (
  <div className={cn(`flex flex-row gap-4 justify-between`, className)}>
    <Button className="btn btn-primary" type="submit">
      <Save />
      <Translate i18nKey="ra.action.save">Save</Translate>
    </Button>
    <WithRecord render={(record) => record.id !== null && <DeleteButton />} />
  </div>
);

const defaultFormToolbar = <FormToolbar />;
