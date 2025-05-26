/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState, useEffect } from "react";

import {
  ListBase,
  getElementsFromRecords,
  InferredElement,
  useListContext,
  useResourceContext,
  RaRecord,
} from "ra-core";
import { ListProps, ListView, ListViewProps } from "@/components/List";
import { capitalize, singularize } from "inflection";
import { DataTable } from "@/components/DataTable";
import { ArrayField } from "@/components/ArrayField";
import { BadgeField } from "@/components/BadgeField";
import { ReferenceField } from "@/components/ReferenceField";
import { SingleFieldList } from "@/components/SingleFieldList";

export const ListGuesser = <RecordType extends RaRecord = RaRecord>(
  props: Omit<ListProps, "children"> & { enableLog?: boolean }
) => {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter,
    filterDefaultValues,
    perPage,
    resource,
    sort,
    ...rest
  } = props;
  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      perPage={perPage}
      resource={resource}
      sort={sort}
    >
      <ListViewGuesser {...rest} />
    </ListBase>
  );
};

const ListViewGuesser = (
  props: Omit<ListViewProps, "children"> & { enableLog?: boolean }
) => {
  const { data } = useListContext();
  const resource = useResourceContext();
  const [child, setChild] = useState<React.ReactElement | null>(null);
  const { enableLog = process.env.NODE_ENV === "development", ...rest } = props;

  useEffect(() => {
    setChild(null);
  }, [resource]);

  useEffect(() => {
    if (data && data.length > 0 && !child) {
      const inferredElements = getElementsFromRecords(data, listFieldTypes);
      const inferredChild = new InferredElement(
        listFieldTypes.table,
        null,
        inferredElements
      );
      const inferredChildElement = inferredChild.getElement();
      const representation = inferredChild.getRepresentation();
      if (!resource) {
        throw new Error(
          "Cannot use <ListGuesser> outside of a ResourceContext"
        );
      }
      if (!inferredChildElement || !representation) {
        return;
      }

      setChild(inferredChildElement);

      const components = ["List"]
        .concat(
          Array.from(
            new Set(
              Array.from(representation.matchAll(/<([^/\s\\.>]+)/g))
                .map((match) => match[1])
                .filter((component) => component !== "span")
            )
          )
        )
        .sort();

      if (enableLog) {
        console.log(
          `Guessed List:

${components
  .map(
    (component) => `import { ${component} } from "@/components/${component}";`
  )
  .join("\n")}

export const ${capitalize(singularize(resource))}List = () => (
    <List>
${inferredChild.getRepresentation()}
    </List>
);`
        );
      }
    }
  }, [data, child, resource, enableLog]);

  return <ListView {...rest}>{child}</ListView>;
};

const listFieldTypes = {
  table: {
    component: (props: any) => {
      return <DataTable {...props} />;
    },
    representation: (
      _props: any,
      children: { getRepresentation: () => string }[]
    ) =>
      `        <DataTable>
${children
  .map((child) => `            ${child.getRepresentation()}`)
  .join("\n")}
        </DataTable>`,
  },

  reference: {
    component: (props: any) => (
      <DataTable.Col source={props.source}>
        <ReferenceField source={props.source} reference={props.reference} />
      </DataTable.Col>
    ),
    representation: (props: any) =>
      `<DataTable.Col source="${props.source}">
                <ReferenceField source="${props.source}" reference="${props.reference}" />
            </DataTable.Col>`,
  },
  array: {
    component: ({ children, ...props }: any) => {
      const childrenArray = React.Children.toArray(children);
      return (
        <DataTable.Col source={props.source}>
          <ArrayField source={props.source}>
            <SingleFieldList>
              <BadgeField
                source={
                  childrenArray.length > 0 &&
                  React.isValidElement(childrenArray[0]) &&
                  (childrenArray[0].props as any).source
                }
              />
            </SingleFieldList>
          </ArrayField>
        </DataTable.Col>
      );
    },
    representation: (props: any, children: any) =>
      `<DataTable.Col source="${props.source}">
               <ArrayField source="${props.source}">
                    <SingleFieldList>
                        <BadgeField source="${
                          children.length > 0 && children[0].getProps().source
                        }" />
                   </SingleFieldList>
                </ArrayField>
            </DataTable.Col>`,
  },
  string: {
    component: DataTable.Col,
    representation: (props: any) =>
      `<DataTable.Col source="${props.source}" />`,
  },
};
