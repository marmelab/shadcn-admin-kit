---
title: "CancelButton"
---

Button to cancel the edition of the current content without saving.

## Usage

The default Form toolbar of [`<SimpleForm>`](./SimpleForm.md) includes a `<CancelButton>` next to the `<SaveButton>`.

You can customize the toolbar by providing your own component to the `toolbar` prop of `<SimpleForm>`, and include a `<CancelButton>` in it:

```tsx
import { CancelButton, SaveButton, SimpleForm } from '@/components/admin';

const FormToolbar = () => (
  <div className="flex flex-row gap-2 justify-end">
    <CancelButton />
    <SaveButton />
  </div>
)

const PostEdit = () => (
  <Edit>
    <SimpleForm toolbar={<FormToolbar />}>
      ...
    </SimpleForm>
  </Edit>
);
```

On click, the button navigates back to the previous location (usually the list view), without saving changes.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.cancel` | i18n key |
