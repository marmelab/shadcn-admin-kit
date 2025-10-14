---

title: Installation

---

`shadcn-admin-kit` is a React library of components for admin apps. You can install it with any React framework:

- [Install with Next.js](#install-with-nextjs)
- [Install with Vite](#install-with-vitejs)

## Install with Next.js

The first step is to create a new Next.js project using the `create-next-app` command.

```bash
npx create-next-app@latest
```

A prompt will asks you some questions, it is important that you answer:

- `Yes` to `Would you like to use TypeScript?`
- `Yes` to `Would you like to use Tailwind CSS?`
- `No` to ` Would you like your code inside a ``src/`` directory? `
- `Yes` to `Would you like to use App Router? (recommended)`
- `Yes` to ` Would you like to customize the import alias (``@/*`` by default) `
- `@/*` to `What import alias would you like configured?`

Feel free to choose answers according to your needs for the other questions. As for the App Router, this tutorial assumes that you are using it.

```bash
npx create-next-app@latest
Need to install the following packages:
create-next-app@15.3.3
Ok to proceed? (y) y

✔ What is your project named? … shadcn-admin-next
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like your code inside a `src/` directory? No
✔ Would you like to use App Router? (recommended) Yes
✔ Would you like to use Turbopack for `next dev`? Yes
✔ Would you like to customize the import alias (`@/*` by default)? Yes
✔ What import alias would you like configured? … @/*
```

Set the `verbatimModuleSyntax` option to `false` in your `tsconfig.json` file to avoid an [issue](https://github.com/shadcn-ui/ui/issues/6618) with the latest version of TypeScript.

```json title="tsconfig.json" ins={4}
{
  "compilerOptions": {
    // ...
    "verbatimModuleSyntax": false
  }
}
```

Next, pull the `shadcn-admin-kit` components using the `shadcn` command:

```bash
npx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
```

This will add some components to the `components/admin` directory, and utilities inside the `hooks` and `lib` directories.

You're ready to bootstrap your app. Create an `app/admin/AdminApp.tsx` component file that will contain the admin app.

```tsx title="app/admin/AdminApp.tsx"
"use client";

import { Admin } from "@/components/admin";

const AdminApp = () => (
  <Admin>
  </Admin>
);

export default AdminApp;
```

Expose that admin app at the `/admin` URL by adding a `app/admin/page.tsx` file. You'll have to dynamically import the admin component and render it with SSR disabled (since it's a SPA).

```tsx title="app/admin/page.tsx"
"use client";

import dynamic from "next/dynamic";

const Admin = dynamic(() => import("./AdminApp"), {
  ssr: false, // Required to avoid react-router related errors
});

export default function Page() {
  return <Admin />;
}
```

Finally, run `npm run dev` and go to `http://localhost:3000/admin` to access your admin app.

![Welcome to shadcn-admin-kit!](./images/welcome.png)

Next step: Read the [Quick Start Guide](./Quick-Start-Guide.md) to learn how to use the components in your admin app.

## Install with Vite.js

`shadcn-admin-kit` is built on React, so you need to create a Vite single-page app to use it.

```shell
npm create vite@latest my-shadcn-admin-app -- --template react-ts
or
yarn create vite my-shadcn-admin-app --template react-ts
```

Then, you need to [install shadcn/ui](https://ui.shadcn.com/docs/installation/vite) in your project. To do so, add Tailwind CSS.

```shell
npm install tailwindcss @tailwindcss/vite
# or
yarn add tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with the following:

```shell
@import "tailwindcss";
```

Edit `tsconfig.json` file. Add the `baseUrl` and `paths` properties to the `compilerOptions` section of the `tsconfig.json` and `tsconfig.app.json` files:

```json title="tsconfig.json" ins={11-16}
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Add the following code to the `tsconfig.app.json` file to resolve paths, for your IDE:

```json title="tsconfig.app.json" ins={4-9}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

Install node types:

```shell
npm install -D @types/node
# or
yarn add -D @types/node
```

 Add the following code to the `vite.config.ts` so your app can resolve paths without error:

```tsx title="vite.config.ts" ins={1-2,8-13}
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

Now, run the `shadcn` init command to setup your project:

```shell
npx shadcn@latest init
# or
yarn shadcn init
```

You will be asked a few questions to configure `components.json`.

You can now start adding components to your project. Let's start with the `shadcn-admin-kit` components.

```shell
npx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
```

**Warning**: you need to set the `verbatimModuleSyntax` option to `false` in your `tsconfig.app.json` file to avoid an [issue](https://github.com/shadcn-ui/ui/issues/6618) with the latest version of TypeScript.

```json title="tsconfig.app.json" ins={4}
{
  "compilerOptions": {
    // ...
     "verbatimModuleSyntax": false
  }
}
```

The main entry point of your new application is `main.tsx`, which renders the `App` component into the DOM.

```tsx title="main.tsx"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
```

The `<App>` component currently renders a default Vite application. You can replace all its content by the following to serve your new `shadcn-admin-kit` application.

```tsx title="App.tsx"
import { Admin } from "@/components/admin";

function App() {
    return <Admin></Admin>;
}

export default App;
```

It's time to test! Run the following command to run your project.

```shell
npm run dev
# or
yarn dev
```

You should see this:

![Welcome to shadcn-admin-kit!](./images/welcome.png)

Next step: Read the [Quick Start Guide](./Quick-Start-Guide.md) to learn how to use the components in your admin app.
