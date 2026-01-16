import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { SaveButton, TextInput, ThemeProvider } from "@/components/admin";
import { useFormState } from "react-hook-form";

export default {
  title: "Buttons/SaveButton",
};

const record = {
  id: 1,
  title: "Apple",
};

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>
        <Form>{children}</Form>
      </RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

/**
 * Default behavior: SaveButton is always enabled.
 * This follows UX best practices to avoid confusing users about why a button is disabled.
 * @see https://www.nngroup.com/videos/why-disabled-buttons-hurt-ux-and-how-to-fix-them/
 */
export const Default = () => (
  <Wrapper>
    <TextInput source="title" />
    <div className="mt-4">
      <SaveButton />
    </div>
    <p className="mt-4 text-sm text-muted-foreground">
      The SaveButton is always enabled by default. This prevents user confusion
      about why a button is disabled.
    </p>
  </Wrapper>
);

/**
 * Example showing how to disable the button when form is pristine (unchanged).
 * Use the `disabled` prop with custom logic from useFormState().
 *
 * Important: When using useFormState(), you MUST destructure the properties you want to
 * subscribe to (e.g., `isDirty`, `dirtyFields`). This is required for React Hook Form's
 * Proxy-based subscription system to work correctly.
 */
export const DisabledWhenPristine = () => {
  const CustomToolbar = () => {
    const { isDirty, dirtyFields } = useFormState();
    // Use both isDirty and dirtyFields for robustness across React Hook Form versions
    // This ensures proper Proxy subscription and handles edge cases
    const isFormDirty = isDirty || Object.keys(dirtyFields).length > 0;
    return (
      <div className="space-y-2">
        <SaveButton disabled={!isFormDirty} />
        <p className="text-sm text-muted-foreground">
          Button is {isFormDirty ? "enabled" : "disabled"} - isDirty:{" "}
          {String(isDirty)}, dirtyFields: {JSON.stringify(dirtyFields)}
        </p>
      </div>
    );
  };

  return (
    <Wrapper>
      <TextInput source="title" />
      <div className="mt-4">
        <CustomToolbar />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        This SaveButton is disabled when the form is pristine. Change the input
        value to enable it.
      </p>
    </Wrapper>
  );
};

/**
 * Custom disabled logic using useFormState() hook.
 *
 * Important: When using useFormState(), you MUST destructure the properties you want to
 * subscribe to (e.g., `isDirty`, `isValid`, `dirtyFields`). This is required for React Hook
 * Form's Proxy-based subscription system to work correctly.
 *
 * In particular, accessing `dirtyFields` without destructuring it may not trigger re-renders,
 * which was the core issue fixed in the SaveButton component.
 *
 * @see https://react-hook-form.com/docs/useformstate
 */
export const CustomDisabledLogic = () => {
  const CustomToolbar = () => {
    const { isDirty, isValid, dirtyFields } = useFormState();
    return (
      <div className="space-y-2">
        <SaveButton disabled={!isDirty || !isValid} />
        <p className="text-sm text-muted-foreground">
          Button is {isDirty && isValid ? "enabled" : "disabled"} - isDirty:{" "}
          {String(isDirty)}, isValid: {String(isValid)}, dirtyFields:{" "}
          {JSON.stringify(dirtyFields)}
        </p>
      </div>
    );
  };

  return (
    <Wrapper>
      <TextInput source="title" />
      <div className="mt-4">
        <CustomToolbar />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        This SaveButton uses custom logic: disabled when form is pristine OR
        invalid.
      </p>
    </Wrapper>
  );
};

/**
 * Example showing a button that's always disabled.
 */
export const Disabled = () => (
  <Wrapper>
    <TextInput source="title" />
    <div className="mt-4">
      <SaveButton disabled />
    </div>
  </Wrapper>
);

/**
 * Example with custom label and variant.
 */
export const CustomLabel = () => (
  <Wrapper>
    <TextInput source="title" />
    <div className="mt-4 space-x-2">
      <SaveButton label="Save Changes" />
      <SaveButton label="Save Draft" variant="outline" />
      <SaveButton label="Save & Close" variant="secondary" />
    </div>
  </Wrapper>
);
