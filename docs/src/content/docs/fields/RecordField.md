---
title: "RecordField"
---

Layout + label helper for showing a single field (or custom rendering) with an optional label. Provides a consistent label style and supports inline or stacked variants.

Acts similarly to react‑admin's `<Labeled>` component but with built‑in label rendering logic.

## Usage

```tsx
<RecordField source="reference" />
<RecordField label="Dimensions" variant="inline">
  <div className="flex items-center gap-1">
    ↔<NumberField source="width" /> ↕<NumberField source="height" />
  </div>
</RecordField>
<RecordField source="price" render={r => Intl.NumberFormat().format(r.price)} />
```

## Rendering Priority

1. If `children` provided: render inside a `<span class="flex-1">`.
2. Else if `render` provided: call with the record.
3. Else if `field` provided: `createElement(field, { source, empty, className: 'flex-1' })`.
4. Else if `source` provided: fallback to `<TextField>`.
5. Else render nothing.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name for auto field or label |
| `label` | Optional | `ReactNode` | Derived from source | Custom label. Set `""` or `false` to hide |
| `children` | Optional | `ReactNode` | - | Custom content area |
| `render` | Optional | `(record)=>ReactNode` | - | Function to render value |
| `field` | Optional | `ComponentType` | - | Field component (e.g. `TextField`) |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value for `render` path |
| `record` | Optional | `object` | Context record | Explicit record |
| `variant` | Optional | `"default" \| "inline"` | `default` | Label above or inline |
| `className` | Optional | `string` | - | Wrapper classes |
| `...rest` | - | `HTMLAttributes<HTMLDivElement>` | - | DOM props |

`*` You must provide at least one of `source`, `label`, or `render`.

## Tips

- Combine with other field components in `children` for grouped display.
- Use `variant="inline"` for horizontal key/value layouts.
