import { Button } from "@/components/ui/button";
import { Form, Translate } from "ra-core";
import { Save } from "lucide-react";
import { ReactNode } from "react";
import { DeleteButton } from "@/components/admin/delete-button";

export const SimpleForm = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Form>
      <div className={`flex flex-col gap-4 w-full max-w-lg ${className}`}>
        {children}
        <div className="flex flex-row gap-4 justify-between">
          <Button className="btn btn-primary" type="submit">
            <Save />
            <Translate i18nKey="ra.action.save">Save</Translate>
          </Button>
          <DeleteButton />
        </div>
      </div>
    </Form>
  );
};
