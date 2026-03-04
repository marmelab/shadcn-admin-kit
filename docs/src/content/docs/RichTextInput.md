---
title: "RichTextInput"
---

Rich text editor input powered by TipTap.

By default, it stores the edited value as HTML.

## Usage

```tsx
import { RichTextInput } from "@/components/admin";

<RichTextInput source="body" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `className` | Optional | `string` | - | CSS classes for the input wrapper |
| `defaultValue` | Optional | `string` | - | Default value |
| `disabled` | Optional | `boolean` | `false` | Disable editing |
| `editorClassName` | Optional | `string` | - | CSS classes for the editor root |
| `editorContentClassName` | Optional | `string` | - | CSS classes for editor content area |
| `editorOptions` | Optional | `object` | - | Extra TipTap editor options |
| `format` | Optional | `function` | - | Convert record value to input value |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `label` | Optional | `string \| false` | Inferred | Custom / hide label |
| `output` | Optional | `'html' \| 'json' \| 'text'` | `'html'` | Output format emitted by the editor |
| `parse` | Optional | `function` | - | Convert input value before storing |
| `placeholder` | Optional | `string` | - | Placeholder shown when empty |
| `readOnly` | Optional | `boolean` | `false` | Read-only mode |
| `toolbar` | Optional | `ReactNode \| (editor) => ReactNode` | default toolbar | The toolbar to use. If not set, the default toolbar is used. |
| `throttleDelay` | Optional | `number` | `0` | Delay (ms) before propagating updates |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation rules |

## `editorOptions`

Use `editorOptions` to pass additional TipTap editor options (extensions, callbacks, editor props, etc.).

```tsx
<RichTextInput
  source="body"
  editorOptions={{
    autofocus: true,
  }}
/>
```

## Toolbar

Provide a custom toolbar:

```tsx
<RichTextInput
  source="body"
  toolbar={(editor) => (
    <button
      type="button"
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
    >
      Bold
    </button>
  )}
/>
```

## Bundle Size Note

`<RichTextInput>` depends on TipTap/ProseMirror and adds noticeable JavaScript weight compared to simple inputs.
To keep the footprint controlled, the kit ships a compact editor implementation instead of importing a large UI block.
If you only need it on a few screens, consider lazy-loading forms that use it.
