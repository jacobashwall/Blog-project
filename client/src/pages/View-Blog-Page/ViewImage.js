import React, { useEffect, useState } from 'react';
const axios = require("axios")

function ViewImage(props) {
    const url = SERVER_URL;
    const getImagesById = () => {
        axios.post(`${url}/get-images-by-id`, { id: props.imageId })
          .then((response) => {
            if (response.data) {
              const base64String = btoa(new Uint8Array(response.data.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));
              const imageTag = document.querySelector(".image-tag"+props.sectionKey);
              imageTag.setAttribute("src", `data:image/png;base64,${base64String}`);
            }
          })
          .catch((error) => {
            console.error(`ERROR: ${error}`);
          });
      }
      
      useEffect(() => {
        getImagesById();
      }, [])
  return (
    <img className={'image-tag'+props.sectionKey} src={null} width='10%' />
  )
}

export default ViewImage