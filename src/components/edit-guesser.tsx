/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import {
  EditBase,
  InferredElement,
  useResourceContext,
  useEditContext,
  getElementsFromRecords,
  InferredTypeMap,
} from "ra-core";
import { capitalize, singularize } from "inflection";
import { EditView } from "@/components/edit";
import { SimpleForm } from "@/components/simple-form";
import { TextInput } from "@/components/text-input";
import { ReferenceInput } from "@/components/reference-input";
import { AutocompleteInput } from "@/components/autocomplete-input";

export const EditGuesser = (props: { enableLog?: boolean }) => {
  return (
    <EditBase>
      <EditViewGuesser {...props} />
    </EditBase>
  );
};

const EditViewGuesser = (props: { enableLog?: boolean }) => {
  const resource = useResourceContext();

  if (!resource) {
    throw new Error(`Cannot use <EditGuesser> outside of a ResourceContext`);
  }

  const { record } = useEditContext();
  const [child, setChild] = useState<ReactNode>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (record && !child) {
      const inferredElements = getElementsFromRecords([record], editFieldTypes);
      const inferredChild = new InferredElement(
        editFieldTypes.form,
        null,
        inferredElements
      );
      setChild(inferredChild.getElement());

      if (!enableLog) return;

      const representation = inferredChild.getRepresentation();

      const components = ["Edit"]
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^/\s>]+)/g))
                .map((match) => match[1])
                .filter((component) => component !== "span")
            )
          )
        )
        .sort();

      console.log(
        `Guessed Edit:

${components
  .map(
    (component) => `import { ${component} } from "@/components/${component}";`
  )
  .join("\n")}

export const ${capitalize(singularize(resource))}Edit = () => (
    <Edit>
${representation}
    </Edit>
);`
      );
    }
  }, [record, child, resource, enableLog]);

  return <EditView {...rest}>{child}</EditView>;
};

const editFieldTypes: InferredTypeMap = {
  form: {
    component: (props: any) => <SimpleForm {...props} />,
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[]
    ) => `        <SimpleForm>
${children
  .map((child) => `            ${child.getRepresentation()}`)
  .join("\n")}
        </SimpleForm>`,
  },
  reference: {
    component: (props: any) => (
      <ReferenceInput source={props.source} reference={props.reference}>
        <AutocompleteInput />
      </ReferenceInput>
    ),
    representation: (props: any) =>
      `<ReferenceInput source="${props.source}" reference="${props.reference}">
                  <AutocompleteInput />
              </ReferenceInput>`,
  },
  string: {
    component: (props: any) => <TextInput {...props} />,
    representation: (props: any) => `<TextInput source="${props.source}" />`,
  },
};
