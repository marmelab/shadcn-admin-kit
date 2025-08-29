---
title: "DateField"
---

Displays a date/time value using `Intl.DateTimeFormat`. Lets you control whether to show the date part, the time part, or both.

Throws an error if both `showDate` and `showTime` are `false`.

## Usage

```tsx
<DateField source="published_at" />
<DateField source="updated_at" showTime />
<DateField source="created_at" showDate={false} showTime options={{ hour: '2-digit', minute: '2-digit' }} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback when no value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `locales` | Optional | `Intl.LocalesArgument` | Browser locale | Locale(s) |
| `options` | Optional | `Intl.DateTimeFormatOptions` | - | Formatting options |
| `showDate` | Optional | `boolean` | `true` | Display date part |
| `showTime` | Optional | `boolean` | `false` | Display time part |
| `transform` | Optional | `(value)=>Date` | Parse Date/number/string | Transform raw value to Date |
| `...rest` | - | `HTMLAttributes<HTMLSpanElement>` | - | DOM props |

`*` Provide `source` or use inside `RecordField`.

## Transformation

If your API returns timestamps or ISO strings, the default `transform` will produce a proper `Date`. Override it for custom parsing.

## Tips

- If the raw value is an empty string it behaves like `null`.
- For date‑only strings (YYYY-MM-DD) it forces UTC to avoid timezone shift.
