// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import { ReactNode } from "react";

/**
 * @deprecated Use a simple div with flex and flex-col instead
 */
export const SimpleShowLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-4">{children}</div>
);
