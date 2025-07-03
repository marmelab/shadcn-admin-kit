import { Link } from "react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTranslate, useReference } from "ra-core";

import { Customer, Order } from "../types";

interface Props {
  order: Order;
}

export const PendingOrder = (props: Props) => {
  const { order } = props;
  const translate = useTranslate();
  const { referenceRecord: customer, isPending } = useReference<Customer>({
    reference: "customers",
    id: order.customer_id,
  });

  return (
    <Link to={`/orders/${order.id}`} className="flex-1 flex flex-row">
      <div className="w-12 mt-2">
        {isPending ? (
          <Avatar />
        ) : (
          <Avatar>
            <AvatarImage
              src={`${customer?.avatar}?size=32x32`}
              alt={`${customer?.first_name} ${customer?.last_name}`}
            />
          </Avatar>
        )}
      </div>
      <div className="flex-1 flex flex-col flex-1 items-start justify-center text-sm">
        <div>{new Date(order.date).toLocaleString("en-GB")}</div>
        <div className="text-muted-foreground">
          {translate("pos.dashboard.order.items", {
            smart_count: order.basket.length,
            nb_items: order.basket.length,
            customer_name: customer
              ? `${customer.first_name} ${customer.last_name}`
              : "",
          })}
        </div>
      </div>

      <div className="mr-1 color-muted-foreground">{order.total}$</div>
    </Link>
  );
};
