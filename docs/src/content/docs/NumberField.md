---
title: "NumberField"
---

Displays a numeric value. It reads the value from the record context and formats it according to the browser locale.

## Usage

```tsx
import { NumberField } from '@/components/admin';

<DataTable.NumberCol source="price" options={{ style: 'currency', currency: 'USD' }} />
// or directly
<NumberField source="views" locales="fr-FR" />
```

`<NumberField>` works for values that are numbers (e.g. `2108`) or strings that convert to numbers (e.g. `'2108'`).  It uses `Intl.NumberFormat()` if available, passing the `locales` and `options` props as arguments. This allows a perfect display of decimals, currencies, percentages, etc.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field in the record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when value missing |
| `locales` | Optional | `string \| string[]` | Browser locale | Locale(s) for `toLocaleString` |
| `options` | Optional | `object` | - | Intl.NumberFormat options |
| `record` | Optional | `object` | Record from context | Explicit record |
| `transform` | Optional | `(value:any)=>number` | Coerce numeric strings | Custom transform before display |

Remaining props are passed to the underlying `<span>` (e.g., `className`).

## Number Formatting

See [the Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the `options` prop syntax.

```jsx
<NumberField source="score" options={{ maximumFractionDigits: 2 }}/>
// renders the record { id: 1234, score: 567.3567458569 } as
<span>567.35</span>

<NumberField source="share" options={{ style: 'percent' }} />
// renders the record { id: 1234, share: 0.2545 } as
<span>25%</span>

<NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
// renders the record { id: 1234, price: 25.99 } as
<span>$25.99</span>

<NumberField source="volume" options={{ style: 'unit', unit: 'liter' }} />
// renders the record { id: 1234, volume: 3500 } as
<span>3,500 L</span>
```

## Tips

- If you are in a `<DataTable>`, you can use `<DataTable.NumberCol>` instead to achieve the same result.
