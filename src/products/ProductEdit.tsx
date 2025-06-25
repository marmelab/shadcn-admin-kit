import {
  AutocompleteInput,
  Edit,
  FormToolbar,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import { required, useTranslate, WithRecord } from "ra-core";

export const ProductEdit = () => {
  const translate = useTranslate();
  return (
    <Edit>
      <SimpleForm
        className="min-w-xl"
        toolbar={<FormToolbar className="ml-32 pl-4" />}
      >
        <div className="flex flex-row gap-4 mb-4">
          <h3 className="min-w-32 text-sm font-semibold">
            {translate("resources.products.tabs.image")}
          </h3>
          <div className="border rounded-sm p-4 bg-secondary flex-1 flex flex-col gap-4">
            <WithRecord
              render={(record) => (
                <img
                  src={record.image}
                  alt={record.name}
                  className="w-full h-auto rounded-sm"
                />
              )}
            />
            <TextInput
              source="image"
              validate={required()}
              className="[&>input]:bg-white"
            />
            <TextInput
              source="thumbnail"
              validate={required()}
              className="[&>input]:bg-white"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <h3 className="min-w-32 text-sm font-semibold">
            {translate("resources.products.tabs.details")}
          </h3>
          <div className="border rounded-sm p-4 bg-secondary flex-1 grid grid-cols-2 gap-4">
            <TextInput
              source="reference"
              label="Reference"
              validate={required()}
              className="[&>input]:bg-white"
            />
            <ReferenceInput source="category_id" reference="categories">
              <AutocompleteInput label="Category" validate={required()} />
            </ReferenceInput>
            <TextInput
              source="width"
              type="number"
              className="[&>input]:bg-white"
            />
            <TextInput
              source="height"
              type="number"
              className="[&>input]:bg-white"
            />
            <TextInput
              source="price"
              type="number"
              className="[&>input]:bg-white"
            />
            <TextInput
              source="stock"
              label="Stock"
              type="number"
              className="[&>input]:bg-white"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 mb-4">
          <h3 className="min-w-32 text-sm font-semibold">
            {translate("resources.products.tabs.description")}
          </h3>
          <div className="border rounded-sm p-4 bg-secondary flex-1 ">
            <TextInput
              source="description"
              label={false}
              multiline
              validate={required()}
              className="[&>textarea]:bg-white"
            />
          </div>
        </div>
      </SimpleForm>
    </Edit>
  );
};
