import type { RaRecord } from "ra-core";

export type Folder = "inbox" | "drafts" | "sent" | "junk" | "trash" | "archive";

/** Folder shown when the list has no folder filter */
export const defaultFolder: Folder = "inbox";

export type Category =
  | "primary"
  | "social"
  | "updates"
  | "forums"
  | "shopping"
  | "promotions";

export const labels = [
  "meeting",
  "work",
  "important",
  "personal",
  "budget",
  "conference",
  "travel",
] as const;

export type Label = (typeof labels)[number];

export interface Thread extends RaRecord {
  id: number;
  subject: string;
  folder: Folder;
  category: Category;
  labels: Label[];
  read: boolean;
  starred: boolean;
  muted: boolean;
  /** The correspondent, denormalized for the list and the search */
  name: string;
  email: string;
  /** Excerpt of the last message */
  snippet: string;
  /** Timestamp of the last message */
  updated_at: string;
}

export interface Message extends RaRecord {
  id: number;
  thread_id: number;
  author: "contact" | "me";
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
