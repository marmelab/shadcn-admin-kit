import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { useCreatePath, useRecordContext, useResourceContext } from "ra-core";

export const EditButton = () => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const createPath = useCreatePath();
  const link = createPath({
    resource,
    type: "edit",
    id: record?.id,
  });
  return (
    <Link className={buttonVariants({ variant: "outline" })} to={link}>
      Edit
    </Link>
  );
};
