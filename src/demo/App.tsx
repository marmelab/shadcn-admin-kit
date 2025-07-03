import { Resource } from "ra-core";
import { Admin } from "@/components/admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import { products } from "./products";
import { categories } from "./categories";
import { orders } from "./orders";
import { customers } from "./customers";
import { reviews } from "./reviews";
import { Dashboard } from "./dashboard/Dashboard";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
    >
      <Resource {...orders} />
      <Resource {...products} />
      <Resource {...categories} />
      <Resource {...customers} />
      <Resource {...reviews} />
    </Admin>
  );
}

export default App;
