import { CoreAdmin, CoreAdminProps } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider";
import { Layout } from "@/components/Layout";
import { LoginPage } from "@/components/LoginPage";

export const Admin = (props: CoreAdminProps) => {
  return (
    <CoreAdmin
      i18nProvider={i18nProvider}
      layout={Layout}
      loginPage={LoginPage}
      {...props}
    />
  );
}

