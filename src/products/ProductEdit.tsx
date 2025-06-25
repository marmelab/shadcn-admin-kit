import {
  AutocompleteInput,
  Edit,
  FormToolbar,
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  SimpleForm,
  TextInput,
} from "@/components/admin";
import {
  RecordContextProvider,
  required,
  useRecordContext,
  Translate,
  WithRecord,
} from "ra-core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Product, Review, Customer } from "@/types";
import { Link } from "react-router-dom";
import { StarRatingField, StarArray } from "../reviews/StarRatingField";

export const ProductEdit = () => {
  return (
    <Edit>
      <div className="flex items-start justify-between gap-2 mb-4">
        <SimpleForm
          className="max-w-xl"
          toolbar={
            <FormToolbar className="md:pl-36 pt-4 pb-4 sticky bottom-0 bg-linear-to-b from-transparent to-background to-10%" />
          }
        >
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <h3 className="min-w-32 text-sm font-semibold">
              <Translate i18nKey="resources.products.tabs.image" />
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
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <h3 className="min-w-32 text-sm font-semibold">
              <Translate i18nKey="resources.products.tabs.details" />
            </h3>
            <div className="border rounded-sm p-4 bg-secondary flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex flex-col md:flex-row gap-4">
            <h3 className="min-w-32 text-sm font-semibold">
              <Translate i18nKey="resources.products.tabs.description" />
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
        <ProductReviews />
      </div>
    </Edit>
  );
};

const ProductReviews = () => (
  <ReferenceManyField<Product, Review>
    reference="reviews"
    target="product_id"
    sort={{ field: "date", order: "DESC" }}
    render={({ data }) =>
      data &&
      data.length > 0 && (
        <div className="hidden lg:block max-w-100 border rounded-sm p-4">
          <div className="flex flex-col items-center mb-6 gap-2">
            <h3 className="text-sm font-semibold">
              <Translate
                i18nKey="resources.reviews.name"
                options={{ smart_count: 10 }}
              />
            </h3>
            <div className="text-3xl font-semibold">
              {data && data.length > 0
                ? (
                    data?.reduce((total, review) => total + review.rating, 0) /
                    data?.length
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                : 0}
            </div>
            <div className="flex flex-row justify-center">
              <StarArray
                rating={
                  data && data.length > 0
                    ? data?.reduce(
                        (total, review) => total + review.rating,
                        0
                      ) / data?.length
                    : 0
                }
                size="large"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              <Translate
                i18nKey="resources.reviews.based_on"
                options={{ smart_count: data?.length }}
              />
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {data?.map((review) => (
              <RecordContextProvider value={review} key={review.id}>
                <ProductReview />
              </RecordContextProvider>
            ))}
          </div>
        </div>
      )
    }
  />
);

const ProductReview = () => {
  const review = useRecordContext<Review>();
  if (!review) return null;
  return (
    <Link to={`/reviews/${review.id}`}>
      <div className="flex items-top gap-3 mb-2">
        <ReferenceField<Review, Customer>
          source="customer_id"
          reference="customers"
          render={(customer) => (
            <Avatar className="w-10 h-10">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>
                {customer.first_name?.charAt(0)}
                {customer.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        />
        <span className="text-sm font-semibold">
          <ReferenceField source="customer_id" reference="customers" />
          <StarRatingField size="small" />
        </span>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>
      <div className="text-sm">{review.comment}</div>
    </Link>
  );
};
