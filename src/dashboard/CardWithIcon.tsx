import { createElement, type ReactNode, type FC } from "react";
import { Card } from "@/components/ui/card";
import { Link, type To } from "react-router";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: FC<any>;
  to: To;
  title?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export const CardWithIcon = ({
  icon,
  title,
  subtitle,
  to,
  children,
}: Props) => (
  <Card className="min-h-[52px] flex flex-col flex-1 [&_a]:no-underline [&_a]:text-inherit -py-6">
    <Link to={to} className={children ? "border-1" : ""}>
      <div className="relative overflow-hidden p-4 flex justify-between items-center before:absolute before:top-[50%] before:left-0 before:block before:content-[''] before:h-[200%] before:aspect-square before:translate-x-[-30%] before:translate-y-[-60%] before:rounded-full before:bg-slate-500 before:opacity-15">
        <div>{createElement(icon, { size: 36 })}</div>
        <div className="text-right">
          <p className="text-muted-foreground">{title}</p>
          <h2 className="text-2xl">{subtitle || " "}</h2>
        </div>
      </div>
    </Link>
    {children}
  </Card>
);

export default CardWithIcon;
