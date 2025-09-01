---
title: "Form Primitives"
---

Low-level form primitives exported from `form.tsx` to build custom inputs and layouts.

## Exports

| Export | Description |
|--------|-------------|
| `Form` | Re-export of `FormProvider` from react-hook-form (context wrapper). |
| `useFormField` | Hook returning `{ formItemId, formDescriptionId, formMessageId, error, invalid }` for current field. |
| `FormField` | Context provider wrapping a single field region (sets ids & name). |
| `FormLabel` | Label tied to current field; adds error styling automatically. |
| `FormControl` | Slot wrapper applying ARIA attributes & ids. Wrap the actual input. |
| `FormDescription` | Helper text container. |
| `FormError` | Displays validation error (from RA `ValidationError`) if field invalid. |
| `SaveButton` | Submit/save button aware of form dirtiness & validation. |

## Pattern

```tsx
<Form {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit)}>
    <FormField id="title" name="title">
      <FormLabel>Title</FormLabel>
      <FormControl>
        <Input {...register('title')} />
      </FormControl>
      <FormDescription>Public title</FormDescription>
      <FormError />
    </FormField>
    <SaveButton />
  </form>
</Form>
```

## SaveButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `ra.action.save` | i18n key |
| `icon` | `ReactNode` | Save icon | Custom icon |
| `variant` | Button variant | `default` | Style variant |
| `alwaysEnable` | `boolean` | `false` | Ignore dirty/valid state disabling |
| `mutationOptions` | React Query options | - | Extra RA mutation options (type=`button`) |
| `transform` | `TransformData` | - | Data transform before save |
| `type` | `"submit"\|"button"` | `submit` | Submit or manual save |

Disabled automatically when pristine, validating or submitting (unless `alwaysEnable`).
