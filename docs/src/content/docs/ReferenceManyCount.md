---
title: "ReferenceManyCount"
---

Displays number of related records for a `ReferenceMany` relation.

## Usage

Use `<ReferenceManyCount>` anywhere inside a [`RecordContext`](https://marmelab.com/ra-core/userecordcontext/). You must set the `reference` and `target` props to match the relationship:

- `reference` is the name of the related resource to fetch (e.g. `comments`)
- `target` is the name of the field in the related resource that points to the current resource (e.g. `post_id`)

```tsx
import { ReferenceManyCount } from '@/components/admin';

// display the number of comments for the current post
<ReferenceManyCount reference="comments" target="post_id" />
```

It counts the number of comments related to the current post, where `post_id` in the `comments` resource matches the current post `id`, using `dataProvider.getManyReference()` with a `pagination` of `{ page: 1, perPage: 1 }`.

You can get a count of a subset of the related records by passing a `filter` prop:

```tsx
// display the number of published comments for the current post
<ReferenceManyCount
  reference="comments"
  target="post_id"
  filter={{ published: true }}
/>
```

:::tip
If you need to count all the records of a given resource, use [the `<Count>` component](./Count.md) instead.
:::

## Props

| Prop        | Required | Type           | Description                                 |
|-------------|----------|----------------|---------------------------------------------|
| `reference` | Required | `string`       | Target resource name                        |
| `target`    | Required | `string`       | Foreign key field in target resource        |
| `filter`    | Optional | `object`       | Extra filter values                         |
| `link`      | Optional | `boolean`      | Make count a link                           |
| `record`    | Optional | `RaRecord`     | Record providing id (from context if omitted) |
| `source`    | Optional | `string`       | Source field of current record (default `id`) |
