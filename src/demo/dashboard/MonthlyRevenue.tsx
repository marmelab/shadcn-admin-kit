import { DollarSign } from "lucide-react";
import { useTranslate } from "ra-core";

import { CardWithIcon } from "./CardWithIcon";

interface Props {
  value?: string;
}

const MonthlyRevenue = (props: Props) => {
  const { value } = props;
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/orders"
      icon={DollarSign}
      title={translate("pos.dashboard.monthly_revenue")}
      subtitle={value}
    />
  );
};

export default MonthlyRevenue;
