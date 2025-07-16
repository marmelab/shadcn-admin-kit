import { useTimeout, useTranslate } from "ra-core";
import { Spinner } from "./spinner";

export const Loading = (props: LoadingProps) => {
  const {
    loadingPrimary = "ra.page.loading",
    loadingSecondary = "ra.message.loading",
    ...rest
  } = props;
  const oneSecondHasPassed = useTimeout(1000);
  const translate = useTranslate();
  return oneSecondHasPassed ? (
    <div
      className={"flex flex-col justify-center items-center h-full"}
      {...rest}
    >
      <div className={"text-center font-sans color-muted pt-1 pb-1"}>
        <Spinner size="large" className="width-9 height-9" />
        <h5 className="mt-3 text-2xl text-secondary">
          {translate(loadingPrimary, { _: loadingPrimary })}
        </h5>
        <p>{translate(loadingSecondary, { _: loadingSecondary })}</p>
      </div>
    </div>
  ) : null;
};

export interface LoadingProps {
  loadingPrimary?: string;
  loadingSecondary?: string;
}
