---
title: "SaveButton"
---

Submits the parent `SimpleForm` / `react-hook-form` context.

## Usage

```tsx {5}
import { SimpleForm, SaveButton } from "@/components/admin";

const PostEdit = () => (
  <Edit>
    <SimpleForm toolbar={<SaveButton />}>{/* inputs */}</SimpleForm>
  </Edit>
);
```

By default, the SaveButton is always enabled (`alwaysEnable={true}`). This follows UX best practices to avoid confusing users about why a button is disabled ([see Nielsen Norman Group guidelines](https://www.nngroup.com/videos/why-disabled-buttons-hurt-ux-and-how-to-fix-them/)).

To disable the button when the form is pristine, set `alwaysEnable={false}`:

```tsx
<SaveButton alwaysEnable={false} />
```

For custom disabled logic, you can also use the `disabled` prop with `useFormState()`:

```tsx
import { SaveButton, useFormState } from "@/components/admin";

const CustomToolbar = () => {
  const { isDirty, dirtyFields } = useFormState();
  // Use both for robustness across React Hook Form versions
  const isFormDirty = isDirty || Object.keys(dirtyFields).length > 0;
  return <SaveButton disabled={!isFormDirty} />;
};
```

**Important:** When using `useFormState()`, you MUST destructure the properties you want to subscribe to (e.g., `isDirty`, `dirtyFields`). This is required for React Hook Form's Proxy-based subscription system to work correctly.

On click, it triggers the `handleSubmit` callback from the form context.

## Props

| Prop              | Required | Type                                                                | Default          | Description                                                                                   |
| ----------------- | -------- | ------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `alwaysEnable`    | Optional | `boolean`                                                           | `true`           | When `true`, button is always enabled. When `false`, button is disabled when form is pristine |
| `className`       | Optional | `string`                                                            | -                | Extra classes                                                                                 |
| `disabled`        | Optional | `boolean`                                                           | -                | Force disabled                                                                                |
| `icon`            | Optional | `ReactNode`                                                         | Save icon        | Custom icon                                                                                   |
| `label`           | Optional | `string`                                                            | `ra.action.save` | i18n key                                                                                      |
| `mutationOptions` | Optional | `object`                                                            | -                | Options for the `dataProvider.create()` or `dataProvider.update()` call                       |
| `transform`       | Optional | `(data: any) => any`                                                | -                | Modify data before submit                                                                     |
| `type`            | Optional | `"button"\|"submit"\|"reset"`                                       | `submit`         | HTML button type                                                                              |
| `variant`         | Optional | `"default"\|"outline"\|"destructive"\|"secondary"\|"ghost"\|"link"` | `default`        | shadcn button variant                                                                         |
