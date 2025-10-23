---
title: "Show"
---

The `<Show>` component is a page component that renders a single record.

![product show view](./images/product-show.png)

`<Show>` handles the logic of the Show page:

- it calls `useShowController` to fetch the record from the dataProvider via `dataProvider.getOne()`,
- it computes the default page title
- it creates a `ShowContext` and a [`RecordContext`](https://marmelab.com/ra-core/userecordcontext/),
- it renders the page layout with the correct title and actions
- it renders its child component in a `<Card>`

## Usage

Here is the minimal code necessary to display a view to show a post:

```jsx
// in src/products.jsx
import { RecordField } from "@/components/admin/record-field";
import { NumberField } from "@/components/admin";
import { ReferenceField } from "@/components/admin/reference-field";
import { Show } from "@/components/admin/show";

export const ProductShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="reference" />
      <RecordField label="dimensions">
        <div className="flex items-center gap-1">
          ↔<NumberField source="width" />
          ↕<NumberField source="height" />
        </div>
      </RecordField>
      <RecordField source="category_id">
        <ReferenceField source="category_id" reference="categories" />
      </RecordField>
      <RecordField
        source="price"
        render={(record) => Intl.NumberFormat().format(record.price)}
      />
      <RecordField
        source="thumbnail"
        render={(record) => <img src={record.thumbnail} className="w-24" />}
      />
      <RecordField source="description" className="max-w-100" />
    </div>
  </Show>
);
```

`<RecordField>` is a flexible wrapper to display a label and a value (field component, render function, or children) with optional layout variants. See [RecordField documentation](./RecordField.md) for details.

Components using `<Show>` can be used as the `show` prop of a `<Resource>` component:

```jsx
// in src/App.jsx
import { Admin } from '@/copmponents/admin';
import { Resource } from 'ra-core';

import { dataProvider } from './dataProvider';
import { ProductShow } from './products';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="products" show={ProductShow} />
    </Admin>
);
```

That's enough to display the post show view above.

## Props

| Prop             | Required | Type              | Default | Description
|------------------|----------|-------------------|---------|--------------------------------------------------------
| `children`       | Optional&nbsp;* | `ReactNode`       |         | The components rendering the record fields
| `render`       | Optional&nbsp;* | `(showContext) => ReactNode`       |         | A function rendering the record fields, receive the show context as its argument
| `actions`        | Optional | `ReactElement`    |         | The actions to display in the toolbar
| `className`      | Optional | `string`          |         | passed to the root component
| `disableAuthentication` | Optional | `boolean` |         | Set to `true` to disable the authentication check
| `disableBreadcrumb`  | Optional  | `boolean` | `false` | Set to `true` to define a custom breadcrumb for the page, instead of the default one
| `emptyWhileLoading` | Optional | `boolean`     |         | Set to `true` to return `null` while the show is loading
| `id`             | Optional | `string | number` |         | The record id. If not provided, it will be deduced from the URL
| `queryOptions`   | Optional | `object`          |         | The options to pass to the `useQuery` hook
| `resource`       | Optional | `string`          |         | The resource name, e.g. `posts`
| `title`          | Optional | `string | ReactElement | false` |   | The title to display in the App Bar

`*` You must provide either `children` or `render`.

## Live Updates

If you want to subscribe to live updates the record (topic: `resource/[resource]/[id]`), you can rely on the [`useSubscribeToRecord`](https://marmelab.com/ra-core/usesubscribetorecord/). A sample use case would be to create an `<RecordLiveUpdate>` component that refreshes its parent `RecordContext` in a [`<Show>`](./Show.md) view when a record is updated.

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription. Once subscribed, the instructions to configure our private repository can be found in the [React-Admin Enterprise Edition documentation](https://react-admin-ee.marmelab.com/setup).

Once you have configured our private repository, you can install the `@react-admin/ra-core-ee` with the following command:

```bash
# With NPM
npm install @react-admin/ra-core-ee

# With PNPM
pnpm add @react-admin/ra-core-ee

# With YARN
yarn add @react-admin/ra-core-ee
```

### Creating the Component

The `LiveRecordUpdate` component can be created using the <a href="https://marmelab.com/ra-core/usesubscribetorecord/" target="_blank" rel="noreferrer">`useSubscribeToRecord</a> from `@react-admin/ra-core-ee`. Here is an example of such a `RecordLiveUpdate` component:

```tsx
// src/components/admin/record-live-update.tsx

import { useSubscribeToRecord } from '@react-admin/ra-core-ee';
import { Identifier, useShowContext } from 'ra-core';
import { useCallback } from 'react';

export const RecordLiveUpdate = (props: RecordLiveUpdateProps) => {
    const { refetch } = useShowContext();
    const handleUpdate = useCallback(() => {
        refetch();
    }, [refetch]);

    useSubscribeToRecord(handleUpdate, props.resource, props.id);

    return null;
};

type RecordLiveUpdateProps = {
    resource?: string;
    id?: Identifier;
};
```

### Usage

Add the `<RecordLiveUpdate>` in your `<Show>` children:

```tsx
import { TextField } from '@/components/admin/data-table';
import { RecordLiveUpdate } from '@/components/admin/record-live-update';
import { Show } from '@/components/admin/show';

const PostList = () => (
    <Show>
        <TextField source="title" />
        <RecordLiveUpdate />
    </Show>
);
```

To trigger refreshes of `<RecordLiveUpdate>`, the API has to publish events containing at least the followings:

```js
{
    topic : '/resource/{resource}/{id}',
    event: {
        type: 'updated',
        payload: { ids: [{listOfRecordIdentifiers}]},
    }
}
```
