import { Inbox } from "lucide-react";
import { Resource, localStorageStore } from "ra-core";
import { Admin } from "@/components/admin/admin";
import { dataProvider } from "./dataProvider";
import { i18nProvider } from "./i18nProvider";
import { MailLayout } from "./layout/MailLayout";
import { ThreadList } from "./threads/ThreadList";

// The e-commerce demo is served from the same origin, so this demo keeps its
// preferences (theme, locale, list params) under its own store key. A logout
// there still clears them, as ra-core resets every key of every app.
const store = localStorageStore(undefined, "demo-mail");

const App = () => (
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    layout={MailLayout}
    store={store}
  >
    <Resource name="threads" list={ThreadList} icon={Inbox} />
    <Resource name="messages" />
  </Admin>
);

export default App;
