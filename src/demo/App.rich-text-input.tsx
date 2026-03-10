import { CoreAdminContext, RecordContextProvider } from "ra-core";

import { SimpleForm, ThemeProvider } from "@/components/admin";
import { RichTextInput } from "@/components/rich-text-input";
import { i18nProvider } from "@/lib/i18nProvider";

const record = {
  id: 1,
  body: "<p>Smoke test content</p>",
};

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <CoreAdminContext i18nProvider={i18nProvider}>
        <RecordContextProvider value={record}>
          <main className="mx-auto max-w-3xl p-6">
            <SimpleForm defaultValues={record} toolbar={null}>
              <RichTextInput source="body" />
            </SimpleForm>
          </main>
        </RecordContextProvider>
      </CoreAdminContext>
    </ThemeProvider>
  );
}

export default App;
