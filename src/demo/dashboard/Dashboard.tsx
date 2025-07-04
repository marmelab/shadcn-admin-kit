import { useMemo } from "react";
import { useGetList, Translate } from "ra-core";
import { subDays, startOfDay } from "date-fns";
import { Breadcrumb, BreadcrumbPage } from "@/components/admin";

import Welcome from "./Welcome";
import MonthlyRevenue from "./MonthlyRevenue";
import NbNewOrders from "./NbNewOrders";
import PendingOrders from "./PendingOrders";
import PendingReviews from "./PendingReviews";
import NewCustomers from "./NewCustomers";
import OrderChart from "./OrderChart";

import { Order } from "../types";

interface OrderStats {
  revenue: number;
  nbNewOrders: number;
  pendingOrders: Order[];
}

interface State {
  nbNewOrders?: number;
  pendingOrders?: Order[];
  recentOrders?: Order[];
  revenue?: string;
}

export const Dashboard = () => {
  const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

  const { data: orders } = useGetList<Order>("orders", {
    filter: { date_gte: aMonthAgo.toISOString() },
    sort: { field: "date", order: "DESC" },
    pagination: { page: 1, perPage: 50 },
  });

  const aggregation = useMemo<State>(() => {
    if (!orders) return {};
    const aggregations = orders
      .filter((order) => order.status !== "cancelled")
      .reduce(
        (stats: OrderStats, order) => {
          if (order.status !== "cancelled") {
            stats.revenue += order.total;
            stats.nbNewOrders++;
          }
          if (order.status === "ordered") {
            stats.pendingOrders.push(order);
          }
          return stats;
        },
        {
          revenue: 0,
          nbNewOrders: 0,
          pendingOrders: [],
        }
      );
    return {
      recentOrders: orders,
      revenue: aggregations.revenue.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
      nbNewOrders: aggregations.nbNewOrders,
      pendingOrders: aggregations.pendingOrders,
    };
  }, [orders]);

  const { nbNewOrders, pendingOrders, revenue, recentOrders } = aggregation;
  return (
    <>
      <Breadcrumb>
        <BreadcrumbPage>
          <Translate i18nKey="ra.page.dashboard">Home</Translate>
        </BreadcrumbPage>
      </Breadcrumb>
      <Welcome />
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex flex-col gap-4 md:basis-1/2">
          <div className="flex flex-col md:flex-row gap-4">
            <MonthlyRevenue value={revenue} />
            <NbNewOrders value={nbNewOrders} />
          </div>
          <div>
            <OrderChart orders={recentOrders} />
          </div>
          <div>
            <PendingOrders orders={pendingOrders} />
          </div>
        </div>
        <div className="md:basis-1/2">
          <div className="flex flex-col md:flex-row gap-4">
            <PendingReviews />
            <NewCustomers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
