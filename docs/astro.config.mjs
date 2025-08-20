// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeCodeGroup from "rehype-code-group";
import expressiveCode from "astro-expressive-code";
import { pluginFullscreen } from "expressive-code-fullscreen";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import rehypeAstroRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Shadcn Admin Kit",
      customCss: ["./src/styles/global.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/marmelab/shadcn-admin-kit",
        },
      ],
      favicon: "/icon.png",
    }),
    expressiveCode({
      plugins: [pluginFullscreen(), pluginCollapsibleSections()],
    }),
    react(),
    mdx(),
  ],
  markdown: {
    rehypePlugins: [
      rehypeCodeGroup,
      [
        rehypeAstroRelativeMarkdownLinks,
        {
          base: "/shadcn-admin-kit/docs/",
          collectionBase: false,
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  base: "/shadcn-admin-kit/docs/",
  site: "https://marmelab.com",
  build: {
    assets: "astro-assets",
  },
});
