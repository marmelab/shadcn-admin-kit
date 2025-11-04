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
      logo: {
        light: "./public/logo-light.svg",
        dark: "./public/logo-dark.svg",
        alt: "Shadcn Admin Kit",
      },
      head: [
        // add Umami analytics script tag.
        {
          tag: "script",
          attrs: {
            src: "https://gursikso.marmelab.com/script.js",
            "data-website-id": "de7d7ee2-edef-4865-98f9-9dbfff042997",
            defer: true,
            async: true,
          },
        },
        {
          tag: "script",
          content: `window.addEventListener('load', () => document.querySelector('.site-title').href = 'https://marmelab.com/shadcn-admin-kit/')`,
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: ["install", "quick-start-guide", "guides-and-concepts"],
        },
        {
          label: "Application configuration",
          items: [
            "admin",
            "resource",
            "customroutes",
            "dataproviders",
            "security",
            "translation",
          ],
        },
        {
          label: "Page components",
          items: ["list", "edit", "show", "create"],
        },
        {
          label: "Data Display",
          items: [
            "datadisplay",
            "arrayfield",
            "badgefield",
            "bulkactionstoolbar",
            "columnsbutton",
            "count",
            "datatable",
            "datefield",
            "emailfield",
            "exportbutton",
            "filefield",
            "listpagination",
            "numberfield",
            "recordfield",
            "referencearrayfield",
            "referencefield",
            "referenceonefield",
            "referencemanycount",
            "referencemanyfield",
            enterpriseEntry("ReferenceManyToManyFieldBase"),
            "selectfield",
            "singlefieldlist",
            "sortbutton",
            "textfield",
            "togglefilterbutton",
            "urlfield",
          ],
        },
        {
          label: "Data Edition",
          items: [
            "dataedition",
            "arrayinput",
            "autocompletearrayinput",
            "autocompleteinput",
            "booleaninput",
            "bulkdeletebutton",
            "bulkexportbutton",
            "cancelbutton",
            "createbutton",
            "dateinput",
            "deletebutton",
            "editbutton",
            "fileinput",
            "numberinput",
            "radiobuttongroupinput",
            "referencearrayinput",
            "referenceinput",
            enterpriseEntry("ReferenceManyInputBase"),
            enterpriseEntry("ReferenceManyToManyInputBase"),
            enterpriseEntry("ReferenceOneInputBase"),
            "savebutton",
            "searchinput",
            "selectinput",
            "showbutton",
            "simpleform",
            "textinput",
          ],
        },
        {
          label: "UI & Layout",
          items: [
            "appsidebar",
            "breadcrumb",
            "confirm",
            "error",
            "layout",
            "loading",
            "localesmenubutton",
            "loginpage",
            "notification",
            "ready",
            "refreshbutton",
            "thememodetoggle",
            "usermenu",
          ],
        },
        {
          label: "I18N Provider & Translations",
          items: [
            raCoreEntry("translationsetup", "Setting Up"),
            raCoreEntry("translationlocales", "Supported Locales"),
            raCoreEntry("translationtranslating", "Translating UI Components"),
            raCoreEntry("translationwriting", "Writing an I18nProvider"),
            raCoreEntry("translate", "Translate"),
            raCoreEntry("uselocalestate", "useLocaleState"),
            raCoreEntry("usetranslate", "useTranslate"),
          ],
        },
        {
          label: "Misc",
          items: [
            enterpriseEntry("RealtimeFeatures", "Real-time"),
            enterpriseEntry("SoftDeleteFeatures", "Soft Delete"),
            "mcp",
          ],
        },
      ],
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
  redirects: {
    "/": "/shadcn-admin-kit/docs/install",
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

/**
 * @param {string} name
 * @param {string | undefined} label
 * @returns {any}
 */
function enterpriseEntry(name, label = undefined) {
  return {
    link: `${name.toLowerCase()}/`,
    label: label ?? name,
    attrs: { class: "enterprise" },
    badge: {
      text: "React Admin Enterprise",
      variant: "default",
    },
  };
}

/**
 * @param {string} name
 * @param {string | undefined} label
 * @returns {any}
 */
function raCoreEntry(name, label = undefined) {
  return {
    link: `https://marmelab.com/ra-core/${name.toLowerCase()}/`,
    label: label ?? name,
    attrs: { class: "ra-core", target: "_blank", rel: "noreferrer" },
    badge: {
      text: "RA Core",
      variant: "default",
    },
  };
}
