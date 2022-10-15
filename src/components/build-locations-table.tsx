import React from "react";
import {
  TableComposable,
  Caption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";

export const BuildLocationsTable: React.FC<BuildTableProps> = (props) => {
  const { items = [], columnLabels = [] } = props;

  return (
    <TableComposable aria-label="Simple table">
      <Caption>Locations where people have hiked</Caption>
      <Thead>
        <Tr>
          {columnLabels.map((colLabel: string) => (
            <Th>{colLabel}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item: any) => (
          <Tr key={item?.name}>
            <Td dataLabel={columnLabels[0]}>{item?.locationId}</Td>
            <Td dataLabel={columnLabels[1]}>{item?.name}</Td>
            <Td dataLabel={columnLabels[2]}>{item?.description}</Td>
            <Td dataLabel={columnLabels[3]}>{item?.directions}</Td>
            <Td dataLabel={columnLabels[4]}>{item?.last_updated}</Td>
            <Td dataLabel={columnLabels[5]}>{item?.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};
export type BuildTableProps = {
  items?: any;
  columnLabels?: string[];
};
