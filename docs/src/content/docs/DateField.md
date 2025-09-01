---
title: "DateField"
---

Displays a date/time value using `Intl.DateTimeFormat`. Lets you control whether to show the date part, the time part, or both.

## Usage

```tsx
import { DateField } from '@/components/admin';

<DateField source="published_at" />
```

The `locales` and `options` props are passed to `Intl.DateTimeFormat`. See [Date.toLocaleDateString() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) for details.

```tsx
<DateField source="published_at" options={{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}} />
// renders the record { id: 1234, published_at: new Date('2017-04-23') } as
<span>Sunday, April 23, 2017</span>
```

For date‑only strings (YYYY-MM-DD) it forces UTC to avoid timezone shift.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `defaultValue` | Optional | `any` | - | Fallback when no value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `locales` | Optional | `Intl.LocalesArgument` | Browser locale | Locale(s) |
| `options` | Optional | `Intl.DateTimeFormatOptions` | - | Formatting options |
| `record` | Optional | `object` | Record from context | Explicit record |
| `showDate` | Optional | `boolean` | `true` | Display date part |
| `showTime` | Optional | `boolean` | `false` | Display time part |
| `transform` | Optional | `(value)=>Date` | Parse Date/number/string | Transform raw value to Date |

Remaining props are passed to the underlying `<span>` (e.g., `className`).

## Transformation

If your API returns timestamps or ISO strings, the default `transform` will produce a proper `Date`. Override it for custom parsing.
