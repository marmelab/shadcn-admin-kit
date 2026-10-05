import type { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  resources: {
    threads: { name: "Conversation |||| Conversations" },
    messages: { name: "Message |||| Messages" },
  },
  mail: {
    folders: {
      inbox: "Inbox",
      drafts: "Drafts",
      sent: "Sent",
      junk: "Junk",
      trash: "Trash",
      archive: "Archive",
    },
    categories: {
      primary: "Primary",
      social: "Social",
      updates: "Updates",
      forums: "Forums",
      shopping: "Shopping",
      promotions: "Promotions",
    },
    labels: {
      meeting: "meeting",
      work: "work",
      important: "important",
      personal: "personal",
      budget: "budget",
      conference: "conference",
      travel: "travel",
    },
    tabs: {
      all: "All mail",
      unread: "Unread",
    },
    list: {
      empty: "No conversations",
      unread: "Unread",
      starred: "Starred",
      muted: "Muted",
    },
    display: {
      no_selection: "No message selected",
      reply_to: "Reply-To:",
    },
    action: {
      back: "Back",
      archive: "Archive",
      move_to_junk: "Move to junk",
      not_junk: "Not junk",
      move_to_trash: "Move to trash",
      move_to_inbox: "Move to inbox",
      delete_forever: "Delete permanently",
      reply: "Reply",
      reply_all: "Reply all",
      more: "More",
      mark_as_unread: "Mark as unread",
      star: "Star thread",
      unstar: "Unstar thread",
      add_label: "Add label",
      mute: "Mute thread",
      unmute: "Unmute thread",
    },
    confirm: {
      delete_title: "Delete this conversation permanently?",
      delete_content:
        "The conversation and its messages will be deleted. This action cannot be undone.",
    },
    notification: {
      moved: "Conversation moved to %{folder}",
      deleted: "Conversation deleted",
      sent: "Message sent",
    },
    reply: {
      placeholder: "Reply %{name}...",
      mute: "Mute this thread",
      send: "Send",
    },
  },
};

export default customEnglishMessages;
