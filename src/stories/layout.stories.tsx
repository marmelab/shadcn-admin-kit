import { lazy } from "react";
import { Layout } from "@/components/admin";
import { CoreAdminContext } from "ra-core";

export default {
  title: "layout/Layout",
};

export const Basic = () => (
  <CoreAdminContext>
    <Layout>Content</Layout>
  </CoreAdminContext>
);

const BrokenComponent = () => {
  throw new Error("I am broken");
};

export const ErrorState = () => (
  <CoreAdminContext>
    <Layout>
      <BrokenComponent />
    </Layout>
  </CoreAdminContext>
);

const LazyComponent = lazy(() => new Promise(() => {}));

export const LoadingState = () => (
  <CoreAdminContext>
    <Layout>
      <LazyComponent />
    </Layout>
  </CoreAdminContext>
);
