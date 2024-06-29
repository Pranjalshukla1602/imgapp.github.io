import React, { useState, useEffect, useRef } from "react";
import "./InputMemoryForm.css";
import ImageUpload from "./ImageUpload";
import { storage, firestore } from "../../firebase_conf";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons";
import { MdLocationOn } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from 'react-google-autocomplete';

function InputMemoryForm() {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    Title: "",
    Location: "",
    Date: "",
    Caption: "",
    image: null,
  });


  const [image, setImage] = useState();
  function HandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFromData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  // function to show image uploaded successfully
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const CancelForm = () => {
    // 👇️ navigate programmatically
    navigate("/");
  };

  // function to store image and all form data
  function NoteUpload(e) {
    e.preventDefault();

    console.log("start of Image upload");
    console.log(image);
    // async magic goes here...
    if (image.name === null) {
      console.error(`not an image, the image file is a ${typeof image.name}`);
    }
    //Uploading image into storage.
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress;
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      //started upload data process to firestorage
      async () => {
        const imagefile = ref(storage, `/images/${image.name}`); //  fetch the imageUrl from firebase storage.
        getDownloadURL(imagefile).then((imageUrl) => {
          setDoc(doc(firestore, "NotesData", formData.Title), // function to store all data into firebase firestore by assigning the document name with respect to memories title.
          {
            Title: formData.Title,
            Location: formData.Location,
            Date: formData.Date,
            Caption: formData.Caption,
            image: imageUrl,
          });
          toast.success("Successfully Uploaded !", //Receive successfully uploaded message
          {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Setting setDoc");
        });

        // set the data again
        setFromData({
          Title: "",
          Location: "",
          Date: "",
          Caption: "",
          image: null,
        });
        setImage(null);
      }
    );
  }
  return (
    <div className="user-note-collection-main">
      <div className="input-form-container" id="container">
        <div className="image-container">
          <div className="div-image">
            <div className="image-panel image-left">
              <ImageUpload image={image} setImage={setImage} />
              <ToastContainer />
            </div>
          </div>
        </div>

        <div className="form-container collection-container">
          <form className="formAction">
            <input className="inputCard"
              type="text"
              onChange={HandleChange}
              placeholder="Title"
              name="Title"
              maxLength={30}
              value={formData.Title}
            ></input>
            <br></br>
            
            <Autocomplete className="inputCard"
              onPlaceSelected={(place) => {
                console.log(place.formatted_address); // Location suggestion will appear automatically
                setFromData((prev) => {
                  return { ...prev, ["Location"]: place.formatted_address };
                });
              }}
              types={['(cities)']}
              componentRestrictions={{country: "us"}}
            />
            <br></br>
            <input className="inputCard"
              type="date"
              onChange={HandleChange}
              placeholder="date"
              name="Date"
              value={formData.Date}
            ></input>
            <br></br>
            <textarea
              type="textarea"
              onChange={HandleChange}
              placeholder="Caption"
              name="Caption"
              value={formData.Caption}
              maxLength = {150}
            ></textarea>
            <br></br>

            <button
              type="submit"
              style={{ marginTop: "10px" }}
              onClick={NoteUpload}
            >
              {" "}
              Submit
            </button>
            <button style={{ marginTop: "10px" }} onClick={CancelForm}>
              {" "}
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputMemoryForm;
