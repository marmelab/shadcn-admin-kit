import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useTranslate } from "ra-core";
import * as React from "react";
import { type ReactNode, useEffect } from "react";

export const FileInputPreview = (inProps: FileInputPreviewProps) => {
  const {
    children,
    className,
    onRemove,
    file,
    removeIcon: RemoveIcon = XCircle,
    ...rest
  } = inProps;

  const translate = useTranslate();

  useEffect(() => {
    return () => {
      const preview = file.rawFile ? file.rawFile.preview : file.preview;

      if (preview) {
        window.URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  return (
    <div className={cn("relative", className)} {...rest}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 h-6 w-6 rounded-full shadow-sm cursor-pointer"
        onClick={onRemove}
        aria-label={translate("ra.action.delete")}
        title={translate("ra.action.delete")}
      >
        <RemoveIcon className="h-4 w-4" />
      </Button>
      {children}
    </div>
  );
};

export interface FileInputPreviewProps {
  children: ReactNode;
  className?: string;
  onRemove: () => void;
  file: any;
  removeIcon?: React.ComponentType<{ className?: string }>;
}
