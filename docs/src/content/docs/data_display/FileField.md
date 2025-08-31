---
title: "FileField"
---

Renders one or multiple files (stored as JSON objects defining the file path and title) as links. Supports arrays of file objects or a single value. For arrays, each file is rendered in a `<ul>` of `<li>` items.

## Usage

```tsx
import { FileField } from '@/components/admin';

<FileField source="file" title="title" />
<FileField source="attachments" src="url" title="name" target="_blank" />
```

The optional `title` prop points to the file title property, used for `title` attributes. It can either be a hard-written string, or a path within your JSON object:

```jsx
// { file: { url: 'doc.pdf', title: 'Presentation' } }

<FileField source="file.url" title="file.title" />
// renders the file name as "Presentation"

<FileField source="file.url" title="File" />
// renders the file name as "File", since "File" is not a path in previous given object
```

If the record actually contains an array of files in its property defined by the `source` prop, the `src` prop will be needed to determine the `href` value of the links, for example:

```js
// This is the record
{
    files: [
        { url: 'image1.jpg', desc: 'First image' },
        { url: 'image2.jpg', desc: 'Second image' },
    ]
}

<FileField source="files" src="url" title="desc" />
```

You can optionally set the `target` prop to choose which window will the link try to open in.

```jsx
// Will make the file open in new window
<FileField source="file.url" target="_blank" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name (string or array) |
| `defaultValue` | Optional | `any` | - | Fallback when no value |
| `download` | Optional | `string` | - | Download attribute |
| `empty` | Optional | `ReactNode` | - | Placeholder when empty |
| `record` | Optional | `object` | Record from context | Explicit record |
| `src` | Optional | `string` | - | Path within each file object to URL |
| `target` | Optional | `string` | - | Anchor target |
| `title` | Optional | `string` | - | Field used for link text (or literal) |

Remaining props are passed to the root `<div>` element (e.g., `className`).

## Tips

- Provide `download` to suggest a filename: `<FileField source="manual" download="Manual.pdf" />`.
- Stops click propagation to avoid triggering row navigation.
