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
  //   Spinner,
} from "@patternfly/react-core";
// import { getStoredProp } from "./components/localStorage";
import { AddHikeForm } from "./components/add-hike";
import { BuildHikesTable } from "./components/build-hike-table";

export const Hikes: React.FC<HikeProps> = (props) => {
  const [items, setItems] = React.useState<HikeEntry[]>();
  const [msg, setMsg] = React.useState("");
  // const userId = getStoredProp("userId") || "1";
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/hike`)
      .then((res) => res.json())
      .then((data) => {
        let hikeData: HikeEntry[] = [];
        for (var i = 0; i < data.length; i++) {
          var obj: HikeEntry = data[i];
          hikeData.push(obj);
        }
        setItems(hikeData);
        setMsg(`Loaded ${data.length} hikes`);
      })
      .catch(console.log);
  }, []);

  // var body = document.getElementsByTagName("body")[0];
  // body.setAttribute("class", "Locations");

  return (
    <div id="main">
      {msg && <Alert title={msg} variant="info" timeout={1000} />}
      <Gallery>
        <GalleryItem key="hike-card">
          <Card>
            <CardHeader>
              <Flex>
                <FlexItem className="card-header_color">Hikes</FlexItem>
                <FlexItem align={{ default: "alignRight" }}>
                  <AddHikeForm statusMsg={setMsg} />
                </FlexItem>
              </Flex>
            </CardHeader>
            <CardBody>
              {" "}
              {items && items?.length !== 0 && (
                <BuildHikesTable
                  key="table-for-activities"
                  items={items}
                  columnLabels={[
                    "ID",
                    "UserName",
                    "LocationName",
                    "Description",
                    "Date",
                  ]}
                />
              )}
              {items?.length === 0 && <span>No hikes entered</span>}
            </CardBody>
          </Card>
        </GalleryItem>
      </Gallery>
    </div>
  );
};

export type HikeProps = {};

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

export type HikeEntry = {
  hikeId: number;
  userId: number;
  username: string;
  name: string;
  locationId: number;
  hikeDate: string;
  description: string;
};
