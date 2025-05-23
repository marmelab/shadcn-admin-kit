import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
    <Link
      className={buttonVariants({ variant: "outline" })}
      to={link}
      onClick={stopPropagation}
    >
      <Pencil />
      Edit
    </Link>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();
