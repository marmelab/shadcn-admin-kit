import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { House, Code } from "lucide-react";
import { useTranslate } from "ra-core";

import publishArticleImage from "./welcome_illustration.svg";

const Welcome = () => {
  const translate = useTranslate();
  return (
    <Card className="flex flex-row px-4 mb-4">
      <div className="flex-1">
        <h1 className="text-xl mb-2">
          {translate("pos.dashboard.welcome.title")}
        </h1>
        <div className="max-w-[40em] text-justify md:text-left">
          <p>{translate("pos.dashboard.welcome.subtitle")}</p>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap gap-2 mt-4">
          <a
            className={buttonVariants({
              variant: "outline",
            })}
            href="https://marmelab.com/shadcn-admin-kit/"
          >
            <House className="mr-2 h-4 w-4" />
            {translate("pos.dashboard.welcome.ra_button")}
          </a>
          <a
            className={buttonVariants({
              variant: "outline",
            })}
            href="https://github.com/marmelab/shadcn-admin-kit/tree/main/src/demo"
          >
            <Code className="mr-2 h-4 w-4" />
            {translate("pos.dashboard.welcome.demo_button")}
          </a>
        </div>
      </div>
      <div
        className="hidden md:block w-64 h-36 overflow-hidden ml-auto bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${publishArticleImage})`,
        }}
      />
    </Card>
  );
};

export default Welcome;
