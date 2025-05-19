import {
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useGetList } from "ra-core";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const { data: categories = [] } = useGetList("categories", {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: "name", order: "ASC" },
  });
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-normal hover:bg-background"
              )}
            >
              React-Admin Shadcn Demo
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-normal hover:bg-background">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/products">All products</Link>
                </NavigationMenuLink>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/products?filter=${encodeURIComponent(
                        JSON.stringify({
                          category_id: category.id,
                        })
                      )}`}
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/categories"
              className={cn(
                navigationMenuTriggerStyle(),
                "font-normal hover:bg-background"
              )}
            >
              Categories
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
