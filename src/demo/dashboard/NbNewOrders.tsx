import { ShoppingCart } from "lucide-react";
import { useTranslate } from "ra-core";

import CardWithIcon from "./CardWithIcon";

interface Props {
  value?: number;
}

const NbNewOrders = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/orders"
      icon={ShoppingCart}
      title={translate("pos.dashboard.new_orders")}
      subtitle={value}
    />
  );
};

export default NbNewOrders;
