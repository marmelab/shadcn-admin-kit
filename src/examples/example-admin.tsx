"use client";

import { Resource } from "ra-core";
import jsonServerProvider from "ra-data-json-server";
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";

const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com/",
);

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
