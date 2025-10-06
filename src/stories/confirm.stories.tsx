import { useState } from "react";
import {
  Resource,
  TestMemoryRouter,
  useDelete,
  useRecordContext,
  useRedirect,
  useResourceContext,
} from "ra-core";
import fakeRestProvider from "ra-data-fakerest";
import { i18nProvider } from "@/lib/i18nProvider";
import { Button } from "@/components/ui/button";
import { Admin, Show, ListGuesser } from "@/components/admin";
import { Confirm } from "@/components/admin/confirm";

export default {
  title: "Layout/Confirm",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const DeleteButton = () => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOne, { isPending }] = useDelete();
  const redirect = useRedirect();

  const handleDelete = () => {
    deleteOne(
      resource,
      { id: record?.id, previousData: record },
      {
        onSuccess: () => {
          setIsOpen(false);
          redirect("list", resource);
        },
      },
    );
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      <Confirm
        isOpen={isOpen}
        title="Are you sure you want to delete this element?"
        content="This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};

export const Basic = () => (
  <TestMemoryRouter initialEntries={["/products/1/Show"]}>
    <Admin
      dataProvider={fakeRestProvider({
        products: [{ id: 1, name: "Acme Thingy" }],
      })}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="products"
        list={ListGuesser}
        show={() => (
          <Show>
            <DeleteButton />
          </Show>
        )}
      />
    </Admin>
  </TestMemoryRouter>
);
