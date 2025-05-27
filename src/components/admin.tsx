import { CoreAdmin, CoreAdminProps } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider";
import { Layout } from "@/components/layout";
import { LoginPage } from "@/components/login-page";
import { ThemeProvider } from "@/components/theme-provider";

export const Admin = (props: CoreAdminProps) => {
  return (
    <ThemeProvider>
      <CoreAdmin
        i18nProvider={i18nProvider}
        layout={Layout}
        loginPage={LoginPage}
        {...props}
      />
    </ThemeProvider>
  );
};
