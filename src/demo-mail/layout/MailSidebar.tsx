import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Bookmark,
  File,
  Inbox,
  MessagesSquare,
  Send,
  SquarePen,
  ShoppingCart,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import isEqual from "lodash/isEqual";
import type { ListParams } from "ra-core";
import {
  LinkBase,
  useGetList,
  useLocation,
  useStore,
  useTranslate,
} from "ra-core";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { account } from "../account";
import { getInitials } from "../threads/getInitials";
import { fromListState, isFromList } from "../threads/useThreadActions";
import type { Category, Label } from "../types";
import { defaultFolder, labels } from "../types";

type MailFilter = Record<string, unknown>;

interface NavItem {
  label: string;
  icon: LucideIcon;
  filter: MailFilter;
  /** Filter of the counter badge, no badge when missing */
  countFilter?: Record<string, unknown>;
}

const folderItems: NavItem[] = [
  {
    label: "mail.folders.inbox",
    icon: Inbox,
    filter: { folder: "inbox" },
    countFilter: { folder: "inbox", read: false },
  },
  {
    label: "mail.folders.drafts",
    icon: File,
    filter: { folder: "drafts" },
    countFilter: { folder: "drafts" },
  },
  { label: "mail.folders.sent", icon: Send, filter: { folder: "sent" } },
  {
    label: "mail.folders.junk",
    icon: ArchiveX,
    filter: { folder: "junk" },
    countFilter: { folder: "junk" },
  },
  { label: "mail.folders.trash", icon: Trash2, filter: { folder: "trash" } },
  {
    label: "mail.folders.archive",
    icon: Archive,
    filter: { folder: "archive" },
  },
];

const categoryItem = (category: Category, icon: LucideIcon): NavItem => ({
  label: `mail.categories.${category}`,
  icon,
  filter: { folder: "inbox", category },
  countFilter: { folder: "inbox", category, read: false },
});

const labelFilter = (label: Label) => ({
  labels: label,
  // Like mail clients, a label shows the conversations of every folder but
  // these ones
  folder_neq_any: ["junk", "trash"],
});

const labelItems: NavItem[] = labels.map((label) => ({
  label: `mail.labels.${label}`,
  icon: Bookmark,
  filter: labelFilter(label),
  countFilter: { ...labelFilter(label), read: false },
}));

const categoryItems: NavItem[] = [
  categoryItem("social", Users),
  categoryItem("updates", AlertCircle),
  categoryItem("forums", MessagesSquare),
  categoryItem("shopping", ShoppingCart),
  categoryItem("promotions", Tag),
];

/**
 * Mail navigation: folders and inbox categories with unread counters.
 * Built from the kit sidebar primitives, like AppSidebar.
 */
export const MailSidebar = () => {
  // The thread list stores its params (including filters) under this key
  const [listParams] = useStore<Partial<ListParams>>("threads.listParams");
  // The search and the Unread tab apply to every item
  const { q: _q, read: _read, ...currentFilter } = listParams?.filter ?? {};
  const { openMobile, setOpenMobile } = useSidebar();
  const handleClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };
  const isActive = (item: NavItem) =>
    isEqual(
      Object.keys(currentFilter).length > 0
        ? currentFilter
        : { folder: defaultFolder },
      item.filter,
    );

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-1">
          <Avatar size="sm">
            <AvatarFallback>{getInitials(account.name)}</AvatarFallback>
          </Avatar>
          <div className="grid text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">{account.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {account.email}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pb-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <ComposeMenuItem onClick={handleClick} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <MailMenuGroup
          items={folderItems}
          isActive={isActive}
          onClick={handleClick}
        />
        <SidebarSeparator />
        <MailMenuGroup
          title="mail.sidebar.categories"
          items={categoryItems}
          isActive={isActive}
          onClick={handleClick}
        />
        <SidebarSeparator />
        <MailMenuGroup
          title="mail.sidebar.labels"
          items={labelItems}
          isActive={isActive}
          onClick={handleClick}
        />
      </SidebarContent>
    </Sidebar>
  );
};

/**
 * Opens the new message editor next to the list. Like the list items, it
 * replaces the open thread in the history, so that closing the editor goes
 * back to the list.
 */
const ComposeMenuItem = ({ onClick }: { onClick: () => void }) => {
  const translate = useTranslate();
  const location = useLocation();
  const replace = location.pathname !== "/threads";
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={
          <LinkBase
            to={{ pathname: "/threads/create", search: location.search }}
            state={
              !replace || isFromList(location.state) ? fromListState : undefined
            }
            replace={replace}
            onClick={onClick}
          />
        }
        variant="outline"
        tooltip={translate("mail.action.compose")}
      >
        <SquarePen />
        <span>{translate("mail.action.compose")}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const MailMenuGroup = ({
  title,
  items,
  isActive,
  onClick,
}: {
  title?: string;
  items: NavItem[];
  isActive: (item: NavItem) => boolean;
  onClick: () => void;
}) => {
  const translate = useTranslate();
  return (
    <SidebarGroup>
      {title ? <SidebarGroupLabel>{translate(title)}</SidebarGroupLabel> : null}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <MailMenuItem
              key={item.label}
              item={item}
              isActive={isActive(item)}
              onClick={onClick}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const MailMenuItem = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  const translate = useTranslate();
  const Icon = item.icon;
  const search = new URLSearchParams({
    filter: JSON.stringify(item.filter),
  }).toString();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={
          <LinkBase
            to={{ pathname: "/threads", search: `?${search}` }}
            onClick={onClick}
          />
        }
        isActive={isActive}
        tooltip={translate(item.label)}
      >
        <Icon />
        <span>{translate(item.label)}</span>
      </SidebarMenuButton>
      {item.countFilter ? <CounterBadge filter={item.countFilter} /> : null}
    </SidebarMenuItem>
  );
};

/**
 * Number of threads matching the filter, hidden when there are none. Fetched
 * like the kit Count component, so that refreshCounters() refetches it.
 */
const CounterBadge = ({ filter }: { filter: Record<string, unknown> }) => {
  const { total } = useGetList("threads", {
    filter,
    pagination: { page: 1, perPage: 1 },
  });
  if (!total) return null;
  return <SidebarMenuBadge>{total}</SidebarMenuBadge>;
};
