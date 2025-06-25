import { List } from "@/components/admin";
import { WithListContext } from "ra-core";
import type { Category } from "@/types";
import { humanize } from "inflection";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const CategoryList = () => (
  <List pagination={false} perPage={50} actions={false}>
    <WithListContext<Category>
      render={({ data }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {data?.map((category) => (
            <Link
              key={category.id}
              className="relative"
              to={`/categories/${category.id}`}
            >
              <img
                src={`https://marmelab.com/posters/${category.name}-1.jpeg`}
                alt={category.name}
                className="w-full h-32 object-cover rounded"
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/50 hover:bg-black/30 text-white rounded flex items-center justify-center">
                <h3 className="text-2xl font-bold">
                  {humanize(category.name)}
                </h3>
              </div>
            </Link>
          ))}
          <Link
            className="w-full h-full bg-black/50 hover:bg-black/30 text-white rounded flex items-center justify-center text-2xl font-bold"
            to={`/categories/create`}
          >
            <Plus size={32} />
          </Link>
        </div>
      )}
    />
  </List>
);
