---
title: "RefreshButton"
---

Forces a data refresh by invalidating react-query's query cache. All the data displayed in the current page (lists, show views, etc.) will be refreshed.

It also displays a loading indicator while the data fetching is in progress.

## Usage

The default layout contains a `<RefreshButton>` in the top right corner.

You can use it for your custom layouts:

```tsx
import { RefreshButton } from '@/components/admin';

<RefreshButton />
```
