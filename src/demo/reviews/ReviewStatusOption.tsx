import { cn } from "@/lib/utils";

/**
 * Renders a review status as a coloured dot followed by its label.
 *
 * Passed to both `optionText` and `inputText` of the status inputs: Base UI's
 * `Select.Value` and the autocomplete trigger render the raw value unless they
 * are given an explicit renderer, so the same function serves both slots.
 */
export const renderReviewStatusOption = (choice?: {
  id: string;
  name: string;
}) => {
  if (!choice) return null;

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span
        className={cn(
          "inline-block h-2 w-2 shrink-0 rounded-full",
          choice.id === "accepted"
            ? "bg-green-400 dark:bg-green-800"
            : choice.id === "rejected"
              ? "bg-red-400 dark:bg-red-800"
              : "bg-yellow-400 dark:bg-yellow-800",
        )}
      />
      <span>{choice.name}</span>
    </span>
  );
};
