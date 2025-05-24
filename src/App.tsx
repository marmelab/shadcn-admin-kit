import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { Admin } from "@/components/Admin";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";
import { EditGuesser } from "@/components/EditGuesser";
import { products } from "./products";
import { categories } from "./categories";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
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
      />
      <Resource
        name="orders"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
      />
    </Admin>
  );
}

export default App;
