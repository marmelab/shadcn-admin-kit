---
title: "Count"
---

Fetches and displays item count for a resource.

## Usage

```tsx
<Count />
<Count resource="posts" filter={{ published: true }} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filter` | `object` | `{}` | Filter passed to dataProvider |
| `sort` | `SortPayload` | - | Sort for counting |
| `link` | `boolean` | `false` | Make count a link to list |
| `resource` | `string` | context | Override resource |
| `timeout` | `number` | `1000` | Delay before spinner |
