import {
  Edit,
  ReferenceManyField,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import { required, Translate } from "ra-core";
import { Link } from "react-router";

export const CategoryEdit = () => (
  <Edit>
    <div className="flex flex-col lg:flex-row items-start justify-between">
      <SimpleForm>
        <TextInput source="name" label="Name" validate={required()} />
      </SimpleForm>

      <ReferenceManyField
        reference="products"
        target="category_id"
        perPage={100}
        render={({ data }) =>
          data && (
            <div>
              <h3 className="font-semibold text-sm mb-2">
                <Translate
                  i18nKey="resources.products.name"
                  options={{ smart_count: 10 }}
                />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
                {data.map((product) => (
                  <Link
                    className="border"
                    key={product.id}
                    to={`/products/${product.id}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
        }
      />
    </div>
  </Edit>
);
