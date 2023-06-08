import React from "react";
import {
  Select,
  SelectOption,
  SelectVariant,
  SelectOptionObject,
} from "@patternfly/react-core";
import { UserEntry } from "../locations";

export const UserSelect: React.FC<UserSelectProps> = (props) => {
  const { onChange, userValue } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [items, setItems] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/user/`)
      .then((res) => res.json())
      .then((data) => {
        let dropdownItems: any[] = [];
        for (var i = 0; i < data.length; i++) {
          var obj: UserEntry = data[i];
          dropdownItems.push(
            <SelectOption key={obj.userId} value={obj.userId} />
          );
        }
        setItems(dropdownItems);
      })
      .catch(console.log);
  }, []);

  const onToggle = (_isOpen: boolean) => setIsOpen(_isOpen);

  const onSelect = (
    event: any,
    value: string | SelectOptionObject,
    isPlaceholder: boolean | undefined
  ) => {
    setIsOpen(!isOpen);
    onChange(value);
  };

  const clearSelection = () => {
    setIsOpen(false);
    onChange("");
  };
  return (
    <>
      <Select
        variant={SelectVariant.typeahead}
        aria-label="Select user"
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={userValue}
        isOpen={isOpen}
        placeholderText="Select user"
        maxHeight="300px"
        menuAppendTo="parent"
        readOnly
      >
        {items}
      </Select>
    </>
  );
};
export type UserSelectProps = {
  onChange: Function;
  userValue?: number | undefined;
};
