import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router";
import { ListBase, WithListContext, useTranslate } from "ra-core";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import { Customer } from "../types";

const NewCustomers = () => {
  const translate = useTranslate();

  const aMonthAgo = subDays(new Date(), 30);
  aMonthAgo.setDate(aMonthAgo.getDate() - 30);
  aMonthAgo.setHours(0);
  aMonthAgo.setMinutes(0);
  aMonthAgo.setSeconds(0);
  aMonthAgo.setMilliseconds(0);

  return (
    <ListBase<Customer>
      resource="customers"
      filter={{
        has_ordered: true,
        first_seen_gte: aMonthAgo.toISOString(),
      }}
      sort={{ field: "first_seen", order: "DESC" }}
      perPage={100}
      disableSyncWithLocation
      render={({ data }) => (
        <CardWithIcon
          to="/customers"
          icon={UserPlus}
          title={translate("pos.dashboard.new_customers")}
          subtitle={<WithListContext render={({ total }) => <>{total}</>} />}
        >
          <div className="px-4 flex flex-col gap-4">
            {data?.map((record) => (
              <Link
                key={record.id}
                className="flex-1 flex flex-row"
                to={`/customers/${record.id}/show`}
              >
                <div className="w-12 mt-2">
                  <Avatar>
                    <AvatarImage
                      src={`${record.avatar}?size=32x32`}
                      alt={`${record.first_name} ${record.last_name}`}
                    />
                  </Avatar>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center text-sm">
                  <div>{`${record.first_name} ${record.last_name}`}</div>
                  <div className="text-muted-foreground">
                    {new Date(record.first_seen).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex-grow">&nbsp;</div>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/customers"
          >
            {translate("pos.dashboard.all_customers")}
          </Link>
        </CardWithIcon>
      )}
    />
  );
};

export default NewCustomers;
