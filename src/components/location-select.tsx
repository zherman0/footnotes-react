import React from "react";
import {
  Select,
  SelectOption,
  SelectVariant,
  SelectOptionObject,
} from "@patternfly/react-core";
import { LocationEntry } from "../locations";

export const LocationSelect: React.FC<LocationSelectProps> = (props) => {
  const { onChange, locationValue } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [items, setItems] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/location/`)
      .then((res) => res.json())
      .then((data) => {
        let dropdownItems: any[] = [];
        for (var i = 0; i < data.length; i++) {
          var obj: LocationEntry = data[i];
          dropdownItems.push(
            <SelectOption key={obj.locationId} value={obj.locationId} />
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
        aria-label="Select location"
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={locationValue}
        isOpen={isOpen}
        placeholderText="Select location"
        maxHeight="300px"
        menuAppendTo="parent"
        readOnly
      >
        {items}
      </Select>
    </>
  );
};
export type LocationSelectProps = {
  onChange: Function;
  locationValue?: number | undefined;
};
