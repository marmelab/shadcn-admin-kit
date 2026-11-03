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
      starred: "Starred",
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
      draft: "Draft",
      no_recipient: "(no recipient)",
      no_subject: "(no subject)",
      select: "Select %{subject}",
      select_all: "Select all",
      selected: "%{smart_count} selected",
    },
    sidebar: {
      categories: "Categories",
      labels: "Labels",
    },
    display: {
      no_selection: "No message selected",
      reply_to: "Reply-To:",
      cc: "Cc:",
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
      forward: "Forward",
      more: "More",
      mark_as_unread: "Mark as unread",
      mark_as_read: "Mark as read",
      star: "Star thread",
      unstar: "Unstar thread",
      labels: "Labels",
      category: "Category",
      compose: "New message",
      discard: "Discard draft",
      discard_many: "Discard drafts",
      mute: "Mute thread",
      unmute: "Unmute thread",
    },
    confirm: {
      delete_title: "Delete this conversation permanently?",
      delete_content:
        "The conversation and its messages will be deleted. This action cannot be undone.",
      delete_many_title:
        "Delete this conversation permanently? |||| Delete these %{smart_count} conversations permanently?",
      delete_many_content:
        "The conversation and its messages will be deleted. This action cannot be undone. |||| The conversations and their messages will be deleted. This action cannot be undone.",
      discard_many_title:
        "Discard this draft? |||| Discard these %{smart_count} drafts?",
      discard_many_content: "This action cannot be undone.",
    },
    notification: {
      moved: "Conversation moved to %{folder}",
      moved_many:
        "Conversation moved to %{folder} |||| %{smart_count} conversations moved to %{folder}",
      deleted: "Conversation deleted",
      deleted_many:
        "Conversation deleted |||| %{smart_count} conversations deleted",
      sent: "Message sent",
      discarded: "Draft discarded",
      discarded_many: "Draft discarded |||| %{smart_count} drafts discarded",
    },
    reply: {
      placeholder: "Reply %{name}...",
      placeholder_all: "Reply all...",
      to: "To:",
      cc: "Cc:",
      sender_only: "Reply to sender only",
      mute: "Mute this thread",
      send: "Send",
      send_all: "Send to all",
    },
    compose: {
      title: "New message",
      draft: "Draft",
      to: "To",
      cc: "Cc",
      cc_help: "Separate the addresses with commas",
      subject: "Subject",
      placeholder: "Write your message...",
      saving: "Saving...",
      saved: "Draft saved",
    },
    forward: {
      header: "---------- Forwarded message ----------",
      from: "From:",
      date: "Date:",
      subject: "Subject:",
    },
  },
};

export default customEnglishMessages;
