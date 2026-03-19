import React from "react";
import type { RaRecord } from "ra-core";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { Heart, HeartOff } from "lucide-react";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { BooleanField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/BooleanField",
};

const defaultRecord = {
  id: 1,
  isPublished: true,
};

const Wrapper = ({
  children,
  record = defaultRecord,
}: React.PropsWithChildren<{ record?: RaRecord }>) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const True = () => (
  <Wrapper>
    <BooleanField source="isPublished" />
  </Wrapper>
);

export const False = () => (
  <Wrapper record={{ id: 1, isPublished: false }}>
    <BooleanField source="isPublished" />
  </Wrapper>
);

export const Empty = () => (
  <Wrapper record={{ id: 1 }}>
    <BooleanField
      source="isPublished"
      empty={<span aria-label="no value">—</span>}
    />
  </Wrapper>
);

export const ValueLabels = () => (
  <Wrapper>
    <BooleanField
      source="isPublished"
      valueLabelTrue="Published"
      valueLabelFalse="Draft"
    />
  </Wrapper>
);

export const CustomIcons = () => (
  <Wrapper>
    <BooleanField
      source="isPublished"
      TrueIcon={Heart}
      FalseIcon={HeartOff}
      valueLabelTrue="Liked"
      valueLabelFalse="Not liked"
    />
  </Wrapper>
);

export const LooseValue = () => (
  <Wrapper record={{ id: 1, isPublished: 1 }}>
    <BooleanField source="isPublished" looseValue />
  </Wrapper>
);

export const NoFalseIcon = () => (
  <Wrapper record={{ id: 1, isPublished: false }}>
    <BooleanField source="isPublished" FalseIcon={null} />
  </Wrapper>
);
