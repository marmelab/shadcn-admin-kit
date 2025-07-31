import { cn } from "../../lib/utils";

interface PlaceholderProps {
  className?: string;
}

export const ListPlaceholder = ({ className }: PlaceholderProps) => {
  return <span className={cn("bg-gray-300 flex", className)}>&nbsp;</span>;
};
