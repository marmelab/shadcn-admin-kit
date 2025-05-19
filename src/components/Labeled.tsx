import { FieldTitle, useResourceContext } from "ra-core";
import { Label } from "@/components/ui/label";

export const Labeled = (props: LabeledProps) => {
  const { label, source, children } = props;
  const resource = useResourceContext(props);
  return (
    <div className="flex flex-col">
      <Label>
        <FieldTitle label={label} source={source} resource={resource} />
      </Label>
      {children}
    </div>
  );
};

export interface LabeledProps {
  label?: string;
  resource?: string;
  source?: string;
  children: React.ReactNode;
}
