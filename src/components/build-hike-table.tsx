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
import { HikeEntry } from "../hikes";

export const BuildHikesTable: React.FC<BuildTableProps> = (props) => {
  const { items = [], columnLabels = [] } = props;

  return (
    <TableComposable aria-label="Simple table">
      <Caption>Hikes</Caption>
      <Thead>
        <Tr>
          {columnLabels.map((colLabel: string) => (
            <Th key={colLabel}>{colLabel}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item: HikeEntry) => (
          <Tr key={item?.hikeId}>
            <Td dataLabel={columnLabels[0]}>{item?.hikeId}</Td>
            <Td dataLabel={columnLabels[1]}>{item?.username}</Td>
            <Td dataLabel={columnLabels[5]}>{item?.name}</Td>
            <Td dataLabel={columnLabels[2]}>{item?.description}</Td>
            <Td dataLabel={columnLabels[4]}>{item?.hikeDate}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};
export type BuildTableProps = {
  items?: HikeEntry[];
  columnLabels?: string[];
};
