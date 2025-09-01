---
title: "Count"
---

Fetches and displays item count for a resource.

## Usage

```tsx
import { Count } from '@/components/admin';

<Count />
```

It counts the items of the current resource, using `dataProvider.getList()` with a `pagination` of `{ page: 1, perPage: 1 }`.

By default, it uses the current resource from the `ResourceContext`. You can override them with props, as well as pass a filter:

```tsx
<Count resource="comments" filter={{ post_id: 123 }} link />
```

## Props

| Prop       | Required | Type           | Default   | Description                  |
|------------|----------|----------------|-----------|------------------------------|
| `filter`   | Optional | `object`       | `{}`      | Filter passed to dataProvider |
| `link`     | Optional | `boolean`      | `false`   | Make count a link to list     |
| `resource` | Optional | `string`       | context   | Override resource             |
| `timeout`  | Optional | `number`       | `1000`    | Delay before spinner          |
