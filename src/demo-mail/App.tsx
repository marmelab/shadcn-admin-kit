import { Resource, localStorageStore } from "ra-core";
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { dataProvider } from "./dataProvider";
import { i18nProvider } from "./i18nProvider";

// The e-commerce demo is served from the same origin, so this demo keeps its
// preferences (theme, locale, list params) under its own store key.
const store = localStorageStore(undefined, "demo-mail");

const App = () => (
  <Admin dataProvider={dataProvider} i18nProvider={i18nProvider} store={store}>
    <Resource name="threads" list={ListGuesser} />
    <Resource name="messages" list={ListGuesser} />
  </Admin>
);

export default App;
