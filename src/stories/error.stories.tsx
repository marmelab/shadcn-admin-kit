import { CoreAdminContext } from "ra-core";
import { ThemeProvider } from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { ReactNode } from "react";
import { Error as RaError } from "@/components/admin/error";

export default {
  title: "Layout/Error",
  parameters: {
    docs: {
      // 👇 Enable Code panel for all stories in this file
      codePanel: true,
    },
  },
};

const StoryWrapper = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
}) => (
  <ThemeProvider defaultTheme={theme}>
    <CoreAdminContext i18nProvider={i18nProvider}>{children}</CoreAdminContext>
  </ThemeProvider>
);

const errorInfo = {
  componentStack: `at list (http://localhost:9009/src-solar-layout-SolarLayout-stories.iframe.bundle.js:341:11)
    at RestoreScrollPosition (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_Resource_js-node_modules_ra-core_dist_esm_inferenc-7f042f.iframe.bundle.js:1180:23)
    at RenderedRoute (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:7754:5)
    at Routes (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8444:5)
    at ResourceContextProvider (http://localhost:9009/vendors-node_modules_mui_material_Dialog_Dialog_js-node_modules_mui_material_DialogContent_Di-0b3dc9.iframe.bundle.js:798:23)
    at Resource (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_Resource_js-node_modules_ra-core_dist_esm_inferenc-7f042f.iframe.bundle.js:656:24)
    at RenderedRoute (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:7754:5)
    at Routes (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8444:5)
    at Suspense
    at ErrorBoundary (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:6123:5)
    at div
    at main
    at div
    at div
    at http://localhost:9009/vendors-node_modules_mui_material_styles_createTheme_js-node_modules_mui_material_styles_iden-761c7e.iframe.bundle.js:898:66
    at AppLocationContext (http://localhost:9009/packages_ra-navigation_src_app-location_index_ts.iframe.bundle.js:74:5)
    at SolarLayout (http://localhost:9009/packages_ra-navigation_src_solar-layout_index_ts.iframe.bundle.js:243:13)
    at RenderedRoute (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:7754:5)
    at Routes (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8444:5)
    at CoreAdminRoutes (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:2349:61)
    at RenderedRoute (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:7754:5)
    at Routes (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8444:5)
    at ErrorBoundary (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:6123:5)
    at CoreAdminUI (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:2432:61)
    at CssBaseline (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:661:87)
    at AdminUI (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_AdminUI_js-node_modules_react-admin_dist_esm_d-3b3a72.iframe.bundle.js:3293:17)
    at DefaultPropsProvider (http://localhost:9009/vendors-node_modules_mui_material_styles_createTheme_js-node_modules_mui_material_styles_iden-761c7e.iframe.bundle.js:3258:3)
    at RtlProvider (http://localhost:9009/vendors-node_modules_mui_material_styles_ThemeProvider_js.iframe.bundle.js:234:7)
    at ThemeProvider (http://localhost:9009/vendors-node_modules_mui_material_styles_ThemeProvider_js.iframe.bundle.js:107:5)
    at ThemeProvider (http://localhost:9009/vendors-node_modules_mui_material_styles_ThemeProvider_js.iframe.bundle.js:319:5)
    at ThemeProvider (http://localhost:9009/vendors-node_modules_mui_material_styles_ThemeProvider_js.iframe.bundle.js:35:14)
    at ThemeProvider (http://localhost:9009/vendors-node_modules_ra-ui-materialui_dist_esm_theme_ThemeProvider_js-node_modules_ra-ui-mate-421a31.iframe.bundle.js:191:23)
    at ResourceDefinitionContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_ResourceDefinitionContext_js-node_modules_ra-core_-bd43fe.iframe.bundle.js:115:17)
    at UndoableMutationsContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:251:23)
    at NotificationContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:359:23)
    at I18nContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_ResourceDefinitionContext_js-node_modules_ra-core_-bd43fe.iframe.bundle.js:183:17)
    at DummyRouter (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:487:23)
    at BasenameContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:525:23)
    at AdminRouter (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:480:17)
    at QueryClientProvider (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:6404:3)
    at PreferencesEditorContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:408:23)
    at StoreContextProvider (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:549:20)
    at CoreAdminContext (http://localhost:9009/vendors-node_modules_ra-core_dist_esm_core_CoreAdminContext_js.iframe.bundle.js:109:30)
    at AdminContext (http://localhost:9009/vendors-node_modules_mui_icons-material_CancelOutlined_js-node_modules_mui_material_Avatar_Av-19aa82.iframe.bundle.js:570:23)
    at Admin (http://localhost:9009/vendors-node_modules_react-admin_dist_esm_Admin_js.iframe.bundle.js:322:30)
    at Router (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8378:15)
    at MemoryRouter (http://localhost:9009/vendors-node_modules_tanstack_query-core_build_modern_mutation_js-node_modules_tanstack_query-814204.iframe.bundle.js:8273:5)
    at unboundStoryFn (http://localhost:9009/sb-preview/runtime.js:41:3662)
    at ErrorBoundary (http://localhost:9009/vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_client_ErrorOverlayEntry_js-node_mod-35ec03.iframe.bundle.js:2290:439)
    at WithCallback (http://localhost:9009/vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_client_ErrorOverlayEntry_js-node_mod-35ec03.iframe.bundle.js:2262:34)`,
};

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => {
  console.log({ errorInfo });
  return (
    <StoryWrapper theme={theme}>
      <RaError
        error={new Error("An expected error occurred")}
        errorInfo={errorInfo}
        resetErrorBoundary={() => {}}
      />
    </StoryWrapper>
  );
};

Basic.args = {
  theme: "system",
};

Basic.argTypes = {
  theme: {
    type: "select",
    options: ["light", "dark", "system"],
  },
};
