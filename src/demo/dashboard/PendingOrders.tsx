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
        {/* Capped to work around a ra-core limitation: useGetManyAggregate
            (behind useReference) resolves its pending calls one by one, so past
            ~30 rows the React updates nest and exceed the 50 allowed. See
            PendingReviews for the measured threshold. */}
        {orders.slice(0, 10).map((record) => (
          <PendingOrder key={record.id} order={record} />
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingOrders;
