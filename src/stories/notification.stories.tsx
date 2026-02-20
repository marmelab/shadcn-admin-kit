import {
  NotificationContextProvider,
  UndoableMutationsContextProvider,
  useAddUndoableMutation,
  useNotify,
} from "ra-core";
import { Notification } from "@/components/admin/notification";
import { useState } from "react";

export default {
  title: "Layout/Notification",
};

const MutationButton = ({ onClick }: { onClick?: () => void }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const addMessage = (message: string) =>
    setMessages((messages) => messages.concat(message));
  const [mutationNumber, setMutationNumber] = useState(1);
  const addMutation = useAddUndoableMutation();
  const notify = useNotify();
  const handleClick = () => {
    notify(`mutation ${mutationNumber} triggered`, { undoable: true });
    addMutation(
      onClick ??
        (({ isUndo }) =>
          addMessage(
            isUndo
              ? `mutation ${mutationNumber} undone`
              : `mutation ${mutationNumber} executed`,
          )),
    );
    setMutationNumber((number) => number + 1);
  };
  return (
    <>
      <button onClick={handleClick} className="cursor-pointer mb-2">
        Trigger mutation
      </button>
      <hr />
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  );
};

export const Undoable = () => (
  <NotificationContextProvider>
    <UndoableMutationsContextProvider>
      <MutationButton />
      <Notification />
    </UndoableMutationsContextProvider>
  </NotificationContextProvider>
);

const NotifyWithDurationButton = ({
  autoHideDuration,
}: {
  autoHideDuration: number | null;
}) => {
  const notify = useNotify();
  return (
    <button
      onClick={() =>
        notify(
          autoHideDuration
            ? `This notification will disappear after ${autoHideDuration}ms`
            : "This notification will not disappear automatically",
          {
            autoHideDuration,
          },
        )
      }
      className="cursor-pointer mb-2"
    >
      Trigger notification with{" "}
      {autoHideDuration ? `${autoHideDuration}ms` : "infinite"} duration
    </button>
  );
};

export const AutoHideDuration = () => (
  <NotificationContextProvider>
    <div className="flex flex-col gap-2">
      <NotifyWithDurationButton autoHideDuration={1000} />
      <NotifyWithDurationButton autoHideDuration={5000} />
      <NotifyWithDurationButton autoHideDuration={null} />
    </div>
    <Notification />
  </NotificationContextProvider>
);
