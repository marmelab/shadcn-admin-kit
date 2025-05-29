import { Resource } from "ra-core";
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";
import { Users } from "lucide-react";
import { DollarSign } from "lucide-react";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import { products } from "./products";
import { categories } from "./categories";
import { Dashboard } from "./dashboard/Dashboard";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
    >
      <Resource {...products} />
      <Resource {...categories} />
      <Resource
        name="customers"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation={(record) =>
          `${record.first_name} ${record.last_name}`
        }
        icon={Users}
      />
      <Resource
        name="orders"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
        icon={DollarSign}
      />
    </Admin>
  );
}

export default App;
