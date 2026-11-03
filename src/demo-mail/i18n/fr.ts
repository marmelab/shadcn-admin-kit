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
      draft: "Brouillon",
      no_recipient: "(aucun destinataire)",
      no_subject: "(aucun objet)",
    },
    sidebar: {
      categories: "Catégories",
      labels: "Libellés",
    },
    display: {
      no_selection: "Aucun message sélectionné",
      reply_to: "Répondre à :",
      cc: "Cc :",
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
      labels: "Libellés",
      category: "Catégorie",
      compose: "Nouveau message",
      discard: "Supprimer le brouillon",
      mute: "Ignorer la conversation",
      unmute: "Ne plus ignorer la conversation",
    },
    confirm: {
      delete_title: "Supprimer définitivement cette conversation ?",
      delete_content:
        "La conversation et ses messages seront supprimés. Cette action est irréversible.",
    },
    notification: {
      moved: "Conversation déplacée : %{folder}",
      deleted: "Conversation supprimée",
      sent: "Message envoyé",
      discarded: "Brouillon supprimé",
    },
    reply: {
      placeholder: "Répondre à %{name}...",
      placeholder_all: "Répondre à tous...",
      to: "À :",
      cc: "Cc :",
      sender_only: "Répondre à l'expéditeur uniquement",
      mute: "Ignorer cette conversation",
      send: "Envoyer",
      send_all: "Envoyer à tous",
    },
    compose: {
      title: "Nouveau message",
      draft: "Brouillon",
      to: "À",
      subject: "Objet",
      placeholder: "Rédigez votre message...",
      saving: "Enregistrement...",
      saved: "Brouillon enregistré",
    },
  },
};

export default customFrenchMessages;
