import { Resource } from "ra-core";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { Admin } from "@/components/Admin";
// import { products } from "./products";
import { products } from "./products/index-guessers";
// import { categories } from "./categories";
import { categories } from "./categories/index-guessers";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource {...products} />
      <Resource {...categories} />
    </Admin>
  );
}

export default App;
