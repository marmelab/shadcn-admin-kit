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
      starred: "Suivis",
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
      select: "Sélectionner %{subject}",
      select_all: "Tout sélectionner",
      selected: "%{smart_count} sélectionnée |||| %{smart_count} sélectionnées",
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
      forward: "Transférer",
      more: "Plus d'actions",
      mark_as_unread: "Marquer comme non lu",
      mark_as_read: "Marquer comme lu",
      star: "Suivre la conversation",
      unstar: "Ne plus suivre la conversation",
      labels: "Libellés",
      category: "Catégorie",
      compose: "Nouveau message",
      discard: "Supprimer le brouillon",
      discard_many: "Supprimer les brouillons",
      mute: "Ignorer la conversation",
      unmute: "Ne plus ignorer la conversation",
    },
    confirm: {
      delete_title: "Supprimer définitivement cette conversation ?",
      delete_content:
        "La conversation et ses messages seront supprimés. Cette action est irréversible.",
      delete_many_title:
        "Supprimer définitivement cette conversation ? |||| Supprimer définitivement ces %{smart_count} conversations ?",
      delete_many_content:
        "La conversation et ses messages seront supprimés. Cette action est irréversible. |||| Les conversations et leurs messages seront supprimés. Cette action est irréversible.",
      discard_many_title:
        "Supprimer ce brouillon ? |||| Supprimer ces %{smart_count} brouillons ?",
      discard_many_content: "Cette action est irréversible.",
    },
    notification: {
      moved: "Conversation déplacée : %{folder}",
      moved_many:
        "Conversation déplacée : %{folder} |||| %{smart_count} conversations déplacées : %{folder}",
      deleted: "Conversation supprimée",
      deleted_many:
        "Conversation supprimée |||| %{smart_count} conversations supprimées",
      sent: "Message envoyé",
      discarded: "Brouillon supprimé",
      discarded_many:
        "Brouillon supprimé |||| %{smart_count} brouillons supprimés",
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
      cc: "Cc",
      cc_help: "Séparez les adresses par des virgules",
      subject: "Objet",
      placeholder: "Rédigez votre message...",
      saving: "Enregistrement...",
      saved: "Brouillon enregistré",
    },
    forward: {
      header: "---------- Message transféré ----------",
      from: "De :",
      date: "Date :",
      subject: "Objet :",
    },
  },
};

export default customFrenchMessages;
