/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  useEffect,
  useState,
  isValidElement,
  Children,
} from "react";
import {
  ShowBase,
  InferredElement,
  getElementsFromRecords,
  useResourceContext,
  useShowContext,
  InferredTypeMap,
} from "ra-core";
import { capitalize, singularize } from "inflection";
import { ShowView } from "@/components/Show";
import { SimpleShowLayout } from "@/components/SimpleShowLayout";
import { RecordField } from "@/components/RecordField";
import { ReferenceField } from "@/components/ReferenceField";
import { ArrayField } from "@/components/ArrayField";
import { BadgeField } from "@/components/BadgeField";
import { SingleFieldList } from "@/components/SingleFieldList";

export const ShowGuesser = (props: { enableLog?: boolean }) => (
  <ShowBase>
    <ShowViewGuesser {...props} />
  </ShowBase>
);

const ShowViewGuesser = (props: { enableLog?: boolean }) => {
  const resource = useResourceContext();

  if (!resource) {
    throw new Error(`Cannot use <ShowGuesser> outside of a ResourceContext`);
  }

  const { record } = useShowContext();
  const [child, setChild] = useState<ReactNode>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (record && !child) {
      const inferredElements = getElementsFromRecords([record], showFieldTypes);
      const inferredChild = new InferredElement(
        showFieldTypes.show,
        null,
        inferredElements
      );
      setChild(inferredChild.getElement());

      if (!enableLog) return;

      const representation = inferredChild.getRepresentation();
      const components = ["Show"]
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
        `Guessed Show:

${components
  .map(
    (component) => `import { ${component} } from "@/components/${component}";`
  )
  .join("\n")}

export const ${capitalize(singularize(resource))}Show = () => (
    <Show>
${inferredChild.getRepresentation()}
    </Show>
);`
      );
    }
  }, [record, child, resource, enableLog]);

  return <ShowView {...rest}>{child}</ShowView>;
};

const showFieldTypes: InferredTypeMap = {
  show: {
    component: (props: any) => <SimpleShowLayout {...props} />,
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[]
    ) => `        <SimpleShowLayout>
${children
  .map((child) => `            ${child.getRepresentation()}`)
  .join("\n")}
        </SimpleShowLayout>`,
  },
  reference: {
    component: (props: any) => (
      <RecordField source={props.source}>
        <ReferenceField source={props.source} reference={props.reference} />
      </RecordField>
    ),
    representation: (props: any) =>
      `<RecordField source="${props.source}">
                <ReferenceField source="${props.source}" reference="${props.reference}" />
            </RecordField>`,
  },
  array: {
    component: ({ children, ...props }: any) => {
      const childrenArray = Children.toArray(children);
      return (
        <RecordField source={props.source}>
          <ArrayField source={props.source}>
            <SingleFieldList>
              <BadgeField
                source={
                  childrenArray.length > 0 &&
                  isValidElement(childrenArray[0]) &&
                  (childrenArray[0].props as any).source
                }
              />
            </SingleFieldList>
          </ArrayField>
        </RecordField>
      );
    },
    representation: (props: any, children: any) =>
      `<RecordField source="${props.source}">
                <ArrayField source="${props.source}">
                    <SingleFieldList>
                        <BadgeField source="${
                          children.length > 0 && children[0].getProps().source
                        }" />
                    </SingleFieldList>
                </ArrayField>
            </RecordField>`,
  },
  string: {
    component: (props: any) => <RecordField source={props.source} />,
    representation: (props: any) => `<RecordField source="${props.source}" />`,
  },
};
