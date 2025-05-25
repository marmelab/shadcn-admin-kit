import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { Admin } from "@/components/Admin";
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";
import { EditGuesser } from "@/components/EditGuesser";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="products"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="reference"
      />
      <Resource
        name="categories"
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
        recordRepresentation="name"
      />
    </Admin>
  );
}

export default App;
