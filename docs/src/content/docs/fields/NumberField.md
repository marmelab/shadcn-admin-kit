---
title: "NumberField"
---

Displays a numeric value. Accepts string numbers ("123") and converts them to numbers via a `transform` function (defaults to coercing numeric strings).

Uses `toLocaleString()` when the final value is a number and Intl is available, allowing you to localize or style numbers.

## Usage

```tsx
import { NumberField } from 'shadcn-admin-kit';

<DataTable.NumberCol source="price" options={{ style: 'currency', currency: 'USD' }} />
// or directly
<NumberField source="views" locales="fr-FR" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field in the record |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when value missing |
| `locales` | Optional | `string \| string[]` | Browser locale | Locale(s) for `toLocaleString` |
| `options` | Optional | `object` | - | Intl.NumberFormat options |
| `transform` | Optional | `(value:any)=>number` | Coerce numeric strings | Custom transform before display |
| `...rest` | - | `HTMLAttributes<HTMLSpanElement>` | - | DOM attributes |

`*` Provide `source` or use inside `RecordField`.

## Formatting Example

```tsx
<NumberField source="price" options={{ style: 'currency', currency: 'EUR' }} />
```

## Tips

- If the field already contains numbers, you can set `transform={v => v}` to skip coercion.
- Provide `empty` to display e.g. `empty="ra.field.no_value"` for translation.
