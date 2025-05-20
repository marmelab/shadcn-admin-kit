import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { Admin } from "@/components/Admin";
import { products } from "./products";
import { categories } from "./categories";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource {...products} />
      <Resource {...categories} />
    </Admin>
  );
}

export default App;
