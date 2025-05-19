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
    <Link className={buttonVariants({ variant: "outline" })} to={link}>
      Create
    </Link>
  );
};
