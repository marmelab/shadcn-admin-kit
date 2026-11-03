import type { RaRecord } from "ra-core";

export type Folder = "inbox" | "drafts" | "sent" | "junk" | "trash" | "archive";

/** Folder shown when the list has no folder filter */
export const defaultFolder: Folder = "inbox";

export const categories = [
  "primary",
  "social",
  "updates",
  "forums",
  "shopping",
  "promotions",
] as const;

export type Category = (typeof categories)[number];

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

export interface Contact {
  name: string;
  email: string;
}

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
  /** The other recipients, used by Reply all */
  cc: Contact[];
  /** Body of a thread in the drafts folder, which has no message yet */
  draft?: string | null;
  /** Excerpt of the last message, or of the draft */
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
  to: Contact[];
  cc: Contact[];
  message: string;
  timestamp: string;
}
