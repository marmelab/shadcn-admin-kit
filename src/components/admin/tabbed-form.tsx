import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement, useState } from "react";
import type { FormProps } from "ra-core";
import {
  Form,
  FormGroupContextProvider,
  useFormGroup,
  useLocation,
  useNavigate,
  useParams,
  useSplatPathBase,
  useTranslate,
} from "ra-core";
import { cn } from "@/lib/utils";
import { FormToolbar } from "@/components/admin/simple-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * A form layout where inputs are divided by tab, with validation and default toolbar.
 *
 * Pass <TabbedForm.Tab> components as children. All tabs are rendered (hidden tabs
 * are hidden with CSS) so that validation covers inputs of every tab. Tabs containing
 * invalid inputs are highlighted. By default, the current tab is synced with the location.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/tabbedform/ TabbedForm documentation}
 *
 * @example
 * import { Edit, TabbedForm, TextInput } from '@/components/admin';
 *
 * const PostEdit = () => (
 *   <Edit>
 *     <TabbedForm>
 *       <TabbedForm.Tab label="summary">
 *         <TextInput source="title" />
 *         <TextInput source="teaser" multiline />
 *       </TabbedForm.Tab>
 *       <TabbedForm.Tab label="body">
 *         <TextInput source="body" multiline />
 *       </TabbedForm.Tab>
 *     </TabbedForm>
 *   </Edit>
 * );
 */
export const TabbedForm = ({
  children,
  className,
  syncWithLocation = true,
  toolbar = defaultFormToolbar,
  ...rest
}: TabbedFormProps) => {
  // Lets warnWhenUnsavedChanges ignore navigation between tabs
  const formRootPathname = useSplatPathBase();
  return (
    <Form
      formRootPathname={formRootPathname}
      className={cn(`flex flex-col gap-4 w-full max-w-lg`, className)}
      {...rest}
    >
      <TabbedFormTabs syncWithLocation={syncWithLocation}>
        {children}
      </TabbedFormTabs>
      {toolbar}
    </Form>
  );
};

/**
 * A tab of a TabbedForm, rendering its children (usually inputs) one per row.
 *
 * @example
 * <TabbedForm.Tab label="details" path="details" count={3}>
 *   <TextInput source="bio" multiline />
 * </TabbedForm.Tab>
 */
const TabbedFormTab = ({ children, contentClassName }: TabbedFormTabProps) => (
  <div className={cn("flex flex-col gap-4", contentClassName)}>{children}</div>
);

TabbedForm.Tab = TabbedFormTab;

// Must be rendered inside the Form to access the form groups
const TabbedFormTabs = ({
  children,
  syncWithLocation,
}: {
  children: ReactNode;
  syncWithLocation: boolean;
}) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const splatPathBase = useSplatPathBase();
  const tabs: { path: string; tab: ReactElement<TabbedFormTabProps> }[] = [];
  // The index counts null children, so that conditional tabs don't change the path of the next ones
  Children.forEach(children, (tab, index) => {
    if (isValidElement<TabbedFormTabProps>(tab)) {
      tabs.push({
        path: tab.props.path ?? (index > 0 ? index.toString() : ""),
        tab,
      });
    }
  });
  const [selectedPath, setSelectedPath] = useState(tabs[0]?.path ?? "");
  // The splat param holds the part of the location after the form root, e.g. "1" in /posts/12/1
  const value = syncWithLocation ? (params["*"] ?? "") : selectedPath;

  const handleValueChange = (path: string) => {
    if (syncWithLocation) {
      navigate({
        ...location,
        pathname: path ? `${splatPathBase}/${path}` : splatPathBase,
      });
    } else {
      setSelectedPath(path);
    }
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange} className="gap-4">
      <TabsList className="justify-start rounded-none border-b bg-transparent p-0">
        {tabs.map(({ path, tab }) => (
          <TabbedFormTabTrigger key={path} value={path} {...tab.props} />
        ))}
      </TabsList>
      {tabs.map(({ path, tab }) => (
        <TabsContent key={path} value={path} keepMounted>
          <FormGroupContextProvider name={path}>{tab}</FormGroupContextProvider>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const TabbedFormTabTrigger = ({
  className,
  count,
  icon,
  label,
  value,
}: TabbedFormTabProps & { value: string }) => {
  const translate = useTranslate();
  const formGroup = useFormGroup(value);
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "cursor-pointer data-active:border-b-background! data-active:border-border bg-transparent! shadow-none! data-active:-mb-0.75 data-active:rounded-b-none data-active:border-b-2",
        !formGroup.isValid && "text-destructive data-active:text-destructive",
        className,
      )}
    >
      {icon}
      {typeof label === "string" ? translate(label, { _: label }) : label}
      {count !== undefined && <> ({count})</>}
    </TabsTrigger>
  );
};

export type TabbedFormProps = {
  children: ReactNode;
  className?: string;
  syncWithLocation?: boolean;
  toolbar?: ReactNode;
} & FormProps;

export interface TabbedFormTabProps {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  count?: ReactNode;
  icon?: ReactElement;
  label: string | ReactElement;
  path?: string;
}

const defaultFormToolbar = <FormToolbar />;
