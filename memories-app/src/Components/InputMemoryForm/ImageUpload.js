import React, { useState, useEffect, useRef } from "react";
import "./ImageUpload.css";
import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

const ImageUpload = ({ image, setImage }) => {
  const imageFileRef = useRef();
  const [imagePreview, setimagePreview] = useState();

  useEffect(() => {
    if (!image) {
      setimagePreview(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setimagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

    // function for selecting updated image file
  function selectedImageHandler(event) {
    let selectedImage;
    if (event.target.files && event.target.files.length === 1) {
      selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  }
  // function for image file selection 
  function imageSelectHandler(event) {
    imageFileRef.current.click();
    let selectedImage;
    if (event.target.files && event.target.files.length === 1) {
      selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  }

  return (
    // Image container
    <div className="user-note-collection-main cent">
      <input
        ref={imageFileRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg" // Only can upload '.jpg, .png, .jpeg' 
        onChange={selectedImageHandler}
      />
      
      <div className={`image-upload ${"center"}`}>
        <div className="image-upload__preview">
          <div>{imagePreview && <img src={imagePreview} alt="preview" />}</div>
          {!imagePreview && (
            <div className="center">
              <div>
                <h4 className="head"> Add Photo </h4>
                <IoMdPhotos
                  className="icon2"
                  onClick={imageSelectHandler}
                ></IoMdPhotos>
              </div>
            </div>
          )}
        </div>
        <div>
          {imagePreview && (
            <div className="center">
              <MdModeEdit
                className="iconEdit"
                onClick={imageSelectHandler}
              ></MdModeEdit>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
