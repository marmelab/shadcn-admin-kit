import { useMemo } from "react";
import { useGetList } from "ra-core";
import { subDays, startOfDay } from "date-fns";

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

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;

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
      <Welcome />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.flex}>
            <MonthlyRevenue value={revenue} />
            <Spacer />
            <NbNewOrders value={nbNewOrders} />
          </div>
          <div style={styles.singleCol}>
            <OrderChart orders={recentOrders} />
          </div>
          <div style={styles.singleCol}>
            <PendingOrders orders={pendingOrders} />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <PendingReviews />
            <Spacer />
            <NewCustomers />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
