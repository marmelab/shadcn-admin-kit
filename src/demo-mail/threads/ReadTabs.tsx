import { useListContext, useTranslate } from "ra-core";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/** All mail / Unread tabs, bound to the `read` filter */
export const ReadTabs = () => {
  const { filterValues, displayedFilters, setFilters } = useListContext();
  const translate = useTranslate();
  const value = filterValues.read === false ? "unread" : "all";

  const handleChange = (unreadOnly: boolean) => {
    const otherFilters = Object.fromEntries(
      Object.entries(filterValues).filter(([key]) => key !== "read"),
    );
    setFilters(
      unreadOnly ? { ...otherFilters, read: false } : otherFilters,
      displayedFilters,
    );
  };

  return (
    <Tabs
      value={value}
      onValueChange={(newValue) => handleChange(newValue === "unread")}
    >
      <TabsList>
        <TabsTrigger value="all">{translate("mail.tabs.all")}</TabsTrigger>
        <TabsTrigger value="unread">
          {translate("mail.tabs.unread")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
