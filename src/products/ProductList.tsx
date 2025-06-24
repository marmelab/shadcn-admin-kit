import {
  AutocompleteInput,
  List,
  ListPagination,
  NumberField,
  ReferenceInput,
  TextField,
  TextInput,
} from "@/components/admin";
import {
  RecordContextProvider,
  useListContext,
  useRecordContext,
} from "ra-core";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  reference: string;
  description: string;
  category_id: number;
  width: number;
  height: number;
  price: number;
  stock: number;
  thumbnail: string;
  image: string;
};

const filters = [
  <TextInput source="q" placeholder="Search products..." label={false} />,
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by category" label={false} />
  </ReferenceInput>,
];

export const ProductList = () => {
  return (
    <List
      filters={filters}
      perPage={24}
      pagination={
        <ListPagination
          rowsPerPageOptions={[12, 24, 48, 72]}
          className="mt-2"
        />
      }
      sort={{ field: "reference", order: "ASC" }}
    >
      <ImageGrid />
    </List>
  );
};

const ImageGrid = () => {
  const { isPending, error, data } = useListContext<Product>();
  if (isPending || error) {
    return null; // Handle loading or error state
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
      {data.map((product) => (
        <RecordContextProvider key={product.id} value={product}>
          <Link to={`/products/${product.id}`}>
            <ImageThumbnail />
          </Link>
        </RecordContextProvider>
      ))}
    </div>
  );
};

const ImageThumbnail = () => {
  const product = useRecordContext<Product>();
  if (!product) return null;
  return (
    <div>
      <div className="image-container overflow-hidden">
        <img
          src={product.thumbnail || product.image}
          alt={product.description}
          className="w-full h-32 object-cover mb-1 transition-transform duration-300 ease-in-out hover:scale-125"
        />
      </div>
      <div className="flex flex-row gap-1 items-center justify-between">
        <TextField source="reference" className="text-lg font-bold" />
        <NumberField
          source="price"
          options={{
            style: "currency",
            currency: "USD",
          }}
          className="text-sm font-semibold"
        />
      </div>
      <TextField
        source="description"
        className="block text-sm text-gray-600 truncate"
      />
    </div>
  );
};
