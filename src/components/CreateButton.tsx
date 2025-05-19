import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { useCreatePath, useResourceContext } from "ra-core";

export const CreateButton = () => {
  const resource = useResourceContext();
  const createPath = useCreatePath();
  const link = createPath({
    resource,
    type: "create",
  });
  return (
    <Link
      className={buttonVariants({ variant: "outline" })}
      to={link}
      onClick={stopPropagation}
    >
      Create
    </Link>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();