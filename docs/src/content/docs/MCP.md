---

title: MCP Server

---

This project is compatible with the new `shadcn mcp` command, and contains Cursor rules to instruct the LLM how to setup the `<Admin>` component, the Data Provider, and the resources.

## Prerequisites

It is recommended to use this registry within a **Vite** project that already has **Tailwind CSS v4** configured.

Example command to create a new Vite project:

```bash
npm create vite@latest my-shadcn-admin-app -- --template react-ts
```

Instructions to install and setup Tailwind CSS v4:

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `src/index.css` with the following:

```css
@import "tailwindcss";
```

Make sure to also properly configure the `tsconfig.json` and `tsconfig.app.json` files as instructed here:

<https://ui.shadcn.com/docs/installation/vite>

Initialize ShadCN:

```sh
npx shadcn@latest init
```

## Setup the registry MCP

Follow the [Shadcn instructions](https://ui.shadcn.com/docs/mcp#quick-start) to create a new MCP server named `shadcn` that uses the `shadcn@latest mcp` command to fetch components:

```sh
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client cursor
npx shadcn@latest mcp init --client vscode
```

### Update shadcn

Then, update your `components.json` file by adding the shadcn-admin-kit registry:   
```
"registries": {
    "@shadcn-admin-kit": "https://marmelab.com/shadcn-admin-kit/r/{name}.json"
}
```

## Start prompting

You can now start prompting the LLM to create or edit the `<Admin>` component, the Data Provider, and the resources.

Some examples of prompts you can use:

- "show me all available components in the shadcn-admin-kit registry"
- "init this project using the shadcn-admin-kit registry"
- "create a new admin using the shadcn-admin-kit registry and declare 3 resources in it: posts, comments and users"
- "customize each resource to add a matching icon using the lucide library"
