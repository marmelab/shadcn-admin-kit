---
title: "BooleanField"
---

Displays a boolean value as a colored check or close icon with a tooltip label.

## Usage

```tsx
import { BooleanField } from '@/components/admin';

<BooleanField source="is_published" />
```

By default, `true` renders a `Check` icon and `false` renders an `X` icon. Hovering over the icon shows a tooltip with the value label.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `className` | Optional | `string` | - | Classes applied to the icon |
| `defaultValue` | Optional | `unknown` | - | Fallback value when field is absent |
| `empty` | Optional | `ReactNode` | `null` | Rendered when value is neither boolean nor truthy (with `looseValue`) |
| `FalseIcon` | Optional | `LucideIcon \| null` | `X` | Icon for falsy values; `null` renders nothing |
| `looseValue` | Optional | `boolean` | `false` | Treat any truthy value as `true` |
| `record` | Optional | `object` | Record from context | Explicit record override |
| `TrueIcon` | Optional | `LucideIcon \| null` | `Check` | Icon for truthy values; `null` renders nothing |
| `valueLabelFalse` | Optional | `string` | `"false"` | Tooltip text for falsy value (supports i18n keys) |
| `valueLabelTrue` | Optional | `string` | `"true"` | Tooltip text for truthy value (supports i18n keys) |

## Custom Icons

Replace the default check/cross with any Lucide icon:

```tsx
import { Heart, HeartOff } from 'lucide-react';

<BooleanField
  source="liked"
  TrueIcon={Heart}
  FalseIcon={HeartOff}
  valueLabelTrue="Liked"
  valueLabelFalse="Not liked"
/>
```

Pass `null` to suppress the icon for one state:

```tsx
<BooleanField source="is_published" FalseIcon={null} />
```

## Custom Labels

The `valueLabelTrue` and `valueLabelFalse` props set the tooltip text. They support i18n keys, which will be translated via the i18nProvider:

```tsx
<BooleanField
  source="is_published"
  valueLabelTrue="resources.posts.fields.is_published.true"
  valueLabelFalse="resources.posts.fields.is_published.false"
/>
```

If no label is provided, the field falls back to `ra.boolean.true` / `ra.boolean.false` from the i18nProvider.

## Loose Values

By default, the field only renders an icon when the value is strictly `true` or `false`. Set `looseValue` to treat any truthy/falsy value (e.g. `1`, `0`, `"yes"`) as boolean:

```tsx
<BooleanField source="is_active" looseValue />
```

## Empty State

When the field value is absent or non-boolean (and `looseValue` is not set), `empty` is rendered:

```tsx
<BooleanField
  source="is_published"
  empty={<span className="text-muted-foreground">—</span>}
/>
```
