import { useEffect } from "react";

export type TitleProps = {
  title: string;
};

export function Title({ title }: TitleProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
