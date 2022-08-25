import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const axios = require("axios")

function BlogPage() {
  let { username } = useParams();
  const [imageName, setImageName] = useState("Image Name")
  const [imageNameColor, setImageNameColor] = useState("grey")
  const [imageId, setImageId] = useState("Image ID")
  const [imageIdColor, setImageIdColor] = useState("grey")
  const [file, setFile] = useState(null)
  const [imageDescription, setImageDescription] = useState("Image Description")
  const [imageDescriptionColor, setImageDescriptionColor] = useState("grey")
  const [images, setImages] = useState([])
  const url = SERVER_URL;

  const getImages = () => {
    axios.post(`${url}/get-images-by-user`, { username: username })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  const getImagesById = () => {
    axios.post(`${url}/get-images-by-id`, { id: imageId })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          console.log("problem")
          const base64String = btoa(new Uint8Array(response.data.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));
          const imageTag = document.querySelector(".image-tag");
          imageTag.setAttribute("src", `data:image/png;base64,${base64String}`);
        }
        else {
          setImageId("No image matches!")
          setImageIdColor("firebrick")
          const imageTag = document.querySelector(".image-tag");
          imageTag.setAttribute("src", null);
        }
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  const onFileChange = event => {
    // Update the state 
    setFile(event.target.files[0]);
  };

  // On file upload (click the upload button) 
  const onFileUpload = () => {
    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append("name", imageName);
    formData.append("image", file);
    formData.append("description", imageDescription);
    formData.append("uploader", username);
    // Details of the uploaded file 
    console.log(file);

    // Request made to the backend api 
    // Send formData object 
    axios.post(`${url}/upload`, formData);
  };

  useEffect(() => {
    getImages();
  }, [])

  return (
    <div>
      <h1>Images of {username}</h1>
      <div>
        <div >
          <div>
            <label>Image Title</label>
            <br></br>
            <input
              onChange={e => { setImageName(e.target.value); setImageNameColor('white') }}
              value={imageName}
              onFocus={e => { if (imageName === "Image Name") setImageName("") }}
              onBlur={e => { if (e.target.value === "") { setImageName("Image Name"); setImageNameColor('grey') } }}
              style={{ color: imageNameColor }}>
            </input>
          </div>

          <div>
            <label>Upload Image</label>
            <br></br>
            <input type="file" onChange={onFileChange} />
          </div>

          <div>
            <label>Image Description</label>
            <br></br>
            <textarea
              onChange={e => { setImageDescription(e.target.value); setImageDescriptionColor('white') }}
              value={imageDescription}
              onFocus={e => { if (imageDescription === "Image Description") setImageDescription("") }}
              onBlur={e => { if (e.target.value === "") { setImageDescription("Image Description"); setImageDescriptionColor('grey') } }}
              style={{ color: imageDescriptionColor, background: "transparent" }}>
            </textarea>
          </div>
          <div>
            <button onClick={onFileUpload}>
              Upload!
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1>find image by id</h1>
        <input
          onChange={e => { setImageId(e.target.value); setImageIdColor('white') }}
          value={imageId}
          onFocus={e => { if (imageId === "Image ID" || imageId === "No image matches!") setImageId("") }}
          onBlur={e => { if (e.target.value === "") { setImageId("Image ID"); setImageIdColor('grey') } }}
          style={{ color: imageIdColor }}>
        </input>
        <br></br>
        <img className='image-tag' src={null} width='10%' />
        <br></br>
        <button onClick={getImagesById}>get image</button>
      </div>

      <h1>Uploaded Images</h1>
      {
        images.map((image) => {
          const base64String = btoa(new Uint8Array(image.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));

          return (
            <li key={image._id}>
              <label>Title: {image.name}</label>
              <br></br>
              <label>Uploaded by: {image.uploader}</label>
              <br></br>
              <img src={`data:image/png;base64,${base64String}`} width='10%' />
              <br></br>
              <label>Description: {image.desc}</label>
              <br></br>
              <label>Image ID: {image._id}</label>
            </li>
          )
        })
      }
    </div>

  )
}

export default BlogPage