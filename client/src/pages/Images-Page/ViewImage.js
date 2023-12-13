import { CardMedia } from '@mui/material';
import React, { useEffect } from 'react';
const axios = require("axios")

function ViewImage(props) {
    const url = SERVER_URL;
    const getImagesById = () => {
        axios.post(`${url}/get-images-by-id`, { id: props.imageId })
          .then((response) => {
            const imageTag = document.querySelector(".image-tag"+props.num);
            if (response.data) {
              const base64String = btoa(new Uint8Array(response.data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));
              imageTag.setAttribute("src", `data:image/png;base64,${base64String}`);
              imageTag.setAttribute('style', 'display:inline')
            }
            else{
              imageTag.setAttribute("src",null)
              imageTag.setAttribute('style', 'display:none')
            }
          })
          .catch((error) => {
            console.error(`ERROR: ${error}`);
          });
      }
      
      useEffect(() => {
        getImagesById();
      }, [props])

  return (
    <CardMedia sx = {{padding: "1em 1em 0 1em" , objectFit: "contain" }} component="img" className={'image-tag'+props.num} src={null} key={props.num} />
  )
}

export default ViewImage