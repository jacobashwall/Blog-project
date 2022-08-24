import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const axios = require("axios")

function BlogPage() {
  let { username } = useParams();
  const [imageName, setImageName] = useState("Image Name")
  const [imageNameColor, setImageNameColor] = useState("grey")
  const [file, setFile] = useState(null)
  const [imageDescription, setImageDescription] = useState("Image Description")
  const [imageDescriptionColor, setImageDescriptionColor] = useState("grey")
  const [images, setImages] = useState([])
  const url = SERVER_URL;

  const getImages = () => {
    axios.get(`${url}/images`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  const onFileChange = event => { 
    // Update the state 
    setFile( event.target.files[0]); 
  }; 

  // On file upload (click the upload button) 
 const  onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "name",imageName
    ); 
    formData.append( 
      "image",file
    ); 
   
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
            <input type="file" onChange={onFileChange} /> 
          </div>
          <div>
            <label>Image Description</label>
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
      <h1>Uploaded Images</h1>
      {
        images.map((image) => {
          const base64String = btoa(new Uint8Array(image.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''));

          return <img key={image._id} src={`data:image/png;base64,${base64String}`} width='50%' />
        })
      }
    </div>

  )
}

export default BlogPage