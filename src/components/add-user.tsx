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
import { UserEntry } from "../locations";

export const AddUserForm: React.FC<AddLocationFormProps> = (props) => {
  const [user, setUser] = React.useState<UserEntry>();

  const [msg, setMsg] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { userId, edit = false, statusMsg, item = null } = props;

  React.useEffect(() => {
    if (!item && userId) {
      fetch(`${process.env.REACT_APP_API_SERVER}/fnapi/?/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch(console.log);
    } else if (item) {
      setUser(item);
    }
  }, [userId, item]);

  const clearForm = () => {};

  const handleFullname = (v: string, e: any) => setFullname(v);
  const handleUsername = (v: string, e: any) => setUsername(v);
  const handleEmail = (v: string, e: any) => setEmail(v);
  const handleStatus = (v: string, e: any) => setStatus(v);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //Quick Validation:
    if (fullname === "" || username === "" || email === "") {
      setMsg("You need to set all required fields[name, user, email]");
      return;
    }

    const data = new FormData();
    data.append("userId", userId ? userId.toString() : "");
    data.append("fullname", fullname);
    data.append("username", username);
    data.append("email", email);
    data.append("status", status);

    const url = `${process.env.REACT_APP_API_SERVER}/fnapi/?/user`;
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
          Add User
        </Button>
      )}
      {edit && (
        <EditIcon
          onClick={handleModalToggle}
          key={`edit-user-${userId}`}
        ></EditIcon>
      )}
      <Modal
        variant={ModalVariant.small}
        title={userId ? "Edit User" : "Add User"}
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
          <FormGroup label="Fullname" isRequired fieldId="name-field">
            <TextInput
              value={user?.fullname}
              isRequired
              type="text"
              id="name-field"
              aria-describedby="name-field"
              name="name-field"
              onChange={handleFullname}
            />
          </FormGroup>
          <FormGroup label="Username" isRequired fieldId="username-field">
            <TextInput
              value={user?.username}
              isRequired
              type="text"
              id="username-field"
              aria-describedby="username-field"
              name="username-field"
              onChange={handleUsername}
            />
          </FormGroup>
          <FormGroup label="Email" isRequired fieldId="email-field">
            <div className="flex-display">
              <TextInput
                value={user?.email}
                isRequired
                type="text"
                id="email-field"
                aria-describedby="email-field"
                name="email-field"
                onChange={handleEmail}
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
  item?: UserEntry;
  userId?: number;
  statusMsg?: Function;
  edit?: boolean;
};
