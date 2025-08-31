---
title: "RecordField"
---

Flexible display wrapper combining a label and value (field component, render function, or children) with optional layout variants.

## Usage

```tsx
<RecordField source="reference" />
<RecordField label="dimensions">
  {record => `${record.width}x${record.height}`}
</RecordField>
<RecordField source="price" field={NumberField} />
<RecordField source="status" variant="inline" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `string` | - | Record field path (if no children/render/field) |
| `label` | `ReactNode` | derived | Label (empty string or `false` hides) |
| `children` | `ReactNode` | - | Custom content (inside record context) |
| `render` | `(record) => ReactNode` | - | Render function alternative |
| `field` | `ComponentType` | - | Field component type (e.g. `TextField`) |
| `empty` | `ReactNode` | - | Placeholder when value empty |
| `className` | `string` | - | Wrapper classes |
| `variant` | `"default"\|"inline"` | `default` | Layout direction |

## Rendering Priority

1. `children`
2. `render(record)`
3. `field` component created with `{ source, empty }`
4. `<TextField source />` fallback

## Tips

- Set `label=""` (empty string) to remove label space but keep alignment.
- Provide `empty` as translation key to internationalize placeholders.
- Use `variant="inline"` for side-by-side label/value in dense layouts.
