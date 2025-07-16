import { FallbackProps } from "react-error-boundary";

import {
  useTranslate,
  useDefaultTitle,
  useResetErrorBoundaryOnLocationChange,
} from "ra-core";
import { CircleAlert, History } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HtmlHTMLAttributes } from "react";
import { ErrorInfo } from "react";

export const Error = (props: InternalErrorProps & {}) => {
  const { error, errorInfo, resetErrorBoundary, ...rest } = props;

  const translate = useTranslate();
  const title = useDefaultTitle();
  useResetErrorBoundaryOnLocationChange(resetErrorBoundary);

  console.log({ errorInfo }, errorInfo?.componentStack);
  return (
    <>
      {title && <span>{title}</span>}
      <div className="flex flex-col items-center p-20 gap-5" {...rest}>
        <h1 className="flex items-center text-3xl mt-5 mb-5" role="alert">
          <CircleAlert className="w-2em h-2em mr-2" />
          {translate("ra.page.error")}
        </h1>
        <div>{translate("ra.message.error")}</div>
        {process.env.NODE_ENV !== "production" && (
          <>
            <Accordion type="multiple" className="mt-1 p-2 bg-secondary w-full">
              <AccordionItem value="error">
                <AccordionTrigger className="py-2">
                  {translate(error.message, {
                    _: error.message,
                  })}
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap pt-1">
                  <p>{errorInfo?.componentStack}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className="text-center ">
              Need help with this error? Try the following:
            </p>
            <div>
              <ul className="list-disc">
                <li>
                  Check the{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://marmelab.com/react-admin/documentation.html"
                  >
                    react-admin documentation
                  </a>
                </li>
                <li>
                  Search on{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://stackoverflow.com/questions/tagged/react-admin"
                  >
                    StackOverflow
                  </a>{" "}
                  for community answers
                </li>
                <li>
                  Get help from the core team via{" "}
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href="https://react-admin-ee.marmelab.com/#fromsww"
                  >
                    react-admin Enterprise Edition
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="mt-8">
          <Button onClick={goBack}>
            <History />
            {translate("ra.action.back")}
          </Button>
        </div>
      </div>
    </>
  );
};

interface InternalErrorProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "title">,
    FallbackProps {
  className?: string;
  errorInfo?: ErrorInfo;
}

export interface ErrorProps extends Pick<FallbackProps, "error"> {
  errorInfo?: ErrorInfo;
}

function goBack() {
  window.history.go(-1);
}
