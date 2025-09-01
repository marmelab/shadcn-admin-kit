---
title: "Confirm"
---

Generic confirmation dialog component.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether dialog is shown |
| `title` | `ReactNode` | - | Title (i18n key or node) |
| `content` | `ReactNode` | - | Body content |
| `cancel` | `string` | `ra.action.cancel` | i18n key for cancel |
| `confirm` | `string` | `ra.action.confirm` | i18n key for confirm |
| `confirmColor` | `"primary"\|"warning"` | `primary` | Style variant |
| `ConfirmIcon` | `ComponentType` | CheckCircle | Icon for confirm |
| `CancelIcon` | `ComponentType` | AlertCircle | Icon for cancel |
| `loading` | `boolean` | - | Disable buttons while true |
| `onClose` | `() => void` | - | Close handler |
| `onConfirm` | `(e) => void` | - | Confirm handler |

## Behavior

- Supports undo-like UX only externally (no internal undo logic).
- Variant 'warning' maps to destructive button style.
