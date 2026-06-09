import React from "react";
import { CoreAdminContext, memoryStore } from "ra-core";
import { MemoryRouter } from "react-router";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { AuthError } from "@/components/admin/authentication";

export default {
  title: "Layout/AuthError",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const Wrapper = ({
  children,
  basename,
}: React.PropsWithChildren<{
  basename?: string;
}>) => (
  <MemoryRouter initialEntries={["/"]}>
    <ThemeProvider>
      <CoreAdminContext
        i18nProvider={i18nProvider}
        store={memoryStore()}
        basename={basename}
      >
        {children}
      </CoreAdminContext>
    </ThemeProvider>
  </MemoryRouter>
);

export const Basic = ({ message }: { message?: string }) => (
  <Wrapper>
    <AuthError message={message} />
  </Wrapper>
);

Basic.args = {
  message: undefined,
};

Basic.argTypes = {
  message: {
    type: "string",
  },
};

export const WithBasename = () => (
  <Wrapper basename="/admin">
    <AuthError />
  </Wrapper>
);
