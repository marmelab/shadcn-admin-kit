import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  useCreatePath,
  useRecordContext,
  useResourceContext,
  Translate,
  type RaRecord,
} from "ra-core";

export const EditButton = (props: { record?: RaRecord; resource?: string }) => {
  const resource = useResourceContext(props);
  const record = useRecordContext(props);
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
      <Translate i18nKey="ra.action.edit">Edit</Translate>
    </Link>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();
