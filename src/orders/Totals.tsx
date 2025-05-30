import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useRecordContext, useTranslate } from "ra-core";

import { Order } from "../types";

export const Totals = () => {
  const record = useRecordContext<Order>();
  const translate = useTranslate();

  return (
    <>
      <Label className="mt-2">
        {translate("resources.orders.section.total")}
      </Label>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              {translate("resources.orders.fields.basket.sum")}
            </TableCell>
            <TableCell className="text-right">
              {record?.total_ex_taxes.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {translate("resources.orders.fields.basket.delivery")}
            </TableCell>
            <TableCell className="text-right">
              {record?.delivery_fees.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {translate("resources.orders.fields.basket.taxes")} (
              {record?.tax_rate.toLocaleString(undefined, {
                style: "percent",
              })}
              )
            </TableCell>
            <TableCell className="text-right">
              {record?.taxes.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">
              {translate("resources.orders.fields.basket.total")}
            </TableCell>
            <TableCell className="font-bold text-right">
              {record?.total.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
