---
title: "SaveButton"
---

Submits the parent `SimpleForm` / `react-hook-form` context.

## Usage

```tsx {5}
import { SimpleForm, SaveButton } from '@/components/admin';

const PostEdit = () => (
    <Edit>
        <SimpleForm toolbar={<SaveButton />}>
            {/* inputs */}
        </SimpleForm>
    </Edit>
)
```

It is disabled if the form is pristine or invalid, unless you set the `alwaysEnable` prop.

On click, it triggers the `handleSubmit` callback from the form context.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `alwaysEnable` | Optional | `boolean` | `false` | Ignore form pristine check |
| `className` | Optional | `string` | - | Extra classes |
| `disabled` | Optional | `boolean` | - | Force disabled |
| `icon` | Optional | `ReactNode` | Save icon | Custom icon |
| `label` | Optional | `string` | `ra.action.save` | i18n key |
| `mutationOptions` | Optional | `object` | - | Options for the `dataProvider.create()` or `dataProvider.update()` call |
| `transform` | Optional | `(data: any) => any` | - | Modify data before submit |
| `type` | Optional | `"button"\|"submit"\|"reset"` | `submit` | HTML button type |
| `variant` | Optional | `"default"\|"outline"\|"destructive"\|"secondary"\|"ghost"\|"link"` | `default` | shadcn button variant |
