import { cn } from "@/lib/utils";
import { RaRecord, useSplatPathBase, useTranslate } from "ra-core";
import * as React from "react";
import { isValidElement, ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Labeled } from "./labeled";

/**
 * Tab element for the TabbedShowLayout.
 *
 * The `<Tab>` component accepts the following props:
 *
 * - label: The string displayed for each tab
 * - icon: The icon to show before the label (optional). Must be a component.
 * - path: The string used for custom urls
 *
 * It is also available as TabbedShowLayout.Tab.
 *
 * @example
 *     // in src/posts.js
 *     import * as React from "react";
 *     import FavoriteIcon from '@mui/icons-material/Favorite';
 *     import PersonPinIcon from '@mui/icons-material/PersonPin';
 *     import { Show, TabbedShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = () => (
 *         <Show>
 *             <TabbedShowLayout>
 *                 <TabbedShowLayout.Tab label="Content" icon={<FavoriteIcon />}>
 *                     <TextField source="title" />
 *                     <TextField source="subtitle" />
 *                </TabbedShowLayout.Tab>
 *                 <TabbedShowLayout.Tab label="Metadata" icon={<PersonIcon />} path="metadata">
 *                     <TextField source="category" />
 *                </TabbedShowLayout.Tab>
 *             </TabbedShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import * as React from "react";
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
export const Tab = (props: TabProps) => {
  const {
    children,
    contentClassName,
    context,
    count,
    className,
    icon,
    label,
    record: _record,
    syncWithLocation = true,
    value,
    ...rest
  } = props;

  const translate = useTranslate();
  const location = useLocation();
  const splatPathBase = useSplatPathBase();
  const newPathName =
    value == null || value === "" ? splatPathBase : `${splatPathBase}/${value}`;

  const renderHeader = () => {
    let tabLabel =
      typeof label === "string" ? translate(label, { _: label }) : label;
    if (count !== undefined) {
      tabLabel = (
        <span>
          {tabLabel}{" "}
          <span className="text-xs text-muted-foreground">({count})</span>
        </span>
      );
    }

    if (!syncWithLocation) {
      return tabLabel;
    }

    return (
      <Link
        key={`tab-header-${value}`}
        to={{ ...location, pathname: newPathName }}
        className={cn(
          "show-tab px-4 py-2 border-b-2 border-transparent text-sm font-medium transition-colors hover:text-primary hover:border-primary",
          className
          // active state can be handled by parent Tabs component
        )}
        {...rest}
      >
        {icon && <span className="mr-2 inline-flex align-middle">{icon}</span>}
        {tabLabel}
      </Link>
    );
  };

  const renderContent = () => (
    <div className={cn("flex flex-col gap-2", contentClassName)}>
      {React.Children.map(children, (field) =>
        field && isValidElement<any>(field) ? (
          <Labeled
            // @ts-expect-error: TypeScript doesn't recognize context prop
            key={field.props.source}
            className={cn(
              "ra-field",
              // @ts-expect-error: TypeScript doesn't recognize context prop
              field.props.source && `ra-field-${field.props.source}`,
              "inline",
              // @ts-expect-error: TypeScript doesn't recognize context prop
              field.props.className
            )}
          >
            {field}
          </Labeled>
        ) : null
      )}
    </div>
  );

  return context === "header" ? renderHeader() : renderContent();
};

export interface TabProps {
  children: ReactNode;
  contentClassName?: string;
  context?: "header" | "content";
  count?: ReactNode;
  className?: string;
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  label: string | ReactElement;
  path?: string;
  record?: RaRecord;
  syncWithLocation?: boolean;
  value?: string | number;
}
