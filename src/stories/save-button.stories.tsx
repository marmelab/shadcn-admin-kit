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
 * Default behavior: SaveButton is disabled when form is pristine (unchanged).
 */
export const Default = () => (
  <Wrapper>
    <TextInput source="title" />
    <div className="mt-4">
      <SaveButton />
    </div>
    <p className="mt-4 text-sm text-muted-foreground">
      The SaveButton is disabled until you modify the form. Change the input
      value to enable it.
    </p>
  </Wrapper>
);

/**
 * Use `alwaysEnable` prop to keep the button enabled even when form is pristine.
 *
 * This follows UX best practices to avoid confusing users about why a button is disabled.
 * @see https://www.nngroup.com/videos/why-disabled-buttons-hurt-ux-and-how-to-fix-them/
 */
export const AlwaysEnabled = () => (
  <Wrapper>
    <TextInput source="title" />
    <div className="mt-4">
      <SaveButton alwaysEnable />
    </div>
    <p className="mt-4 text-sm text-muted-foreground">
      This SaveButton is always enabled, even when the form is pristine. This
      prevents user confusion about why a button is disabled.
    </p>
  </Wrapper>
);

/**
 * Custom disabled logic using useFormState() hook.
 *
 * Important: When using useFormState(), you MUST destructure the properties you want to
 * subscribe to (e.g., `isDirty`). This is required for React Hook Form's Proxy-based
 * subscription system to work correctly.
 *
 * @see https://react-hook-form.com/docs/useformstate
 */
export const CustomDisabledLogic = () => {
  const CustomToolbar = () => {
    const { isDirty, isValid } = useFormState();
    return (
      <div className="space-y-2">
        <SaveButton disabled={!isDirty || !isValid} />
        <p className="text-sm text-muted-foreground">
          Button is {isDirty && isValid ? "enabled" : "disabled"} - isDirty:{" "}
          {String(isDirty)}, isValid: {String(isValid)}
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
      <SaveButton label="Save Changes" alwaysEnable />
      <SaveButton label="Save Draft" variant="outline" alwaysEnable />
      <SaveButton label="Save & Close" variant="secondary" alwaysEnable />
    </div>
  </Wrapper>
);
