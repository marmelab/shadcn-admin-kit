import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import { Admin } from "@/components/admin";
import { ListGuesser } from "@/components/list-guesser";
import { ShowGuesser } from "@/components/show-guesser";
import { EditGuesser } from "@/components/edit-guesser";
import { products } from "./products";
import { categories } from "./categories";
import { Users } from "lucide-react";
import { DollarSign } from "lucide-react";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
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
