import { ReactNode } from "react";

export function InputHelperText({
  error,
  helperText,
}: {
  error?: string;
  helperText?: ReactNode;
}) {
  if (!error && !helperText) return null;

  return <p className="text-sm text-destructive mt-1">{error || helperText}</p>;
}
