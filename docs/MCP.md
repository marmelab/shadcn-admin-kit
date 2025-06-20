# Shadcn Admin Kit + MCP

This project is compatible with the new `shadcn@canary registry:mcp` command, and contains cursor rules to instruct the LLM how to setup the `<Admin>` component, the Data Provider, and the resources.

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

https://ui.shadcn.com/docs/installation/vite

## Setup the registry MCP

Create a file named `.cursor/mcp.json` and copy the following content into it:

```json
{
    "mcpServers": {
        "shadcn-admin-kit": {
            "command": "npx",
            "args": [
                "-y",
                "shadcn@canary",
                "registry:mcp"
            ],
            "env": {
                "REGISTRY_URL": "https://marmelab.com/shadcn-admin-kit/r/registry.json"
            }
        }
    }
}
```

This will create a new MCP server named `shadcn-admin-kit` that uses the `shadcn@canary registry:mcp` command to fetch components from the Shadcn Admin Kit registry.

## Start prompting

You can now start prompting the LLM to create or edit the `<Admin>` component, the Data Provider, and the resources.

Some examples of prompts you can use:

- "init this project using the registry"
- "create a new admin component (use it as the main rendered component) and declare 3 resources in the admin: posts, comments and users"
- "customize each resource to add a matching icon using the lucide library"
