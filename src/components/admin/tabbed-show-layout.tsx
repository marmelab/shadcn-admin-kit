/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import {
  OptionalRecordContextProvider,
  type RaRecord,
  useRecordContext,
} from "ra-core";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";
import { Outlet, Route, Routes } from "react-router";
import { Tab } from "./tab";
import {
  getShowLayoutTabFullPath,
  TabbedShowLayoutTabs,
} from "./tabbed-show-layout-tabs";

export const TabbedShowLayout = (inProps: TabbedShowLayoutProps) => {
  const {
    children,
    className,
    syncWithLocation = true,
    tabs = DefaultTabs,
    value,
    record: recordProp,
    ...rest
  } = inProps;
  const record = useRecordContext(inProps);
  const nonNullChildren = Children.toArray(children).filter(
    (child) => child !== null
  ) as ReactElement[];
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: any, value: any): void => {
    if (!syncWithLocation) {
      setTabValue(value);
    }
  };

  if (!record) {
    return null;
  }

  const renderTabHeaders = () =>
    cloneElement(
      tabs,
      {
        onChange: handleTabChange,
        syncWithLocation,
        value: tabValue,
      },
      nonNullChildren
    );

  return (
    <OptionalRecordContextProvider value={recordProp}>
      <div className={cn("flex-1", className)} {...sanitizeRestProps(rest)}>
        {syncWithLocation ? (
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  {renderTabHeaders()}
                  <Outlet />
                </>
              }
            >
              {Children.map(nonNullChildren, (tab, index) =>
                isValidElement(tab) ? (
                  <Route
                    path={getShowLayoutTabFullPath(tab, index)}
                    element={cloneElement(tab, {
                      // @ts-expect-error: TypeScript doesn't recognize context prop
                      context: "content",
                    })}
                  />
                ) : null
              )}
            </Route>
          </Routes>
        ) : (
          <>
            {renderTabHeaders()}
            {Children.map(nonNullChildren, (tab, index) => {
              if (!isValidElement(tab) || tabValue !== index) {
                return null;
              }
              return cloneElement(tab, {
                // @ts-expect-error: TypeScript doesn't recognize context prop
                context: "content",
              });
            })}
          </>
        )}
      </div>
    </OptionalRecordContextProvider>
  );
};

TabbedShowLayout.Tab = Tab;

export interface TabbedShowLayoutProps {
  children: ReactNode;
  className?: string;
  record?: RaRecord;
  rootPath?: string;
  syncWithLocation?: boolean;
  tabs?: ReactElement;
  value?: any;
}

const DefaultTabs = <TabbedShowLayoutTabs />;

const sanitizeRestProps = ({
  record,
  resource,
  initialValues,
  staticContext,
  translate,
  tabs,
  ...rest
}: any) => rest;
