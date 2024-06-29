import React from "react";
import { useState } from "react";
import { Modal, Header, Image, Button } from "semantic-ui-react";
import "./ViewCard.css";
import Autocomplete from "react-google-autocomplete";
import { firestore } from "../../firebase_conf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
  setDoc,
  deleteDoc
} from "firebase/firestore";

const ViewCard = ({
  image,
  Title,
  Location,
  Date,
  Caption,
  setOpen,
  open,
  id,
  handleDelete,
  handleUpdate,
}) => {
  const [updateFormData, setUpdateFormData] = useState({
    Title: Title,
    Location: Location,
    Date: Date,
    Caption: Caption,
  });
  const [updateOpen, setUpdateOpen] = useState(false);
  console.log(updateFormData);
  const handleUpdateInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  
  return (
    // View modal will open with details.
    <Modal
      style={{
        height: "480px",
        marginTop: "10%",
        marginLeft: "20%",
        marginRight: "20%",
      }}
      size={"small"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>View</Button>}
    >
      <Modal.Header> {Title}</Modal.Header>
      <Modal.Content image>
        <Image
          src={image}
          size="large"
          style={{
            borderRadius: "0",
            backgroundColor: "white",
            zIndex: "1px",
          }}
          wrapped
        />
        <Modal.Description>
          <Header>
            <h3>Title : {Title} </h3>
          </Header>
          <Header>
            <p>Location : {Location}</p>
            <p>Date: {Date}</p>
            <p>Caption : {Caption}</p>
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => setUpdateOpen(true)}
          floated="left"
          content="Update"
        >
          Update
        </Button>

        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          color="red"
          content="Delete"
          labelPosition="right"
          icon="checkmark"
          onClick={() => handleDelete(id, Title)}
        >
          {" "}
          Delete
        </Button>
      </Modal.Actions>

      <Modal
        onClose={() => setUpdateOpen(false)}
        open={updateOpen}
        size="mini"
        style={{
          height: "430px",
          marginTop: "10%",
          marginLeft: "30%",
          marginRight: "70%",
          floated:"center"
        }}
      >

        
        <Modal.Header>Update</Modal.Header>
        <Modal.Content className="updateModal"> 
          <input 
            className="updateinput"
            name="Title"
            type="text"
            value={updateFormData.Title}
            onChange={handleUpdateInput}
            placeholder="Title"
            maxLength={30}
          ></input>
          <br></br>
          <Autocomplete
            className="updateinput"
            defaultValue={updateFormData.Location}
            onPlaceSelected={(place) => {
              console.log(place.formatted_address); // Location suggestion will appear automatically
              setUpdateFormData((prev) => {
                return { ...prev, ["Location"]: place.formatted_address };
              });
            }}
            types={["(cities)"]}
            componentRestrictions={{ country: "us" }}
          />
          <br></br>
          <input
            className="updateinput"
            type="Date"
            value={updateFormData.Date}
            onChange={handleUpdateInput}
            placeholder="Date"
            name="Date"
            maxLength={30}
          ></input>
          <br></br>
          <input
            className="updateinput"
            type="textarea"
            value={updateFormData.Caption}
            onChange={handleUpdateInput}
            placeholder="Caption"
            name="Caption"
            maxLength={150}
          ></input>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            icon="check"
            content="Update"
            floated="left"
            onClick={() => handleUpdate(id,updateFormData, image, Title)}
          />
        </Modal.Actions>
      </Modal>
    </Modal>
  );
};

export default ViewCard;
