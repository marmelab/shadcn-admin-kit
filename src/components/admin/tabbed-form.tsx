'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import type { FormProps } from "ra-core";
import {
  Form,
  FormGroupContextProvider,
  useFormGroup,
  useTranslate,
  useParams,
  useSplatPathBase,
  useLocation,
  useMatchPath,
  useRouterProvider,
} from "ra-core";
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement, useState } from "react";
import { useNavigate } from "react-router";

import { FormToolbar } from "./simple-form";
import { cn } from "@/lib/utils";

/**
 * Infers the tabbed form root path from the current location.
 * Mirrors useFormRootPath from ra-ui-materialui.
 */
function useFormRootPath() {
  const location = useLocation();
  const matchPath = useMatchPath();
  const createMatch = matchPath(":resource/create/*", location.pathname);
  const editMatch = matchPath(":resource/:id/*", location.pathname);
  if (createMatch) return createMatch.pathnameBase;
  if (editMatch) return editMatch.pathnameBase;
  return "";
}

/**
 * Returns the URL segment for a tab.
 * First tab = '' (no segment), subsequent tabs = their index as a string,
 * unless they declare a custom `path` prop.
 * Mirrors getTabbedFormTabFullPath from ra-ui-materialui.
 */
function getTabPath(tab: ReactElement<FormTabProps>, index: number): string {
  return tab.props.path != null
    ? tab.props.path
    : index > 0
      ? index.toString()
      : "";
}

/**
 * Renders the tab trigger list. Must be inside a Route context when
 * syncWithLocation is true so that useParams() can read params['*'].
 */
function TabbedFormTabsList({
  tabs,
  syncWithLocation,
  tabValue,
  onValueChange,
}: {
  tabs: ReactElement<FormTabProps>[];
  syncWithLocation: boolean;
  tabValue: number;
  onValueChange: (value: string) => void;
}) {
  const params = useParams();
  const currentValue = syncWithLocation
    ? (params["*"] ?? "")
    : tabValue.toString();

  return (
    <Tabs value={currentValue} onValueChange={onValueChange} className="w-full">
      <TabsList className="mb-4 w-full">
        {tabs.map((tab, index) => {
          const tabPath = getTabPath(tab, index);
          return cloneElement(tab as ReactElement<any>, {
            key: tabPath !== "" ? tabPath : "tab-0",
            intent: "header",
            value: syncWithLocation ? tabPath : index,
          });
        })}
      </TabsList>
    </Tabs>
  );
}

/**
 * Renders a tab trigger (TabsTrigger) with validation error state.
 * When the tab's form group has validation errors the trigger turns
 * destructive so users know which tab needs attention.
 */
function FormTabHeader({
  label,
  value,
  icon,
  className,
  count,
}: {
  label: string | ReactElement;
  value: string | number;
  icon?: ReactElement;
  className?: string;
  count?: ReactNode;
}) {
  const translate = useTranslate();
  const formGroup = useFormGroup(value.toString());

  let tabLabel: ReactNode =
    typeof label === "string" ? translate(label, { _: label }) : label;
  if (count !== undefined) {
    tabLabel = (
      <span>
        {tabLabel} ({count})
      </span>
    );
  }

  return (
    <TabsTrigger
      value={value.toString()}
      className={cn(
        "form-tab",
        className,
        !formGroup.isValid &&
          "text-destructive data-[state=active]:text-destructive",
      )}
      id={`tabheader-${value}`}
      aria-controls={`tabpanel-${value}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {tabLabel}
    </TabsTrigger>
  );
}

/**
 * A single tab within a TabbedForm.
 *
 * Renders in two modes depending on the `intent` prop injected by TabbedForm:
 * - `intent="header"` → a TabsTrigger showing the label (with error state)
 * - `intent="content"` → a FormGroupContextProvider + content div, always
 *   mounted but hidden via CSS when not active so validation runs on all tabs
 *
 * @example
 * <TabbedForm.Tab label="Summary">
 *   <TextInput source="title" />
 * </TabbedForm.Tab>
 */
export function FormTab(props: FormTabProps) {
  const {
    children,
    className,
    contentClassName,
    count,
    hidden,
    icon,
    iconPosition: _iconPosition,
    intent,
    label,
    onChange: _onChange,
    path: _path,
    resource: _resource,
    syncWithLocation: _syncWithLocation,
    value,
    ...rest
  } = props;

  if (typeof value === "undefined") {
    throw new Error("the value prop is required at runtime");
  }

  if (intent === "header") {
    return (
      <FormTabHeader
        label={label}
        count={count}
        value={value}
        icon={icon}
        className={className}
      />
    );
  }

  // content intent — always rendered, hidden via CSS when not active
  return (
    <FormGroupContextProvider name={value.toString()}>
      <div
        style={hidden ? { display: "none" } : undefined}
        className={cn("flex flex-col gap-4", contentClassName ?? className)}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tabheader-${value}`}
        // Set undefined instead of false because WAI-ARIA 1.1 notes that
        // aria-hidden="false" behaves inconsistently across browsers.
        aria-hidden={hidden || undefined}
        {...rest}
      >
        {children}
      </div>
    </FormGroupContextProvider>
  );
}

FormTab.displayName = "FormTab";

const defaultToolbar = <FormToolbar />;

/**
 * The view layer of TabbedForm. Renders tab headers, all tab panels
 * (with inactive ones hidden), and the toolbar.
 */
function TabbedFormView({
  children,
  className,
  syncWithLocation = true,
  formRootPathname: _formRootPathname,
  toolbar = defaultToolbar,
}: TabbedFormViewProps) {
  const { Route, Routes } = useRouterProvider();
  const location = useLocation();
  const matchPath = useMatchPath();
  const splatPathBase = useSplatPathBase();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const tabs = (
    Children.toArray(children) as ReactElement<FormTabProps>[]
  ).filter(isValidElement);

  const handleValueChange = (value: string) => {
    if (syncWithLocation) {
      const newPathname =
        value === "" ? splatPathBase : `${splatPathBase}/${value}`;
      navigate({
        pathname: newPathname,
        search: location.search,
        hash: location.hash,
      });
    } else {
      setTabValue(parseInt(value, 10));
    }
  };

  const tabHeadersList = (
    <TabbedFormTabsList
      tabs={tabs}
      syncWithLocation={syncWithLocation}
      tabValue={tabValue}
      onValueChange={handleValueChange}
    />
  );

  return (
    <div className={cn("tabbed-form", className)}>
      {/* Tab header must be inside a Route when syncWithLocation=true so that
          useParams()['*'] resolves to the active tab path segment. */}
      {syncWithLocation ? (
        <Routes>
          <Route path="/*" element={tabHeadersList} />
        </Routes>
      ) : (
        tabHeadersList
      )}

      {/* All tabs are rendered (not only the one in focus) to allow validation
          on tabs not in focus. Hidden tabs use display:none via inline style. */}
      <div>
        {tabs.map((tab, index) => {
          if (!tab) return null;
          const tabPath = getTabPath(tab, index);
          const hidden = syncWithLocation
            ? !matchPath(`${splatPathBase}/${tabPath}`, location.pathname)
            : tabValue !== index;

          return cloneElement(tab as ReactElement<any>, {
            key: tabPath !== "" ? tabPath : "tab-0",
            intent: "content",
            hidden,
            value: syncWithLocation ? tabPath : index,
          });
        })}
      </div>

      {toolbar !== false ? toolbar : null}
    </div>
  );
}

/**
 * A form layout with tabbed navigation using shadcn Tabs.
 *
 * Use `TabbedForm.Tab` as child components to define each tab. The `toolbar`
 * prop renders below the tabs and defaults to a Cancel + Save toolbar.
 *
 * Set `syncWithLocation={false}` to use local state instead of URL routing.
 *
 * @see {@link https://marmelab.com/react-admin/TabbedForm.html TabbedForm documentation}
 *
 * @example
 * import { TabbedForm } from '@/components/admin';
 *
 * const PostEdit = () => (
 *   <Edit>
 *     <TabbedForm>
 *       <TabbedForm.Tab label="Summary">
 *         <TextInput source="title" />
 *       </TabbedForm.Tab>
 *       <TabbedForm.Tab label="Body">
 *         <TextInput source="body" multiline />
 *       </TabbedForm.Tab>
 *     </TabbedForm>
 *   </Edit>
 * );
 */
export function TabbedForm(props: TabbedFormProps) {
  const formRootPathname = useFormRootPath();
  const {
    children,
    toolbar = defaultToolbar,
    syncWithLocation = true,
    className,
    tabs: _tabs,
    ...rest
  } = props;

  return (
    <Form
      formRootPathname={formRootPathname}
      className={cn("flex w-full flex-col gap-4", className)}
      {...rest}
    >
      <TabbedFormView
        formRootPathname={formRootPathname}
        syncWithLocation={syncWithLocation}
        toolbar={toolbar}
      >
        {children}
      </TabbedFormView>
    </Form>
  );
}

TabbedForm.Tab = FormTab;

export interface FormTabProps {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  count?: ReactNode;
  hidden?: boolean;
  icon?: ReactElement;
  iconPosition?: "top" | "bottom" | "start" | "end";
  intent?: "header" | "content";
  label: string | ReactElement;
  onChange?: (event: any, value: any) => void;
  path?: string;
  resource?: string;
  syncWithLocation?: boolean;
  value?: string | number;
  [key: string]: any;
}

interface TabbedFormViewProps {
  children?: ReactNode;
  className?: string;
  syncWithLocation?: boolean;
  formRootPathname?: string;
  toolbar?: ReactNode | false;
}

export interface TabbedFormProps extends Omit<FormProps, "children"> {
  children?: ReactNode;
  toolbar?: ReactNode | false;
  className?: string;
  syncWithLocation?: boolean;
  tabs?: ReactElement;
}
