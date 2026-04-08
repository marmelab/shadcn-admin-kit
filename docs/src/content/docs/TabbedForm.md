---
title: "TabbedForm"
---

`<TabbedForm>` creates a `<form>` to edit a record with inputs organized into tabs, and a toolbar at the bottom (Cancel + Save buttons). It renders all tab panels simultaneously (hidden via CSS when inactive) so form validation runs across every tab, not just the visible one.

## Usage

`<TabbedForm>` is often used as child of [`<Create>`](./Create.md) or [`<Edit>`](./Edit.md). Use `<TabbedForm.Tab>` components to define each tab.

```tsx
import { Edit, TabbedForm, TextInput } from "@/components/admin";

export const PostEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Summary">
        <TextInput source="title" />
        <TextInput source="body" multiline />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Details">
        <TextInput source="author" />
        <TextInput source="views" type="number" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
```

By default the active tab is synced with the URL (e.g. `/posts/1/edit` shows the first tab, `/posts/1/edit/1` shows the second). Set `syncWithLocation={false}` to use local state instead.

## Props

| Prop                     | Required | Type                 | Default           | Description                                            |
| ------------------------ | -------- | -------------------- | ----------------- | ------------------------------------------------------ |
| `children`               | Required | `ReactNode`          | -                 | `<TabbedForm.Tab>` elements                            |
| `className`              | Optional | `string`             | -                 | Extra class applied to the `<form>` element            |
| `defaultValues`          | Optional | `object \| function` | -                 | Default values for the form                            |
| `noValidate`             | Optional | `boolean`            | -                 | Disable browser-native validation                      |
| `onSubmit`               | Optional | `function`           | `save`            | Callback when the form is submitted                    |
| `sanitizeEmptyValues`    | Optional | `boolean`            | -                 | Remove empty values from the form state                |
| `syncWithLocation`       | Optional | `boolean`            | `true`            | Sync the active tab with the URL                       |
| `tabs`                   | Optional | `ReactElement`       | -                 | Override the tab header component                      |
| `toolbar`                | Optional | `ReactNode \| false` | `<FormToolbar />` | Toolbar rendered below the tabs. Pass `false` to hide. |
| `validate`               | Optional | `function`           | -                 | Form-level validation function                         |
| `warnWhenUnsavedChanges` | Optional | `boolean`            | -                 | Warn the user before leaving with unsaved changes      |

## `<TabbedForm.Tab>` Props

| Prop               | Required | Type                     | Default | Description                                                                                   |
| ------------------ | -------- | ------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| `label`            | Required | `string \| ReactElement` | -       | Tab header label (also used as a translation key)                                             |
| `children`         | Optional | `ReactNode`              | -       | Inputs displayed when this tab is active                                                      |
| `className`        | Optional | `string`                 | -       | Class applied to the content panel (and the tab trigger when used without `contentClassName`) |
| `contentClassName` | Optional | `string`                 | -       | Class applied exclusively to the content panel                                                |
| `count`            | Optional | `ReactNode`              | -       | Badge rendered next to the label (e.g. record count)                                          |
| `icon`             | Optional | `ReactElement`           | -       | Icon rendered before the label                                                                |
| `path`             | Optional | `string`                 | -       | Custom URL segment for this tab (defaults to the tab index)                                   |

## Validation

All tab panels are always mounted. Invalid inputs on inactive tabs still contribute to the form's validation state, and the corresponding tab header turns red to alert the user.

```tsx
import { Edit, TabbedForm, TextInput } from "@/components/admin";
import { required, minLength } from "ra-core";

export const PostEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Summary">
        <TextInput source="title" validate={required()} />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Details">
        <TextInput source="author" validate={[required(), minLength(3)]} />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
```

When the user clicks Save and the `author` field is empty, the **Details** tab header turns red even though it is not the active tab.

## URL Sync (`syncWithLocation`)

By default (`syncWithLocation={true}`) the active tab is reflected in the URL:

- First tab → `/posts/1/edit`
- Second tab → `/posts/1/edit/1`
- Third tab → `/posts/1/edit/2`

This means users can bookmark or share a deep-link directly to a specific tab, and the browser Back button works as expected.

Set `syncWithLocation={false}` to manage tab state locally (useful inside modals or when you have nested routers):

```tsx
<TabbedForm syncWithLocation={false}>
  <TabbedForm.Tab label="Summary">...</TabbedForm.Tab>
  <TabbedForm.Tab label="Details">...</TabbedForm.Tab>
</TabbedForm>
```

## Custom Tab Paths

Use the `path` prop on a tab to override the URL segment:

```tsx
<TabbedForm>
  <TabbedForm.Tab label="Summary" path="">
    <TextInput source="title" />
  </TabbedForm.Tab>
  <TabbedForm.Tab label="Details" path="meta">
    <TextInput source="author" />
  </TabbedForm.Tab>
</TabbedForm>
```

The second tab is now reachable at `/posts/1/edit/meta`.

## Toolbar

The default `<FormToolbar>` renders Cancel + Save buttons. You can customise or replace it:

```tsx
import { Edit, TabbedForm, FormToolbar, TextInput } from "@/components/admin";

export const PostEdit = () => (
  <Edit>
    <TabbedForm
      toolbar={
        <FormToolbar className="sticky bottom-0 bg-background/80 backdrop-blur" />
      }
    >
      <TabbedForm.Tab label="Summary">
        <TextInput source="title" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
```

Pass `toolbar={false}` to remove it entirely.

## Styling Tab Content

Use `className` (or `contentClassName`) on a `<TabbedForm.Tab>` to constrain or style the content panel:

```tsx
<TabbedForm.Tab label="Summary" className="max-w-2xl">
  <TextInput source="title" />
</TabbedForm.Tab>
```

## Default Values

Populate the form from a record or supply defaults with `defaultValues`:

```tsx
const postDefaults = { status: "draft", views: 0 };

export const PostCreate = () => (
  <Create>
    <TabbedForm defaultValues={postDefaults}>
      <TabbedForm.Tab label="Summary">
        <TextInput source="title" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Meta">
        <TextInput source="status" />
        <TextInput source="views" type="number" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
```

## Access Control

Wrap individual inputs with `<CanAccess>` to hide them based on permissions:

```tsx
import { CanAccess } from "ra-core";
import { Edit, TabbedForm, TextInput } from "@/components/admin";

export const PostEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Summary">
        <TextInput source="title" />
        <CanAccess action="write" resource="posts.body">
          <TextInput source="body" multiline />
        </CanAccess>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);
```
