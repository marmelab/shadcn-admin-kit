import { Button } from "@/components/ui/button";
import { Form } from "ra-core";
import { Save } from "lucide-react";
import { ReactNode } from "react";

export const SimpleForm = ({ children }: { children: ReactNode }) => {
  return (
    <Form>
      <div className="flex flex-col gap-4 w-full max-w-lg">
        {children}
        <div className="flex flex-row gap-4">
          <Button className="btn btn-primary" type="submit">
            <Save />
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
};
