import type { ErrorInfo } from "react";
import { Suspense, useState } from "react";
import type { CoreLayoutProps } from "ra-core";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "@/components/admin/error";
import { Loading } from "@/components/admin/loading";
import { LocalesMenuButton } from "@/components/admin/locales-menu-button";
import { Notification } from "@/components/admin/notification";
import { ThemeModeToggle } from "@/components/admin/theme-mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MailSidebar } from "./MailSidebar";

/**
 * Same shell as the kit Layout, with the mail sidebar and a full-height
 * content area so that the thread list and the thread display scroll
 * independently.
 */
export const MailLayout = ({ children }: CoreLayoutProps) => {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | undefined>(undefined);
  const handleError = (_: unknown, info: ErrorInfo) => {
    setErrorInfo(info);
  };
  return (
    <SidebarProvider>
      <MailSidebar />
      <main
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:h-12">
          <SidebarTrigger className="scale-125 sm:scale-100" />
          <div className="flex-1" />
          <LocalesMenuButton />
          <ThemeModeToggle />
        </header>
        <ErrorBoundary
          onError={handleError}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Error
              error={error}
              errorInfo={errorInfo}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<Loading />}>
            <div className="flex min-h-0 flex-1">{children}</div>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Notification />
    </SidebarProvider>
  );
};
