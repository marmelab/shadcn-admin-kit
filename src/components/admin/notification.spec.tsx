import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import {
  NotificationContextProvider,
  UndoableMutationsContextProvider,
  useNotify,
} from "ra-core";
import { toast } from "sonner";

import { Notification } from "@/components/admin/notification";
import { Undoable } from "@/stories/notification.stories";

const CustomDurationNotifyButton = ({
  autoHideDuration,
}: {
  autoHideDuration: number | null;
}) => {
  const notify = useNotify();

  return (
    <button
      onClick={() =>
        notify("Custom duration message", {
          autoHideDuration,
        })
      }
    >
      Trigger notification
    </button>
  );
};

const renderNotificationWithAutoHideDuration = (autoHideDuration: number | null) =>
  render(
    <NotificationContextProvider>
      <UndoableMutationsContextProvider>
        <CustomDurationNotifyButton autoHideDuration={autoHideDuration} />
        <Notification />
      </UndoableMutationsContextProvider>
    </NotificationContextProvider>,
  );

describe("Notification", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    toast.dismiss();
  });

  it("should undo several notifications correctly", async () => {
    const screen = render(<Undoable />);
    const button = screen.getByText("Trigger mutation");
    await button.click();
    expect(screen.getByText("mutation 1 triggered"));
    await button.click();
    expect(screen.getByText("mutation 2 triggered"));
    const undoButtons = screen.getByText("ra.action.undo");
    await undoButtons.first().click();
    expect(screen.getByText("mutation 1 undone"));
    await undoButtons.last().click();
    expect(screen.getByText("mutation 2 undone"));
  });

  it("should pass autoHideDuration to sonner duration", async () => {
    const infoSpy = vi.spyOn(toast, "info");
    const screen = renderNotificationWithAutoHideDuration(10_000);

    await screen.getByText("Trigger notification").click();

    expect(infoSpy).toHaveBeenCalled();
    expect(infoSpy.mock.calls.at(-1)?.[1]?.duration).toBe(10_000);
  });

  it("should map null autoHideDuration to a persistent toast", async () => {
    const infoSpy = vi.spyOn(toast, "info");
    const screen = renderNotificationWithAutoHideDuration(null);

    await screen.getByText("Trigger notification").click();

    expect(infoSpy).toHaveBeenCalled();
    expect(infoSpy.mock.calls.at(-1)?.[1]?.duration).toBe(Infinity);
  });
});
