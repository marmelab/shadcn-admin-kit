import { TranslationMessages } from "ra-core";
import frenchMessages from "ra-language-french";

const customFrenchMessages: TranslationMessages = {
  ...frenchMessages,
  pos: {
    search: "Rechercher",
    configuration: "Configuration",
    language: "Langue",
    theme: {
      name: "Theme",
      light: "Clair",
      dark: "Obscur",
    },
    dashboard: {
      monthly_revenue: "CA à 30 jours",
      month_history: "Chiffre d'affaire sur 30 jours",
      new_orders: "Nouvelles commandes",
      pending_reviews: "Commentaires à modérer",
      all_reviews: "Voir tous les commentaires",
      new_customers: "Nouveaux clients",
      all_customers: "Voir tous les clients",
      pending_orders: "Commandes à traiter",
      order: {
        items:
          "par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters",
      },
      welcome: {
        title: "Bienvenue sur la démo e-commerce de shadcn-admin-kit",
        subtitle:
          "Ceci est le back-office d'un magasin de posters imaginaire. N'hésitez pas à explorer et à modifier les données. La démo s'exécute en local dans votre navigateur, et se remet à zéro chaque fois que vous rechargez la page.",
        ra_button: "Site web de shadcn-admin-kit",
        demo_button: "Code source de cette démo",
      },
    },
    menu: {
      sales: "Ventes",
      catalog: "Catalogue",
      customers: "Clients",
    },
    events: {
      review: {
        title: 'Commente sur "%{product}"',
      },
      order: {
        title: "Commande 1 poster |||| Commande %{smart_count} posters",
      },
    },
  },
  resources: {
    customers: {
      name: "Client |||| Clients",
      fields: {
        address: "Rue",
        birthday: "Anniversaire",
        city: "Ville",
        stateAbbr: "Etat",
        orders: "Commandes",
        first_name: "Prénom",
        first_seen: "Première visite",
        full_name: "Nom",
        groups: "Segments",
        has_newsletter: "Abonné à la newsletter",
        has_ordered: "A commandé",
        last_name: "Nom",
        last_seen: "Vu le",
        last_seen_gte: "Vu depuis",
        latest_purchase: "Dernier achat",
        name: "Nom",
        total_spent: "Dépenses",
        zipcode: "Code postal",
        password: "Mot de passe",
        confirm_password: "Confirmez le mot de passe",
      },
      filters: {
        last_visited: "Dernière visite",
        today: "Aujourd'hui",
        this_week: "Cette semaine",
        last_week: "La semaine dernière",
        this_month: "Ce mois-ci",
        last_month: "Le mois dernier",
        earlier: "Plus tôt",
        has_ordered: "A déjà commandé",
        has_newsletter: "Abonné newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identité",
        address: "Adresse",
        misc: "Divers",
        stats: "Statistiques",
        history: "Historique",
        password: "Mot de passe",
        change_password: "Changer le mot de passe",
      },
      page: {
        delete: "Supprimer le client",
      },
      errors: {
        password_mismatch:
          "La confirmation du mot de passe est différent du mot de passe.",
      },
      notifications: {
        created: "Client créé |||| %{smart_count} clients créés",
        updated: "Client mis à jour |||| %{smart_count} clients mis à jour",
        deleted: "Client supprimé |||| %{smart_count} clients supprimés",
      },
    },
    orders: {
      name: "Commande |||| Commandes",
      amount: "1 commande |||| %{smart_count} commandes",
      title: "Commande n°%{reference}",
      fields: {
        basket: {
          delivery: "Frais de livraison",
          reference: "Référence",
          quantity: "Quantité",
          sum: "Sous-total",
          tax_rate: "TVA",
          taxes: "TVA",
          total: "Total",
          unit_price: "P.U.",
        },
        address: "Adresse",
        customer_id: "Client",
        date_gte: "Emises depuis",
        date_lte: "Emises avant",
        nb_items: "Nb articles",
        reference: "Référence",
        returned: "Annulée",
        status: "Etat",
        total_gte: "Montant minimum",
      },
      section: {
        order: "Commande",
        customer: "Client",
        shipping_address: "Adresse de livraison",
        items: "Articles",
        total: "Total",
      },
      notifications: {
        created: "Commande créée |||| %{smart_count} commandes créées",
        updated:
          "Commande mise à jour |||| %{smart_count} commandes mises à jour",
        deleted: "Commande supprimée |||| %{smart_count} commandes supprimées",
      },
    },
    invoices: {
      name: "Facture |||| Factures",
      fields: {
        id: "Numéro",
        date: "Date de facture",
        customer_id: "Client",
        order_id: "Commande",
        date_gte: "Emises depuis",
        date_lte: "Emises avant",
        address: "Adresse",
        total_ex_taxes: "Montant HT",
        delivery_fees: "Frais de livraison",
        taxes: "TVA",
      },
      notifications: {
        created: "Facture créée |||| %{smart_count} factures créées",
        updated:
          "Facture mise à jour |||| %{smart_count} factures mises à jour",
        deleted: "Facture supprimée |||| %{smart_count} factures supprimées",
      },
    },
    products: {
      name: "Poster |||| Posters",
      fields: {
        category_id: "Catégorie",
        height_gte: "Hauteur mini",
        height_lte: "Hauteur maxi",
        height: "Hauteur",
        image: "Photo",
        price: "Prix",
        reference: "Référence",
        sales: "Ventes",
        stock_lte: "Stock faible",
        stock: "Stock",
        thumbnail: "Aperçu",
        width_gte: "Largeur mini",
        width_lte: "Margeur maxi",
        width: "Largeur",
      },
      tabs: {
        image: "Image",
        details: "Détails",
        description: "Description",
        reviews: "Commentaires",
      },
      filters: {
        categories: "Catégories",
        stock: "Stock",
        no_stock: "En rupture",
        low_stock: "1 - 9 unités",
        average_stock: "10 - 49 unités",
        enough_stock: "50 unités et plus",
        sales: "Ventes",
        best_sellers: "Meilleures ventes",
        average_sellers: "Moyennes",
        low_sellers: "Peu vendu",
        never_sold: "Jamais vendu",
      },
      notifications: {
        created: "Poster créé |||| %{smart_count} posters créés",
        updated: "Poster mis à jour |||| %{smart_count} posters mis à jour",
        deleted: "Poster supprimé |||| %{smart_count} posters supprimés",
      },
    },
    categories: {
      name: "Catégorie |||| Catégories",
      fields: {
        name: "Nom",
        products: "Produits",
      },
      notifications: {
        created: "Catégorie créée |||| %{smart_count} catégories créées",
        updated:
          "Catégorie mise à jour |||| %{smart_count} catégories mises à jour",
        deleted:
          "Catégorie supprimée |||| %{smart_count} catégories supprimées",
      },
    },
    reviews: {
      name: "Commentaire |||| Commentaires",
      amount: "1 commentaire |||| %{smart_count} commentaires",
      based_on:
        "basé sur 1 commentaire |||| basé sur %{smart_count} commentaires",
      relative_to_poster: "Commentaire sur",
      detail: "Détail du commentaire",
      fields: {
        customer_id: "Client",
        order_id: "Commande",
        product_id: "Produit",
        date_gte: "Publié depuis",
        date_lte: "Publié avant",
        date: "Date",
        comment: "Texte",
        status: "Statut",
        rating: "Classement",
      },
      action: {
        accept: "Accepter",
        reject: "Rejeter",
      },
      notifications: {
        created: "Commentaire créé |||| %{smart_count} commentaires créés",
        updated:
          "Commentaire mis à jour |||| %{smart_count} commentaires mis à jour",
        deleted:
          "Commentaire supprimé |||| %{smart_count} commentaires supprimés",
        approved_success: "Commentaire approuvé",
        approved_error: "Erreur: Commentaire non approuvé",
        rejected_success: "Commentaire rejeté",
        rejected_error: "Erreur: Commentaire non rejeté",
      },
    },
    segments: {
      name: "Segment |||| Segments",
      fields: {
        customers: "Clients",
        name: "Nom",
      },
      data: {
        compulsive: "Compulsif",
        collector: "Collectionneur",
        ordered_once: "A commandé",
        regular: "Régulier",
        returns: "A renvoyé",
        reviewer: "Commentateur",
      },
    },
  },
};

export default customFrenchMessages;
