---
title: "ImageField"
---

Displays an `<img>` element or a list of images for the specified image source.

![ImageField example](./images/image-field.png)

## Usage

`<ImageField>` reads the field value and uses it as the `src` attribute of an `<img>` element.

```tsx
import { ImageField } from '@/components/admin';

<ImageField
    source="avatar_url"
    className="[&_img]:w-8 [&_img]:h-8 [&_img]:rounded-full"
    empty={
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          👤
        </div>
    }
/>
```

If the field contains an array of objects (with each object representing a file), you can use the `src` and `title` props to specify which properties of the objects to use for the image URL and title respectively.

```js
// Example record
{
  id: 1,
  employees: [
    { url: 'https://example.com/fdgkflkhgfg.jpg', name: 'Jane Doe' },
    { url: 'https://example.com/yhjtyghrrth.jpg', name: 'John Smith' },
    { url: 'https://example.com/qsdqzfrqerf.jpg', name: 'Alice Johnson' },
  ]
}
```

```tsx
<ImageField
    source="employees"
    src="url"
    title="name"
    className="[&_ul]:flex [&_ul]:gap-2 [&_img]:w-12 [&_img]:h-12 [&_img]:rounded-full"
/>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field containing the email |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `record` | Optional | `object` | Record from context | Explicit record |
| `src` | Optional | `string` | - | Property name to extract the image URL from when the field value is an object or an array of objects |
| `title` | Optional | `string` | - | Property name to extract the image title from |

Remaining props are passed to the enclosing `<span>` element.
