import set from "lodash/set";
import { Identifier, OptionText, useTranslate } from "ra-core";
import {
  ChangeEvent,
  createContext,
  isValidElement,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";

export const useSupportCreateSuggestion = (
  options: SupportCreateSuggestionOptions
): UseSupportCreateValue => {
  const {
    create,
    createLabel = "ra.action.create",
    createItemLabel,
    createValue = "@@ra-create",
    createHintValue = "@@ra-create-hint",
    optionText = "name",
    filter,
    handleChange,
    onCreate,
  } = options;

  const translate = useTranslate();
  const [renderOnCreate, setRenderOnCreate] = useState(false);
  const filterRef = useRef(filter);

  return {
    createId: createValue,
    createHintId: createHintValue,
    getCreateItem: (filter?: string) => {
      filterRef.current = filter;

      return set(
        {
          id: createItemLabel && !filter ? createHintValue : createValue,
        },
        typeof optionText === "string" ? optionText : "name",
        filter && createItemLabel
          ? translate(createItemLabel, {
              item: filter,
              _: createItemLabel,
            })
          : translate(createLabel, { _: createLabel })
      );
    },
    handleChange: async (eventOrValue: MouseEvent | any) => {
      const value = eventOrValue?.target?.value || eventOrValue;
      const finalValue = Array.isArray(value) ? [...value].pop() : value;

      if (finalValue?.id === createValue || finalValue === createValue) {
        if (!isValidElement(create)) {
          if (!onCreate) {
            // this should never happen because the createValue is only added if a create function is provided
            // @see AutocompleteInput:filterOptions
            throw new Error(
              "To create a new option, you must pass an onCreate function or a create element."
            );
          }
          const newSuggestion = await onCreate(filter);
          if (newSuggestion) {
            handleChange(newSuggestion);
            return;
          }
        } else {
          setRenderOnCreate(true);
          return;
        }
      }
      handleChange(eventOrValue);
    },
    createElement:
      renderOnCreate && isValidElement(create) ? (
        <CreateSuggestionContext.Provider
          value={{
            filter: filterRef.current,
            onCancel: () => setRenderOnCreate(false),
            onCreate: (item) => {
              setRenderOnCreate(false);
              handleChange(item);
            },
          }}
        >
          {create}
        </CreateSuggestionContext.Provider>
      ) : null,
    getOptionDisabled: (option) =>
      option?.id === createHintValue || option === createHintValue,
  };
};

export interface SupportCreateSuggestionOptions {
  create?: ReactElement;
  createValue?: string;
  createHintValue?: string;
  createLabel?: string;
  createItemLabel?: string;
  filter?: string;
  handleChange: (value: any) => void;
  onCreate?: OnCreateHandler;
  optionText?: OptionText;
}

export interface UseSupportCreateValue {
  createId: string;
  createHintId: string;
  getCreateItem: (filterValue?: string) => {
    id: Identifier;
    [key: string]: any;
  };
  handleChange: (eventOrValue: ChangeEvent | any) => Promise<void>;
  createElement: ReactElement | null;
  getOptionDisabled: (option: any) => boolean;
}

const CreateSuggestionContext = createContext<
  CreateSuggestionContextValue | undefined
>(undefined);

interface CreateSuggestionContextValue {
  filter?: string;
  onCreate: (choice: any) => void;
  onCancel: () => void;
}
export const useCreateSuggestionContext = () => {
  const context = useContext(CreateSuggestionContext);
  if (!context) {
    throw new Error(
      "useCreateSuggestionContext must be used inside a CreateSuggestionContext.Provider"
    );
  }
  return context;
};

export type OnCreateHandler = (filter?: string) => any | Promise<any>;
