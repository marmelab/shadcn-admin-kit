---
title: "SearchInput"
---

Decorated `TextInput` with a search icon; no label.

## Usage

`<SearchInput>` is designed to be used as a search input in a [`<List filters>`](./List.md#filter-button--form-combo) form.

```tsx
import { List, DataTable, SearchInput } from '@/components/admin';

const postListFilters = [
  <SearchInput source="q" alwaysOn />,
];

const PostList = () => (
  <List filters={postListFilters}>
    <DataTable>
      <DataTable.Col source="title" />
      <DataTable.Col source="author" />
      <DataTable.Col source="published_at" />
    </DataTable>
  </List>
);
```

By default, `<SearchInput>` uses the `q` source, which is a common convention for full text search. You can change it using the `source` prop:

```tsx
<SearchInput source="title" alwaysOn />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | - | Wrapper classes |
| `disabled` | Optional | `boolean` | `false` | Disable control |
| `helperText` | Optional | `string` &#124; `ReactNode` | `-` | Help text |
| `label` | Optional | `string` &#124; `ReactNode` | `-` | Label text (not displayed by default) |
| `source` | Optional | `string` | `q` | Field name |
| `validate` | Optional | `Validator \| Validator[]` | `-` | Validation |
