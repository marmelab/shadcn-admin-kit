import { cn } from "@/lib/utils";
import get from "lodash/get";
import {
  FormDataConsumer,
  type RaRecord,
  useRecordContext,
  useTranslate,
  useWrappedSource,
} from "ra-core";
import * as React from "react";
import {
  Children,
  type ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { type UseFieldArrayReturn, useFormContext } from "react-hook-form";

import { AddItemButton as DefaultAddItemButton } from "./add-item-button";
import { useArrayInput } from "./array-input-context";
import { ClearArrayButton } from "./clear-array-button";
import { Confirm } from "./confirm";
import { SimpleFormIteratorContext } from "./simple-form-iterator-context";
import {
  DisableRemoveFunction,
  SimpleFormIteratorItem,
} from "./simple-form-iterator-item";

export const SimpleFormIterator = (props: SimpleFormIteratorProps) => {
  const {
    addButton = <DefaultAddItemButton />,
    removeButton,
    reOrderButtons,
    children,
    className,
    resource,
    disabled,
    disableAdd = false,
    disableClear,
    disableRemove = false,
    disableReordering,
    inline,
    getItemLabel = false,
  } = props;

  const finalSource = useWrappedSource("");
  if (!finalSource) {
    throw new Error(
      "SimpleFormIterator can only be called within an iterator input like ArrayInput"
    );
  }

  const [confirmIsOpen, setConfirmIsOpen] = useState<boolean>(false);
  const { append, fields, move, remove, replace } = useArrayInput(props);
  const { trigger, getValues } = useFormContext();
  const translate = useTranslate();
  const record = useRecordContext(props);
  const initialDefaultValue = useRef({});

  const removeField = useCallback(
    (index: number) => {
      remove(index);
      const isScalarArray = getValues(finalSource).every(
        (value: any) => typeof value !== "object"
      );
      if (isScalarArray) {
        // Trigger validation on the Array to avoid ghost errors.
        // Otherwise, validation errors on removed fields might still be displayed
        trigger(finalSource);
      }
    },
    [remove, trigger, finalSource, getValues]
  );

  if (fields.length > 0) {
    const { id: _id, ...rest } = fields[0];
    initialDefaultValue.current = rest;
    for (const k in initialDefaultValue.current) {
      // @ts-expect-error: reset fields
      initialDefaultValue.current[k] = null;
    }
  }

  const addField = useCallback(
    (item: any = undefined) => {
      let defaultValue = item;
      if (item == null) {
        defaultValue = initialDefaultValue.current;
        if (
          Children.count(children) === 1 &&
          React.isValidElement(Children.only(children)) &&
          // @ts-expect-error: Check if the child has a source prop
          !Children.only(children).props.source &&
          // Make sure it's not a FormDataConsumer
          // @ts-expect-error: Check if the child is a FormDataConsumer
          Children.only(children).type !== FormDataConsumer
        ) {
          // ArrayInput used for an array of scalar values
          // (e.g. tags: ['foo', 'bar'])
          defaultValue = "";
        } else {
          // ArrayInput used for an array of objects
          // (e.g. authors: [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Jane', lastName: 'Doe' }])
          defaultValue = defaultValue || ({} as Record<string, unknown>);
          Children.forEach(children, (input) => {
            if (
              React.isValidElement(input) &&
              input.type !== FormDataConsumer &&
              // @ts-expect-error: Check if the child has a source prop
              input.props.source
            ) {
              // @ts-expect-error: Check if the child has a source prop
              defaultValue[input.props.source] =
                // @ts-expect-error: Check if the child has a source prop
                input.props.defaultValue ?? null;
            }
          });
        }
      }
      append(defaultValue);
    },
    [append, children]
  );

  const handleReorder = useCallback(
    (origin: number, destination: number) => {
      move(origin, destination);
    },
    [move]
  );

  const handleArrayClear = useCallback(() => {
    replace([]);
    setConfirmIsOpen(false);
  }, [replace]);

  const records = get(record, finalSource);

  const context = useMemo(
    () => ({
      total: fields.length,
      add: addField,
      remove: removeField,
      reOrder: handleReorder,
      source: finalSource,
    }),
    [addField, fields.length, handleReorder, removeField, finalSource]
  );
  return fields ? (
    <SimpleFormIteratorContext.Provider value={context}>
      <div className={cn("w-full", disabled && "disabled", className)}>
        <ul className="p-0 m-0 flex flex-col gap-2">
          {fields.map((member, index) => (
            <SimpleFormIteratorItem
              key={member.id}
              disabled={disabled}
              disableRemove={disableRemove}
              disableReordering={disableReordering}
              fields={fields}
              getItemLabel={getItemLabel}
              index={index}
              onRemoveField={removeField}
              onReorder={handleReorder}
              record={(records && records[index]) || {}}
              removeButton={removeButton}
              reOrderButtons={reOrderButtons}
              resource={resource}
              inline={inline}
            >
              {children}
            </SimpleFormIteratorItem>
          ))}
        </ul>
        {!disabled && !(disableAdd && (disableClear || disableRemove)) && (
          <div className="flex flex-row items-center gap-2">
            {!disableAdd && addButton}
            {fields.length > 0 && !disableClear && !disableRemove && (
              <>
                <Confirm
                  isOpen={confirmIsOpen}
                  title={translate("ra.action.clear_array_input")}
                  content={translate("ra.message.clear_array_input")}
                  onConfirm={handleArrayClear}
                  onClose={() => setConfirmIsOpen(false)}
                />
                <ClearArrayButton onClick={() => setConfirmIsOpen(true)} />
              </>
            )}
          </div>
        )}
      </div>
    </SimpleFormIteratorContext.Provider>
  ) : null;
};

type GetItemLabelFunc = (index: number) => string | ReactElement;

export interface SimpleFormIteratorProps extends Partial<UseFieldArrayReturn> {
  addButton?: ReactElement;
  children?: ReactElement | ReactElement[];
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  disableAdd?: boolean;
  disableClear?: boolean;
  disableRemove?: boolean | DisableRemoveFunction;
  disableReordering?: boolean;
  fullWidth?: boolean;
  getItemLabel?: boolean | GetItemLabelFunc;
  inline?: boolean;
  meta?: {
    // the type defined in FieldArrayRenderProps says error is boolean, which is wrong.
    error?: any;
    submitFailed?: boolean;
  };
  record?: RaRecord;
  removeButton?: ReactElement;
  reOrderButtons?: ReactElement;
  resource?: string;
  source?: string;
}
