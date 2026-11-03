import type { Contact } from "../types";

export const formatContacts = (contacts: Contact[]) =>
  contacts.map((contact) => contact.name).join(", ");
