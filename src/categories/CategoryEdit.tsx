import {
  Edit,
  ReferenceManyField,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import { required } from "ra-core";
import { Link } from "react-router-dom";

export const CategoryEdit = () => (
  <Edit>
    <div className="flex items-start justify-between">
      <SimpleForm>
        <TextInput source="name" label="Name" validate={required()} />
      </SimpleForm>
      <ReferenceManyField
        reference="products"
        target="category_id"
        perPage={100}
        render={({ data }) =>
          data && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mt-6">
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
          )
        }
      />
    </div>
  </Edit>
);
