import { useRecordContext } from "ra-core";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TextField } from "@/components/admin";

export const FullNameField = () => {
  const record = useRecordContext();
  return (
    <div className="flex items-center gap-1">
      {record ? (
        <Avatar className="w-6 h-6 mr-1">
          <AvatarImage src={record.avatar} />
          <AvatarFallback>
            {record.first_name?.charAt(0)}
            {record.last_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar />
      )}
      <TextField source="first_name" />
      <TextField source="last_name" />
    </div>
  );
};
