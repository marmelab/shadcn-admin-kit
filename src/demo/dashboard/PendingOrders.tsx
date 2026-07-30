import { useTranslate } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";

import { Order } from "../types";
import { PendingOrder } from "./PendingOrder";

interface Props {
  orders?: Order[];
}

const PendingOrders = (props: Props) => {
  const { orders = [] } = props;
  const translate = useTranslate();

  return (
    <Card className="flex-1">
      <CardContent className="flex flex-col gap-4">
        <h2 className="text-xl">{translate("pos.dashboard.pending_orders")}</h2>
        {/* Capped: each Base UI AvatarImage updates its Avatar root from a
            layout effect, and useReference mounts them all in one deferred
            commit, so ~30 in a single card exceeded React's 50 nested
            updates. A dashboard card only needs the most recent few. */}
        {orders.slice(0, 10).map((record) => (
          <PendingOrder key={record.id} order={record} />
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingOrders;
