import React from "react";
import {
  AlertActionCloseButton,
  Alert,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextInput,
} from "@patternfly/react-core";
import { /*AddCircleOIcon,*/ EditIcon } from "@patternfly/react-icons";
import { LocationEntry } from "../locations";

export const AddLocationForm: React.FC<AddLocationFormProps> = (props) => {
  const [location, setLocation] = React.useState<LocationEntry>();

  const [msg, setMsg] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [directions, setDirections] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { locationId, edit = false, statusMsg, item = null } = props;

  React.useEffect(() => {
    if (!item && locationId) {
      fetch(
        `${process.env.REACT_APP_API_SERVER}/fnapi/?/location/${locationId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLocation(data);
        })
        .catch(console.log);
    } else if (item) {
      setLocation(item);
    }
  }, [locationId, item]);

  const clearForm = () => {};

  const handleName = (v: string, e: any) => setName(v);
  const handleDescription = (v: string, e: any) => setDescription(v);
  const handleDirections = (v: string, e: any) => setDirections(v);
  const handleStatus = (v: string, e: any) => setStatus(v);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //Quick Validation:
    if (name === "" || description === "" || directions === "") {
      setMsg(
        "You need to set all required fields[name, description, directions]"
      );
      return;
    }
    const data = new FormData();

    if (locationId) {
      data.append("locationId", locationId.toString());
    }
    data.append("name", name);
    data.append("description", description);
    data.append("directions", directions);
    data.append("status", status);

    const url = `${process.env.REACT_APP_ACT_API_SERVER}/fnapi/?/location`;
    const fetchMethod = "POST";
    fetch(url, {
      method: fetchMethod,
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg(data);
        if (data.includes("Successful")) {
          handleModalToggle();
          if (typeof statusMsg !== "undefined") statusMsg(data);
        }
      })
      .catch(console.log);
  };

  const clearMsg = () => setMsg("");
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      {!edit && (
        <Button
          key="add-place-button"
          variant="primary"
          onClick={handleModalToggle}
        >
          Add Place
        </Button>
      )}
      {edit && (
        <EditIcon
          onClick={handleModalToggle}
          key={`edit-schema-${locationId}`}
        ></EditIcon>
      )}
      <Modal
        variant={ModalVariant.small}
        title={locationId ? "Edit Location" : "Add Location"}
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button variant="primary" onClick={handleSubmit} key="submit-button">
            Submit
          </Button>,
          <Button variant="danger" onClick={clearForm} key="clear-button">
            Clear
          </Button>,
          <Button key="cancel" variant="secondary" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        {msg && (
          <Alert
            variant="info"
            isInline
            title={msg}
            actionClose={<AlertActionCloseButton onClose={clearMsg} />}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup label="Location" isRequired fieldId="name-field">
            <TextInput
              value={location?.name}
              isRequired
              type="text"
              id="name-field"
              aria-describedby="name-field"
              name="name-field"
              onChange={handleName}
            />
          </FormGroup>
          <FormGroup label="Description" isRequired fieldId="desc-field">
            <div className="flex-display">
              <TextInput
                value={location?.description}
                isRequired
                type="text"
                id="desc-field"
                aria-describedby="desc-field"
                name="desc-field"
                onChange={handleDescription}
              />
            </div>
          </FormGroup>
          <FormGroup label="Directions" isRequired fieldId="directions-field">
            <div className="flex-display">
              <TextInput
                value={directions}
                isRequired
                type="text"
                id="directions-field"
                aria-describedby="directions-field"
                name="directions-field"
                onChange={handleDirections}
              />
            </div>
          </FormGroup>
          <FormGroup label="Status" isRequired fieldId="status-field">
            <TextInput
              value={status}
              isRequired
              type="text"
              id="status-field"
              aria-describedby="status-field"
              name="status-field"
              onChange={handleStatus}
            />
          </FormGroup>
        </Form>
      </Modal>{" "}
    </div>
  );
};
export type AddLocationFormProps = {
  item?: LocationEntry;
  locationId?: number;
  statusMsg?: Function;
  edit?: boolean;
};
// const golfSchema = {
//   title: "Golf Log",
//   description: "Log for all my golfing",
//   fields: {
//     location: {
//       type: "string",
//       title: "Location",
//       required: true,
//     },
//     date: {
//       type: "date",
//       title: "Date",
//       required: true,
//     },
//     score: {
//       type: "number",
//       step: "1",
//       title: "Score",
//       required: true,
//     },
//     description: {
//       type: "string",
//       title: "Description",
//     },
//     cost: {
//       type: "number",
//       title: "Cost",
//       step: "01",
//     },
//     who: {
//       type: "string",
//       title: "Who you played with",
//     },
//   },
// };
// console.log("Output:", JSON.stringify(golfSchema));
