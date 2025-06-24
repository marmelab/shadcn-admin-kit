/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  ListPagination,
  NumberField,
  TextField,
  TextInput,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import {
  FilterLiveForm,
  RecordContextProvider,
  useGetList,
  useListContext,
  useRecordContext,
  useTranslate,
} from "ra-core";
import { Link } from "react-router-dom";
import matches from "lodash/matches";
import pickBy from "lodash/pickBy";
import { DollarSign, ChartNoAxesColumn, Tag } from "lucide-react";
import { humanize } from "inflection";

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

type Category = {
  id: number;
  name: string;
};

export const ProductList = () => {
  return (
    <List
      perPage={24}
      pagination={
        <ListPagination
          rowsPerPageOptions={[12, 24, 48, 72]}
          className="mt-2"
        />
      }
      sort={{ field: "reference", order: "ASC" }}
    >
      <div className="flex flex-row gap-4 mb-4">
        <SidebarFilters />
        <ImageGrid />
      </div>
    </List>
  );
};

const ImageGrid = () => {
  const { isPending, error, data } = useListContext<Product>();
  if (isPending || error) {
    return null; // Handle loading or error state
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
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

const SidebarFilters = () => {
  const translate = useTranslate();
  const { data } = useGetList<Category>("categories", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });
  return (
    <div className="min-w-48 hidden md:block">
      <FilterLiveForm>
        <TextInput
          source="q"
          placeholder={translate("ra.action.search")}
          label={false}
          className="mb-3"
        />
      </FilterLiveForm>
      <h3 className="flex flex-row items-center gap-2 mb-1 font-bold">
        <DollarSign size={16} />
        {translate("resources.products.filters.sales")}
      </h3>
      <div className="flex flex-col items-start ml-3 mb-2">
        <ToggleFilterButton
          label="resources.products.filters.best_sellers"
          value={{
            sales_lte: undefined,
            sales_gt: 25,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.average_sellers"
          value={{
            sales_lte: 25,
            sales_gt: 10,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.low_sellers"
          value={{
            sales_lte: 10,
            sales_gt: 0,
            sales: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.never_sold"
          value={{
            sales_lte: undefined,
            sales_gt: undefined,
            sales: 0,
          }}
        />
      </div>
      <h3 className="flex flex-row items-center gap-2 mb-1 font-bold">
        <ChartNoAxesColumn size={16} />
        {translate("resources.products.filters.stock")}
      </h3>
      <div className="flex flex-col items-start ml-3 mb-2">
        <ToggleFilterButton
          label="resources.products.filters.no_stock"
          value={{
            stock_lt: undefined,
            stock_gt: undefined,
            stock: 0,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.low_stock"
          value={{
            stock_lt: 10,
            stock_gt: 0,
            stock: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.average_stock"
          value={{
            stock_lt: 50,
            stock_gt: 9,
            stock: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.products.filters.enough_stock"
          value={{
            stock_lt: undefined,
            stock_gt: 49,
            stock: undefined,
          }}
        />
      </div>
      <h3 className="flex flex-row items-center gap-2 mb-1 font-bold">
        <Tag size={16} />
        {translate("resources.products.filters.categories")}
      </h3>
      <div className="flex flex-col items-start ml-3 mb-2">
        {data &&
          data.map((record: any) => (
            <ToggleFilterButton
              label={humanize(record.name)}
              key={record.id}
              value={{ category_id: record.id }}
            />
          ))}
      </div>
    </div>
  );
};

const ToggleFilterButton = ({
  label,
  value,
  className,
}: {
  label: string;
  value: any;
  className?: string;
}) => {
  const { filterValues, setFilters } = useListContext();
  const translate = useTranslate();
  const isSelected = getIsSelected(value, filterValues);
  const handleClick = () => setFilters(toggleFilter(value, filterValues));
  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      onClick={handleClick}
      className={className}
      size="sm"
    >
      {translate(label, { _: label })}
    </Button>
  );
};

const toggleFilter = (value: any, filters: any) => {
  const isSelected = matches(
    pickBy(value, (val) => typeof val !== "undefined")
  )(filters);

  if (isSelected) {
    const keysToRemove = Object.keys(value);
    return Object.keys(filters).reduce(
      (acc, key) =>
        keysToRemove.includes(key) ? acc : { ...acc, [key]: filters[key] },
      {}
    );
  }

  return { ...filters, ...value };
};

const getIsSelected = (value: any, filters: any) =>
  matches(pickBy(value, (val) => typeof val !== "undefined"))(filters);
