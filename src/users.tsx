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
import { AddUserForm } from "./components/add-user";
import { BuildUserTable } from "./components/build-user-table";

export const Users: React.FC<UserProps> = (props) => {
  const [items, setItems] = React.useState<UserEntry[]>();
  const [msg, setMsg] = React.useState("");
  // const userId = getStoredProp("userId") || "1";
  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/user`)
      .then((res) => res.json())
      .then((data) => {
        let locationData: UserEntry[] = [];
        for (var i = 0; i < data.length; i++) {
          var obj: UserEntry = data[i];
          locationData.push(obj);
        }
        setItems(locationData);
        setMsg(`Loaded ${data.length} users`);
      })
      .catch(console.log);
  }, []);

  // var body = document.getElementsByTagName("body")[0];
  // body.setAttribute("class", "Locations");

  return (
    <div id="main">
      {msg && <Alert title={msg} variant="info" timeout={1000} />}
      <Gallery>
        <GalleryItem key="locations-card">
          <Card>
            <CardHeader>
              <Flex>
                <FlexItem className="card-header_color">Users</FlexItem>
                <FlexItem align={{ default: "alignRight" }}>
                  <AddUserForm statusMsg={setMsg} />
                </FlexItem>
              </Flex>
            </CardHeader>
            <CardBody>
              {" "}
              {items && items?.length !== 0 && (
                <BuildUserTable
                  key="table-for-activities"
                  items={items}
                  columnLabels={["ID", "Name", "Username", "email", "Status"]}
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

export type UserProps = {};

export type UserEntry = {
  userId: number;
  fullname: string;
  username: string;
  email: string;
  status: string;
};
