import type { ReactNode } from "react";
import {
  useRecordContext,
  Translate,
  useTranslate,
  FilterLiveForm,
} from "ra-core";
import {
  DataTable,
  List,
  ToggleFilterButton,
  TextInput,
} from "@/components/admin";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Mail } from "lucide-react";
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
} from "date-fns";
import segments from "../segments/data";

import { FullNameField } from "./FullNameField";
import { useIsMobile } from "@/hooks/use-mobile";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
const smallDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

export const CustomerList = () => {
  const isMobile = useIsMobile();

  return (
    <List perPage={25} sort={{ field: "last_seen", order: "DESC" }}>
      <div className="flex flex-row gap-4 mb-4">
        <SidebarFilters />
        <DataTable className="flex-1">
          <DataTable.Col
            label="resources.customers.fields.name"
            source="last_name"
          >
            <FullNameField />
          </DataTable.Col>
          <DataTable.Col
            source="nb_orders"
            label="resources.customers.fields.orders"
            className="hidden md:table-cell text-right"
            render={(record) => (record.nb_orders > 0 ? record.nb_orders : "")}
          />
          <DataTable.NumberCol
            source="total_spent"
            options={{ style: "currency", currency: "USD" }}
            conditionalClassName={(record) =>
              record.total_spent > 500 && "dark:text-green-500 text-lime-700"
            }
            className="hidden md:table-cell"
          />
          <DataTable.Col
            source="last_seen"
            render={(record) =>
              isMobile
                ? smallDateTimeFormatter.format(new Date(record.last_seen))
                : dateTimeFormatter.format(new Date(record.last_seen))
            }
          />
          <DataTable.Col
            label="resources.customers.fields.groups"
            className="hidden md:table-cell"
          >
            <SegmentList />
          </DataTable.Col>
        </DataTable>
      </div>
    </List>
  );
};

const SegmentList = () => {
  const record = useRecordContext();
  if (!record || !record.groups) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {record.groups.map((segment: string) => (
        <Badge variant="outline" key={segment}>
          <Translate
            i18nKey={segments.find((s) => s.id === segment)?.name || segment}
          />
        </Badge>
      ))}
    </div>
  );
};

const SidebarFilters = () => {
  const translate = useTranslate();
  return (
    <div className="min-w-48 hidden md:block">
      <FilterLiveForm>
        <TextInput
          source="q"
          placeholder={translate("ra.action.search")}
          label={false}
          className="mb-6"
        />
      </FilterLiveForm>
      <FilterCategory
        icon={<Clock size={16} />}
        label="resources.customers.filters.last_visited"
      >
        <ToggleFilterButton
          label="resources.customers.filters.today"
          value={{
            last_seen_gte: endOfYesterday().toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.customers.filters.this_week"
          value={{
            last_seen_gte: startOfWeek(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.customers.filters.last_week"
          value={{
            last_seen_gte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
            last_seen_lte: startOfWeek(new Date()).toISOString(),
          }}
        />
        <ToggleFilterButton
          label="resources.customers.filters.this_month"
          value={{
            last_seen_gte: startOfMonth(new Date()).toISOString(),
            last_seen_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="resources.customers.filters.last_month"
          value={{
            last_seen_gte: subMonths(startOfMonth(new Date()), 1).toISOString(),
            last_seen_lte: startOfMonth(new Date()).toISOString(),
          }}
        />
        <ToggleFilterButton
          label="resources.customers.filters.earlier"
          value={{
            last_seen_gte: undefined,
            last_seen_lte: subMonths(startOfMonth(new Date()), 1).toISOString(),
          }}
        />
      </FilterCategory>
      <FilterCategory
        icon={<DollarSign size={16} />}
        label="resources.customers.filters.has_ordered"
      >
        <ToggleFilterButton
          label="ra.boolean.true"
          value={{
            nb_orders_gte: 1,
            nb_orders_lte: undefined,
          }}
        />
        <ToggleFilterButton
          label="ra.boolean.false"
          value={{
            nb_orders_gte: undefined,
            nb_orders_lte: 0,
          }}
        />
      </FilterCategory>
      <FilterCategory
        icon={<Mail size={16} />}
        label="resources.customers.filters.has_newsletter"
      >
        <ToggleFilterButton
          label="ra.boolean.true"
          value={{ has_newsletter: true }}
        />
        <ToggleFilterButton
          label="ra.boolean.false"
          value={{ has_newsletter: false }}
        />
      </FilterCategory>
      <FilterCategory
        icon={<Mail size={16} />}
        label="resources.customers.filters.group"
      >
        {segments.map((segment) => (
          <ToggleFilterButton
            key={segment.id}
            label={segment.name}
            value={{ groups: segment.id }}
          />
        ))}
      </FilterCategory>
    </div>
  );
};

const FilterCategory = ({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children?: ReactNode;
}) => (
  <>
    <h3 className="flex flex-row items-center gap-2 mb-1 font-bold text-sm">
      {icon}
      <Translate i18nKey={label} />
    </h3>
    <div className="flex flex-col items-start ml-3 mb-4">{children}</div>
  </>
);
