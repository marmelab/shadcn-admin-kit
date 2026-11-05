import { account } from "../account";
import type { Message, Thread } from "../types";
import { categoryThreads } from "./categories";
import { folderThreads } from "./folders";
import { inboxThreads } from "./inbox";
import type { SeedThread } from "./seed";

const HOUR = 60 * 60 * 1000;

const seeds: SeedThread[] = [
  ...inboxThreads,
  ...categoryThreads,
  ...folderThreads,
];

/** One-line excerpt of a message, as displayed in the thread list */
export const toSnippet = (message: string) =>
  message.replace(/\s+/g, " ").trim().slice(0, 200);

/**
 * Turns the seeds into FakeRest collections. Dates are relative to `now`, so
 * the inbox always looks recent. A draft keeps its body on the thread: it has
 * no message until it is sent.
 */
export const generateData = (now = Date.now()) => {
  const threads: Thread[] = [];
  const messages: Message[] = [];
  let nextMessageId = 1;

  seeds.forEach((seed, index) => {
    const threadId = index + 1;
    const cc = seed.cc ?? [];
    const seedMessages = [...seed.messages].sort(
      (a, b) => b.hoursAgo - a.hoursAgo,
    );
    const lastMessage = seedMessages[seedMessages.length - 1];
    const isDraft = seed.folder === "drafts";

    if (!isDraft) {
      seedMessages.forEach((seedMessage) => {
        const fromMe = seedMessage.author === "me";
        messages.push({
          id: nextMessageId++,
          thread_id: threadId,
          author: seedMessage.author,
          ...(fromMe ? account : seed.contact),
          to: [fromMe ? seed.contact : account],
          cc,
          message: seedMessage.message,
          timestamp: new Date(now - seedMessage.hoursAgo * HOUR).toISOString(),
        });
      });
    }

    threads.push({
      id: threadId,
      subject: seed.subject,
      folder: seed.folder,
      category: seed.category ?? "primary",
      labels: seed.labels ?? [],
      read: seed.read ?? true,
      starred: seed.starred ?? false,
      muted: seed.muted ?? false,
      name: seed.contact.name,
      email: seed.contact.email,
      cc,
      draft: isDraft ? lastMessage.message : null,
      snippet: toSnippet(lastMessage.message),
      updated_at: new Date(now - lastMessage.hoursAgo * HOUR).toISOString(),
    });
  });

  return { threads, messages };
};
