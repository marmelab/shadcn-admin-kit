import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router";

import { WithRecord, useGetList, useTranslate } from "ra-core";
import { ReferenceField } from "@/components/admin/reference-field";

import CardWithIcon from "./CardWithIcon";
//import StarRatingField from "../reviews/StarRatingField";
import { Customer, Review } from "../types";

const PendingReviews = () => {
  const translate = useTranslate();
  const {
    data: reviews,
    total,
    isPending,
  } = useGetList<Review>("reviews", {
    filter: { status: "pending" },
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 100 },
  });

  return (
    <CardWithIcon
      to={{
        pathname: "/reviews",
        search: JSON.stringify({
          filter: { status: "pending" },
        }),
      }}
      icon={MessageCircle}
      title={translate("pos.dashboard.pending_reviews")}
      subtitle={total}
    >
      {!isPending && (
        <div className="px-4 flex flex-col gap-4">
          {reviews?.map((record: Review) => (
            <Link
              key={record.id}
              className="flex-1 flex flex-row"
              to={`/reviews/${record.id}`}
            >
              <ReferenceField
                record={record}
                source="customer_id"
                reference="customers"
                link={false}
                loading={<div className="w-12 mt-2" />}
              >
                <div className="w-12 mt-2">
                  <WithRecord<Customer>
                    render={(customer) => (
                      <Avatar>
                        <AvatarImage
                          src={`${customer.avatar}?size=32x32`}
                          alt={`${customer.first_name} ${customer.last_name}`}
                        />
                      </Avatar>
                    )}
                  />
                </div>
              </ReferenceField>

              <div className="flex-1 overflow-hidden h-10 line-clamp-2 pr-0 text-sm">
                {/*<StarRatingField record={record} />*/}
                {record.comment}
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="flex-grow">&nbsp;</div>
      <Link
        className={buttonVariants({
          variant: "outline",
        })}
        to="/reviews"
      >
        {translate("pos.dashboard.all_reviews")}
      </Link>
    </CardWithIcon>
  );
};

export default PendingReviews;
