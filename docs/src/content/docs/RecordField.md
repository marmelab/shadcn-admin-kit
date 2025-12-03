---
title: "RecordField"
---

Flexible display wrapper combining a label and value (field component, render function, or children) with optional layout variants.

## Usage

Use it in show pages to display the details of a record.

```tsx
import { NumberField, RecordField, Show } from '@/components/admin';

const PostShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="reference" label="Ref." />
      <RecordField
        label="dimensions"
        render={record => `${record.width}x${record.height}`}
      />
      <RecordField source="price">
        <NumberField source="price" options={
          style: 'currency',
          currency: 'USD',
        }/>
      <RecordField source="status" variant="inline" />
    </div>
  </Show>
) 
```

`<RecordField>` reads the values from `RecordContext`.so you can also use it inside an `<Edit>` view.

## Props

| Prop        | Required | Type                                | Default   | Description                                   |
|-------------|----------|-------------------------------------|-----------|-----------------------------------------------|
| `children`  | Optional | `ReactNode`                         | -         | Custom content (inside record context)        |
| `className` | Optional | `string`                            | -         | Wrapper classes                               |
| `empty`     | Optional | `ReactNode`                         | -         | Placeholder when value empty                  |
| `field`     | Optional | `ComponentType`                     | -         | Field component type (e.g. `TextField`)       |
| `label`     | Optional | `ReactNode`                         | derived   | Label (empty string or `false` hides)         |
| `render`    | Optional | `(record) => ReactNode`             | -         | Render function alternative                   |
| `source`    | Optional | `string`                            | -         | Record field path (if no children/render/field)|
| `variant`   | Optional | `"default"\|"inline"`               | `default` | Layout direction                              |

## Value Rendering

`<RecordField>` can display a record value in several ways:

- By passing a `source` prop and no child.

```tsx
<RecordField source="reference" />
```

- By passing child elements (usually Field components that read from `ResourceContext`).

```tsx
<RecordField source="price">
    <NumberField source="price" options={
        style: 'currency',
        currency: 'USD',
    }/>
</RecordField>
```

- By using a `field` prop to specify a Field component type.

```tsx
<RecordField source="status" field={BadgeField} variant="inline" />
```

- By passing a `render` function that receives the record as its argument.

```tsx
<RecordField
    label="dimensions"
    render={record => `${record.width}x${record.height}`}
/>
```

## Label position

By default, `RecordField` renders the label above the value. Use the `variant="inline"` prop to display them side by side in a more compact layout.

```tsx
<RecordField source="status" variant="inline" />
```
