import { Resource } from "ra-core";
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";
import { Users, MessageSquareText } from "lucide-react";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import { products } from "./products";
import { categories } from "./categories";
import { orders } from "./orders";
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
        name="reviews"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        icon={MessageSquareText}
      />
    </Admin>
  );
}

export default App;
