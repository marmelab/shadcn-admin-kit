import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import type { ListParams } from "ra-core";
import { LinkBase, useStore, useTranslate } from "ra-core";
import { Count } from "@/components/admin/count";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
import type { Category, Folder } from "../types";

interface MailFilter {
  folder: Folder;
  category?: Category;
}

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
  const currentFilter: Partial<MailFilter> = listParams?.filter ?? {};
  const { openMobile, setOpenMobile } = useSidebar();
  const handleClick = () => {
    if (openMobile) {
      setOpenMobile(false);
    }
  };
  const isActive = (item: NavItem) =>
    (currentFilter.folder ?? "inbox") === item.filter.folder &&
    currentFilter.category === item.filter.category;

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
        <MailMenuGroup
          items={folderItems}
          isActive={isActive}
          onClick={handleClick}
        />
        <SidebarSeparator />
        <MailMenuGroup
          items={categoryItems}
          isActive={isActive}
          onClick={handleClick}
        />
      </SidebarContent>
    </Sidebar>
  );
};

const MailMenuGroup = ({
  items,
  isActive,
  onClick,
}: {
  items: NavItem[];
  isActive: (item: NavItem) => boolean;
  onClick: () => void;
}) => (
  <SidebarGroup>
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
      >
        <Icon />
        <span>{translate(item.label)}</span>
      </SidebarMenuButton>
      {item.countFilter ? (
        <SidebarMenuBadge>
          <Count resource="threads" filter={item.countFilter} />
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
};
