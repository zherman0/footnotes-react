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
import { HikeEntry } from "../hikes";
import { UserSelect } from "./user-select";
import { LocationSelect } from "./location-select";

export const AddHikeForm: React.FC<AddHikeFormProps> = (props) => {
  const [hike, setHike] = React.useState<HikeEntry>();

  const [msg, setMsg] = React.useState("");
  const [name, setName] = React.useState<number>();
  const [location, setLocation] = React.useState<number>();
  const [description, setDescription] = React.useState("");
  const [hikeDate, setHikeDate] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { hikeId, edit = false, statusMsg, item = null } = props;

  React.useEffect(() => {
    if (!item && hikeId) {
      fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/hike/${hikeId}`)
        .then((res) => res.json())
        .then((data) => {
          setLocation(data);
        })
        .catch(console.log);
    } else if (item) {
      setHike(item);
    }
  }, [hikeId, item]);

  const clearForm = () => {};

  const handleName = (v: string, e: any) => setName(parseInt(v));
  const handleLocation = (v: string, e: any) => setLocation(parseInt(v));
  const handleDescription = (v: string, e: any) => setDescription(v);
  const handleDate = (v: string, e: any) => setHikeDate(v);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //Quick Validation:
    if (!name || description === "" || !location) {
      setMsg(
        "You need to set all required fields[name, description, location]"
      );
      return;
    }

    //build a data post
    // const opts = {
    //   name,
    //   location,
    //   description,
    //   hikeDate,
    // };
    const data = new FormData();
    data.append("locationId", location.toString());
    data.append("userId", name.toString());
    data.append("hikeDate", hikeDate);
    data.append("description", description);

    const url = `${process.env.REACT_APP_API_SERVER}/fnapi/?/hike`;
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
          Add Hike
        </Button>
      )}
      {edit && (
        <EditIcon
          onClick={handleModalToggle}
          key={`edit-schema-${hikeId}`}
        ></EditIcon>
      )}
      <Modal
        variant={ModalVariant.small}
        title={hikeId ? "Edit Location" : "Add Hike"}
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
          <FormGroup label="Name" isRequired fieldId="name-field">
            <UserSelect userValue={name} onChange={handleName} />
          </FormGroup>
          <FormGroup label="Location" isRequired fieldId="name-field">
            <LocationSelect
              locationValue={location}
              onChange={handleLocation}
            />
          </FormGroup>
          <FormGroup label="Description" isRequired fieldId="desc-field">
            <div className="flex-display">
              <TextInput
                value={hike?.description}
                isRequired
                type="text"
                id="desc-field"
                aria-describedby="desc-field"
                name="desc-field"
                onChange={handleDescription}
              />
            </div>
          </FormGroup>

          <FormGroup label="HikeDate" isRequired fieldId="status-field">
            <TextInput
              value={hike?.hikeDate}
              isRequired
              type="date"
              id="status-field"
              aria-describedby="status-field"
              name="status-field"
              onChange={handleDate}
            />
          </FormGroup>
        </Form>
      </Modal>{" "}
    </div>
  );
};
export type AddHikeFormProps = {
  item?: HikeEntry;
  hikeId?: number;
  statusMsg?: Function;
  edit?: boolean;
};
