---
title: "LocalesMenuButton"
---

Also known as the "language switcher", it displays a menu allowing users to select the language of the interface.

It leverages the [store](https://marmelab.com/shadcn-admin-kit/Store.html) so that their selection is persisted.

## Usage

For most users, this component will be automatically added to the header of shadcn-admin-kit's default `<Layout>` if the `i18nProvider` is configured properly to return a list of available locales. It will use the optional `i18nProvider.getLocales()` method (or the `availableLocales` parameter if you are using `polyglotI18nProvider`) to generate a list of locale menu items for this component.

For custom layouts, or to put the language switcher in a settings menu, simply render the component without props:

```jsx
import { LocalesMenuButton } from 'shadcn-admin-kit';

<LocalesMenuButton />
```

Don't forget to setup the `i18nProvider` in your `<Admin>` component. For instance, using `polyglotI18nProvider` with English and French translations:

```jsx
// in src/App.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { Admin } from '@/components/admin';
import { Resource } from 'ra-core';

const i18nProvider = polyglotI18nProvider(
    locale => (locale === 'fr' ? frenchMessages : englishMessages),
    'en', // Default locale
    [{ locale: 'en', name: 'English' }, { locale: 'fr', name: 'Français' }]
);

const App = () => (
    <Admin
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}
    >
        ...
    </Admin>
);
```
