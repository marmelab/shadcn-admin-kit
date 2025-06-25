import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, Translate } from "ra-core";
import { Save } from "lucide-react";
import { ReactNode } from "react";
import { DeleteButton } from "@/components/admin/delete-button";

export const SimpleForm = ({
  children,
  className,
  toolbar = defaultFormToolbar,
}: {
  children: ReactNode;
  className?: string;
  toolbar?: ReactNode;
}) => {
  return (
    <Form className={cn(`flex flex-col gap-4 w-full max-w-lg`, className)}>
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
    <DeleteButton />
  </div>
);

const defaultFormToolbar = <FormToolbar />;
