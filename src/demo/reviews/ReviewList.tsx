/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback } from "react";
import { useCreatePath, useTranslate } from "ra-core";
import { Link, matchPath, useLocation, useNavigate } from "react-router";
import { X } from "lucide-react";
import {
  BulkActionsToolbar,
  BulkDeleteButton,
  DataTable,
  List,
  ReferenceField,
  TextInput,
  ReferenceInput,
  SingleFieldList,
  AutocompleteInput,
} from "@/components/admin";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { FullNameField } from "../customers/FullNameField";
import { StarRatingField } from "./StarRatingField";
import { ReviewEdit } from "./ReviewEdit";
import { BulkApproveButton } from "./BulkApproveButton";
import { BulkRejectButton } from "./BulkRejectButton";
import { useIsMobile } from "../../hooks/use-mobile";
import type { Review } from "../types";

const filters = [
  <TextInput source="q" placeholder="Search" label={false} />,
  <ReferenceInput
    source="customer_id"
    reference="customers"
    sort={{ field: "last_name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by customer" label={false} />
  </ReferenceInput>,
  <ReferenceInput
    source="product_id"
    reference="products"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by product" label={false} />
  </ReferenceInput>,
  <AutocompleteInput
    source="status"
    placeholder="Filter by status"
    choices={[
      { id: "accepted", name: "Approved" },
      { id: "rejected", name: "Rejected" },
      { id: "pending", name: "Pending" },
    ]}
    optionText={(choice) => (
      <>
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            choice.id === "accepted"
              ? "bg-green-400 dark:bg-green-800"
              : choice.id === "rejected"
              ? "bg-red-400 dark:bg-red-800"
              : "bg-yellow-400 dark:bg-yellow-800"
          )}
        />
        {choice.name}
      </>
    )}
    label={false}
  />,
];

export const ReviewList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const translate = useTranslate();

  const handleClose = useCallback(() => {
    navigate("/reviews");
  }, [navigate]);
  const match = matchPath("/reviews/:id", location.pathname);
  const isMobile = useIsMobile();
  return (
    <>
      <List
        sort={{ field: "date", order: "DESC" }}
        perPage={25}
        filters={isMobile ? undefined : filters}
        pagination={match ? false : undefined}
        bulkActionsToolbar={
          <BulkActionsToolbar>
            <BulkApproveButton />
            <BulkRejectButton />
            <BulkDeleteButton />
          </BulkActionsToolbar>
        }
      >
        {isMobile ? (
          <ReviewListMobile />
        ) : (
          <ReviewListDesktop
            selectedRow={
              match ? parseInt((match as any).params.id, 10) : undefined
            }
          />
        )}
      </List>
      <SidebarProvider
        open={!!match}
        style={{
          // @ts-ignore
          "--sidebar-width": "25rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <Sidebar collapsible="offcanvas" variant="sidebar" side="right">
          {!!match && (
            <>
              <SidebarHeader>
                <h3 className="flex justify-between items-center text-lg font-semibold mb-1 ml-1">
                  {translate("resources.reviews.detail")}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </h3>
              </SidebarHeader>
              <SidebarContent className="px-4 pt-1 pb-4">
                <ReviewEdit
                  id={(match as any).params.id}
                  onCancel={handleClose}
                />
              </SidebarContent>
            </>
          )}
        </Sidebar>
      </SidebarProvider>
    </>
  );
};

const ReviewListMobile = () => {
  const location = useLocation();
  const match = matchPath("/reviews/:id", location.pathname);
  if (!match) {
    return (
      <SingleFieldList
        className="flex-col"
        render={(record) => (
          <Link
            to={`/reviews/${record.id}`}
            state={{ _scrollToTop: true }}
            className="no-underline"
          >
            <Card>
              <CardContent>
                <ReferenceField
                  source="customer_id"
                  reference="customers"
                  link={false}
                >
                  <FullNameField />
                </ReferenceField>
                <div className="my-1 flex gap-2">
                  <StarRatingField /> on{" "}
                  <ReferenceField
                    source="product_id"
                    reference="products"
                    link={false}
                  />
                </div>
                <div className="max-w-[18em] overflow-hidden text-ellipsis whitespace-nowrap">
                  {record.comment}
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      />
    );
  }
  return <ReviewEdit id={(match as any).params.id} />;
};

const ReviewListDesktop = ({ selectedRow }: { selectedRow?: number }) => {
  const navigate = useNavigate();
  const createPath = useCreatePath();
  return (
    <DataTable
      rowClick={(id, resource) => {
        // As we display the edit view in a drawer, we don't the default rowClick behavior that will scroll to the top of the page
        // So we navigate manually without specifying the _scrollToTop state
        navigate(
          createPath({
            resource,
            id,
            type: "edit",
          })
        );
        // Disable the default rowClick behavior
        return false;
      }}
      rowClassName={(record: Review) => {
        let className = "";
        if (selectedRow != undefined && record.id === selectedRow) {
          className = "bg-input";
        }
        switch (record.status) {
          case "accepted":
            className +=
              " border-l-green-400 dark:border-l-green-800 border-l-5";
            break;
          case "pending":
            className +=
              " border-l-yellow-400 dark:border-l-yellow-800 border-l-5";
            break;
          case "rejected":
            className += " border-l-red-400 dark:border-l-red-800 border-l-5";
            break;
          default:
            throw new Error(
              `Unknown status: ${record.status}. Please check your data.`
            );
        }
        return className;
      }}
      className="[&_thead_tr]:border-l-transparent [&_thead_tr]:border-l-5"
    >
      <DataTable.Col
        source="date"
        render={(record) => new Date(record.date).toLocaleDateString()}
      />
      <DataTable.Col source="customer_id">
        <ReferenceField source="customer_id" reference="customers" link={false}>
          <FullNameField />
        </ReferenceField>
      </DataTable.Col>
      <DataTable.Col source="product_id">
        <ReferenceField source="product_id" reference="products" link={false} />
      </DataTable.Col>
      <DataTable.Col
        source="rating"
        render={() => <StarRatingField size="small" />}
      />
      <DataTable.Col
        source="comment"
        cellClassName="max-w-[18em] overflow-hidden text-ellipsis whitespace-nowrap"
      />
      <DataTable.Col<Review>
        source="status"
        render={(record) =>
          ({
            accepted: "Approved",
            rejected: "Rejected",
            pending: "Pending",
          }[record.status])
        }
      />
    </DataTable>
  );
};
