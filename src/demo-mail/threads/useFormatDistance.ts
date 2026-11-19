import { formatDistanceToNow } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { useLocaleState } from "ra-core";

/** Returns a formatter for "2 hours ago", in the current locale */
export const useFormatDistance = () => {
  const [locale] = useLocaleState();
  return (date: string) =>
    formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: locale === "fr" ? fr : enUS,
    });
};
