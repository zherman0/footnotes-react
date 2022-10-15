import React from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  Spinner,
} from "@patternfly/react-core";
// import { getStoredProp } from "./components/localStorage";
import { AddLocationForm } from "./components/add-location";
import { BuildLocationsTable } from "./components/build-locations-table";

export const Locations: React.FC<LocationsProps> = (props) => {
  const [items, setItems] = React.useState<LocationEntry[]>();
  const [msg, setMsg] = React.useState("");
  // const userId = getStoredProp("userId") || "1";
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/location`)
      .then((res) => res.json())
      .then((data) => {
        let locationData: LocationEntry[] = [];
        for (var i = 0; i < data.length; i++) {
          var obj: LocationEntry = data[i];
          locationData.push(obj);
        }
        setItems(locationData);
        setMsg(`Loaded ${data.length} locations`);
      })
      .catch(console.log);
  }, []);

  // var body = document.getElementsByTagName("body")[0];
  // body.setAttribute("class", "Locations");

  return (
    <div id="main">
      {msg && <Alert title={msg} variant="info" timeout />}
      <Gallery>
        <GalleryItem key="locations-card">
          <Card>
            <CardHeader>
              <Flex>
                <FlexItem className="card-header_color">Locations</FlexItem>
                <FlexItem align={{ default: "alignRight" }}>
                  <AddLocationForm statusMsg={setMsg} />
                </FlexItem>
              </Flex>
            </CardHeader>
            <CardBody>
              {" "}
              {items && items?.length !== 0 && (
                <BuildLocationsTable
                  key="table-for-activities"
                  items={items}
                  columnLabels={[
                    "ID",
                    "Name",
                    "Description",
                    "Directions",
                    "Updated",
                    "Status",
                  ]}
                />
              )}
              {items?.length === 0 && <Spinner>Loading items....</Spinner>}
            </CardBody>
          </Card>
        </GalleryItem>
      </Gallery>
    </div>
  );
};

export type LocationsProps = {};

export type LocationEntry = {
  locationId: number;
  name: string;
  description: string;
  directions: string;
  last_updated: string;
  status: string;
};

export type UserEntry = {
  userId: number;
  fullname: string;
  username: string;
  email: string;
  status: string;
};
