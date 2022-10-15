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
import { UserEntry } from "../locations";

export const BuildUserTable: React.FC<BuildTableProps> = (props) => {
  const { items = [], columnLabels = [] } = props;

  return (
    <TableComposable aria-label="User table">
      <Caption>Users of the applicaiton</Caption>
      <Thead>
        <Tr>
          {columnLabels.map((colLabel: string) => (
            <Th>{colLabel}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item: UserEntry) => (
          <Tr key={item.username}>
            <Td dataLabel={columnLabels[0]}>{item.userId}</Td>
            <Td dataLabel={columnLabels[1]}>{item.fullname}</Td>
            <Td dataLabel={columnLabels[2]}>{item.username}</Td>
            <Td dataLabel={columnLabels[3]}>{item.email}</Td>
            <Td dataLabel={columnLabels[4]}>{item.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};
export type BuildTableProps = {
  items?: UserEntry[];
  columnLabels?: string[];
};
