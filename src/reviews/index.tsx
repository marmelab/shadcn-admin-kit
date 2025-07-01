import { MessageSquareText } from "lucide-react";
import { ShowGuesser, EditGuesser } from "@/components/admin";
import { ReviewList } from "./ReviewList";

export const reviews = {
  name: "reviews",
  list: ReviewList,
  edit: EditGuesser,
  show: ShowGuesser,
  icon: MessageSquareText,
};
