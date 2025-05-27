import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Admin } from "@/components/admin";
import { ListGuesser } from "@/components/list-guesser";
import { ShowGuesser } from "@/components/show-guesser";
import { EditGuesser } from "@/components/edit-guesser";

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
