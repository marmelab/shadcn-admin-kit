---
title: MCP Server
---

Shadcn Admin Kit integrates seamlessly with AI agents through the Model Context Protocol (MCP). This integration enables your AI assistant to understand the Shadcn Admin Kit component library and generate admin interfaces more effectively. Two MCP servers can be used to provide the documentation to your AI agent:

- [`shadcn mcp`](#using-shadcn-mcp)
- [Context7](#using-context7)

## Using Shadcn MCP

This project is compatible with the new `shadcn mcp` command, and contains Cursor rules to instruct the LLM how to setup the `<Admin>` component, the Data Provider, and the resources.

### Prerequisites

It is recommended to use this registry within a **Next.js** or **Vite** project that already has **Tailwind CSS v4** configured.

#### Using Next.js

Example command to create a new Next.js project, configured with Shadcn UI and Tailwind CSS v4:

```bash
npx shadcn@latest init
```

#### Using Vite

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

### Setup the registry MCP

Follow the [Shadcn instructions](https://ui.shadcn.com/docs/mcp#quick-start) to create a new MCP server named `shadcn` that uses the `shadcn@latest mcp` command to fetch components:

```sh
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client cursor
npx shadcn@latest mcp init --client vscode
```

#### Update shadcn

Then, update your `components.json` file by adding the shadcn-admin-kit registry:

```
"registries": {
    "@shadcn-admin-kit": "https://marmelab.com/shadcn-admin-kit/r/{name}.json"
}
```

### Start prompting

You can now start prompting the LLM to create or edit the `<Admin>` component, the Data Provider, and the resources.

Some examples of prompts you can use:

- "show me all available components in the shadcn-admin-kit registry"
- "init this project using the shadcn-admin-kit registry"
- "create a new admin using the shadcn-admin-kit registry and declare 3 resources in it: posts, comments and users"
- "customize each resource to add a matching icon using the lucide library"

## Using Context7

The Shadcn Admin Kit documentation is also available through the [Context7 MCP Server](https://context7.com/marmelab/shadcn-admin-kit). This allow AI Agents to browse the Shadcn Admin Kit documentation when performing their tasks. Follow the instructions below to configure Context7 for your AI agent.

### Using Context7 with GitHub Copilot Agent in VSCode

To allow GitHub Copilot Agent to browse the Shadcn Admin Kit documentation using Context7 in VSCode, you can add the following MCP server configuration to your `.vscode/mcp.json` file. You can generate your API key from the [Context7 Dashboard](https://context7.com/dashboard).

```json
{
  "servers": {
    // other MCP servers...
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### Using Context7 with Claude Code

To allow Claude Code to browse the Shadcn Admin Kit documentation using Context7, you can add the MCP server with the following command. You can generate your API key from the [Context7 Dashboard](https://context7.com/dashboard).

```sh
claude mcp add --transport http context7 https://mcp.context7.com/mcp --header "CONTEXT7_API_KEY: YOUR_API_KEY"
```

### Using Context7 with Cursor

To allow Cursor to browse the Shadcn Admin Kit documentation using Context7 on VSCode, you can add the following MCP server configuration to your `.cursor/mcp.json` file. You can generate your API key from the [Context7 Dashboard](https://context7.com/dashboard).

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### Using Context7 with Another AI Agent

To allow your AI Agent to browse the Shadcn Admin Kit documentation using Context7, you can follow the installation instruction from the [Context7 Documentation](https://github.com/upstash/context7?tab=readme-ov-file#%EF%B8%8F-installation) for your AI Agent.
