---
title: "SimpleForm"
---

High-level form layout component wrapping react-admin's headless `<Form>` with spacing, width, and a default toolbar (Cancel + Save buttons).

## Usage

```tsx
import { Edit, SimpleForm, TextInput, BooleanInput } from '@/components/admin';

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" required />
      <BooleanInput source="available" />
    </SimpleForm>
  </Edit>
);
```

Custom toolbar:

```tsx
import { SaveButton, CancelButton } from '@/components/admin';

<SimpleForm toolbar={<div className="flex gap-2 justify-end"><CancelButton /><SaveButton alwaysEnable /></div>} />
```

## Props

Inherits all props from `ra-core` `<Form>` (`defaultValues`, `validate`, `onSubmit`, etc.) plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Form inputs and layout elements |
| `className` | `string` | - | Extra classes appended to base layout |
| `toolbar` | `ReactNode` | `<FormToolbar />` | Element rendered after children (usually action buttons) |

## Layout

Base classes: `flex flex-col gap-4 w-full max-w-lg` (narrow readable column). Override or extend via `className`.

## Toolbar

The default `<FormToolbar>` renders (when it has no children):

```tsx
<div className="flex flex-row gap-2 justify-end">
  <CancelButton />
  <SaveButton />
</div>
```

It is wrapped in a sticky container with a subtle background fade so actions remain visible at scroll bottom.

Provide custom children to `<FormToolbar>` to override buttons:

```tsx
<FormToolbar>
  <SaveButton variant="secondary" />
</FormToolbar>
```

Or replace the entire toolbar via the `toolbar` prop on `<SimpleForm>`.

## Styling Tips

- Adjust max width with `className="max-w-2xl"` for wider forms.
- Add sections with `<div className="grid gap-4 md:grid-cols-2">` around inputs.
- Combine with `<Form>` component directly for fully custom layouts (see `Form.md`).

## Related

- [`Form`](./Form.md) (headless version)
- [`SaveButton`](./SaveButton.md)
- [`CancelButton`](./CancelButton.md)
- [`SimpleFormIterator`](./SimpleFormIterator.md)
