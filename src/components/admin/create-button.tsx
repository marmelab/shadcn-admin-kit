import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Translate, useCreatePath, useResourceContext } from "ra-core";
import { Link } from "react-router";

export type CreateButtonProps = {
  label?: string;
  resource?: string;
};

export const CreateButton = ({
  label,
  resource: targetResource,
}: CreateButtonProps) => {
  const resource = useResourceContext();
  const createPath = useCreatePath();
  const link = createPath({
    resource: targetResource ?? resource,
    type: "create",
  });
  return (
    <Link
      className={buttonVariants({ variant: "outline" })}
      to={link}
      onClick={stopPropagation}
    >
      <Plus />
      {label ? (
        label
      ) : (
        <Translate i18nKey={"ra.action.create"}>Create</Translate>
      )}
    </Link>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: any) => e.stopPropagation();
