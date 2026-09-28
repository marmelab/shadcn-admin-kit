import type { TranslationMessages } from "ra-core";
import frenchMessages from "ra-language-french";

const customFrenchMessages: TranslationMessages = {
  ...frenchMessages,
  resources: {
    threads: { name: "Conversation |||| Conversations" },
    messages: { name: "Message |||| Messages" },
  },
  mail: {
    folders: {
      inbox: "Boîte de réception",
      drafts: "Brouillons",
      sent: "Envoyés",
      junk: "Indésirables",
      trash: "Corbeille",
      archive: "Archives",
    },
    categories: {
      primary: "Principale",
      social: "Réseaux sociaux",
      updates: "Notifications",
      forums: "Forums",
      shopping: "Achats",
      promotions: "Promotions",
    },
    labels: {
      meeting: "réunion",
      work: "travail",
      important: "important",
      personal: "perso",
      budget: "budget",
      conference: "conférence",
      travel: "voyage",
    },
    tabs: {
      all: "Tous",
      unread: "Non lus",
    },
    list: {
      empty: "Aucune conversation",
      unread: "Non lu",
      starred: "Suivi",
      muted: "Ignoré",
    },
    display: {
      no_selection: "Aucun message sélectionné",
      reply_to: "Répondre à :",
    },
    action: {
      back: "Retour",
      archive: "Archiver",
      move_to_junk: "Déplacer vers les indésirables",
      not_junk: "Pas un courrier indésirable",
      move_to_trash: "Placer dans la corbeille",
      move_to_inbox: "Déplacer vers la boîte de réception",
      delete_forever: "Supprimer définitivement",
      reply: "Répondre",
      reply_all: "Répondre à tous",
      more: "Plus d'actions",
      mark_as_unread: "Marquer comme non lu",
      star: "Suivre la conversation",
      unstar: "Ne plus suivre la conversation",
      add_label: "Ajouter un libellé",
      mute: "Ignorer la conversation",
      unmute: "Ne plus ignorer la conversation",
    },
    notification: {
      moved: "Conversation déplacée : %{folder}",
      deleted: "Conversation supprimée",
      sent: "Message envoyé",
    },
    reply: {
      placeholder: "Répondre à %{name}...",
      mute: "Ignorer cette conversation",
      send: "Envoyer",
    },
  },
};

export default customFrenchMessages;
