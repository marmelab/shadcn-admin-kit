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
