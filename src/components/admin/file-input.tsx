import {
  FieldTitle,
  InputProps,
  RecordContextProvider,
  shallowEqual,
  useInput,
  useTranslate,
} from "ra-core";
import {
  Children,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

import { cn } from "@/lib/utils";
import { FormItem, FormLabel } from "../ui/form";
import { FileInputPreview } from "./file-input-preview";
import { InputHelperText } from "./input-helper-text";
import { sanitizeInputRestProps } from "./sanitizeInputProps";

export const FileInput = (inProps: FileInputProps) => {
  const {
    accept,
    children,
    className,
    format,
    helperText,
    inputProps: inputPropsOptions,
    maxSize,
    minSize,
    multiple = false,
    label,
    labelMultiple = "ra.input.file.upload_several",
    labelSingle = "ra.input.file.upload_single",
    options = {},
    onChange: onChangeProp,
    onRemove: onRemoveProp,
    parse,
    placeholder,
    removeIcon,
    resource,
    source,
    validate,
    validateFileRemoval,
    disabled,
    readOnly,
    ...rest
  } = inProps;
  const { onDrop: onDropProp } = options;
  const translate = useTranslate();

  // turn a browser dropped file structure into expected structure
  const transformFile = (file: any) => {
    if (!(file instanceof File)) {
      return file;
    }

    const preview = URL.createObjectURL(file);
    const transformedFile = {
      rawFile: file,
      src: preview,
      title: file.name,
    };

    return transformedFile;
  };

  const transformFiles = (files: any[]) => {
    if (!files) {
      return multiple ? [] : null;
    }

    if (Array.isArray(files)) {
      return files.map(transformFile);
    }

    return transformFile(files);
  };

  const {
    id,
    field: { onChange, onBlur, value },
    fieldState,
    isRequired,
  } = useInput({
    format: format || transformFiles,
    parse: parse || transformFiles,
    source,
    validate,
    disabled,
    readOnly,
    onChange: onChangeProp,
    ...rest,
  });
  const { error, invalid } = fieldState;
  const files = value ? (Array.isArray(value) ? value : [value]) : [];

  const onDrop = (newFiles: any[], rejectedFiles: any[], event: any) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles];

    if (multiple) {
      onChange(updatedFiles);
      onBlur();
    } else {
      onChange(updatedFiles[0]);
      onBlur();
    }

    if (onDropProp) {
      onDropProp(newFiles, rejectedFiles, event);
    }
  };

  const onRemove = (file: any) => async () => {
    if (validateFileRemoval) {
      try {
        await validateFileRemoval(file);
      } catch {
        return;
      }
    }
    if (multiple) {
      const filteredFiles = files.filter(
        (stateFile) => !shallowEqual(stateFile, file)
      );
      onChange(filteredFiles as any);
      onBlur();
    } else {
      onChange(null);
      onBlur();
    }

    if (onRemoveProp) {
      onRemoveProp(file);
    }
  };

  const childrenElement =
    children && isValidElement(Children.only(children))
      ? (Children.only(children) as ReactElement<any>)
      : undefined;

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    minSize,
    multiple,
    disabled: disabled || readOnly,
    ...options,
    onDrop,
  });

  const renderHelperText = helperText !== false || invalid;

  return (
    <FormItem
      {...sanitizeInputRestProps(rest)}
      className={cn("w-full", "ra-input", `ra-input-${source}`, className)}
    >
      <FormLabel
        htmlFor={id}
        className={cn(
          "cursor-pointer",
          disabled || readOnly ? "cursor-default" : "cursor-pointer"
        )}
      >
        <FieldTitle
          label={label}
          source={source}
          resource={resource}
          isRequired={isRequired}
        />
      </FormLabel>

      <div
        {...getRootProps({
          className: cn(
            "border-2 border-dashed border-muted rounded-lg p-6 text-center transition-colors",
            "hover:border-sidebar-ring focus:outline-none",
            disabled || readOnly
              ? "bg-muted cursor-not-allowed"
              : "bg-muted text-muted-foreground cursor-pointer"
          ),
          "data-testid": "dropzone",
        })}
      >
        <input
          id={id}
          name={id}
          {...getInputProps({
            ...inputPropsOptions,
          })}
        />
        {placeholder ? (
          placeholder
        ) : multiple ? (
          <p className="text-sm">{translate(labelMultiple)}</p>
        ) : (
          <p className="text-sm">{translate(labelSingle)}</p>
        )}
      </div>

      {renderHelperText && (error?.message || helperText) ? (
        <div
          className={cn(
            "mt-2 text-sm",
            invalid ? "text-red-600" : "text-gray-600"
          )}
        >
          <InputHelperText error={error?.message} helperText={helperText} />
        </div>
      ) : null}

      {children && (
        <div className="previews space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file: any, index: number) => (
            <FileInputPreview
              key={index}
              file={file}
              onRemove={onRemove(file)}
              className="preview-item"
              removeIcon={removeIcon}
            >
              <RecordContextProvider value={file}>
                {childrenElement}
              </RecordContextProvider>
            </FileInputPreview>
          ))}
        </div>
      )}
    </FormItem>
  );
};

export type FileInputProps = InputProps & {
  accept?: DropzoneOptions["accept"];
  className?: string;
  children?: ReactNode;
  labelMultiple?: string;
  labelSingle?: string;
  maxSize?: DropzoneOptions["maxSize"];
  minSize?: DropzoneOptions["minSize"];
  multiple?: DropzoneOptions["multiple"];
  options?: DropzoneOptions;
  onRemove?: (file: any) => void;
  placeholder?: ReactNode;
  removeIcon?: ComponentType<{ className?: string }>;
  inputProps?: any;
  validateFileRemoval?(file: any): boolean | Promise<boolean>;
};
