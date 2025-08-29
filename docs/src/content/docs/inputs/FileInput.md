---
title: "FileInput"
---

File upload dropzone supporting single or multiple files. Transforms selected `File` objects to `{ rawFile, src, title }` structures with preview URLs. Renders optional children as previews (each wrapped in its own record context).

## Usage

```tsx
<FileInput source="file" />
<FileInput source="attachments" multiple accept={{ 'image/*': [] }}>
  <ImageField source="src" title="title" />
</FileInput>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `multiple` | Optional | `boolean` | `false` | Allow multiple files |
| `accept` | Optional | `DropzoneOptions['accept']` | - | MIME / extension accept map |
| `maxSize` | Optional | `number` | - | Max bytes |
| `minSize` | Optional | `number` | - | Min bytes |
| `options` | Optional | `DropzoneOptions` | - | Extra dropzone options |
| `labelSingle` | Optional | `string` | `ra.input.file.upload_single` | i18n key for single placeholder |
| `labelMultiple` | Optional | `string` | `ra.input.file.upload_several` | i18n key multiple placeholder |
| `placeholder` | Optional | `ReactNode` | - | Custom placeholder content |
| `onRemove` | Optional | `(file:any)=>void` | - | Callback after removing a file |
| `validateFileRemoval` | Optional | `(file:any)=>boolean\|Promise<boolean>` | - | Throw/cancel to prevent removal |
| `children` | Optional | `ReactNode` | - | Preview element (single) |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Wrapper classes |

## Preview Rendering

Children receive each file as record via `RecordContextProvider`, so you can use field components.

## Removal

Each preview includes a remove button; you can supply `removeIcon` to customize.
