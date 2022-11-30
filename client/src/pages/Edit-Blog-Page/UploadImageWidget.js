import React, { useState, useEffect } from 'react'
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { Tooltip, Fab, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Button, CircularProgress } from '@mui/material';
import { motion } from "framer-motion"
const axios = require("axios")
const url = SERVER_URL;


function UploadImageWidget(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDesciption] = useState("")
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const onFileChange = event => {
    // Update the state 
    setFile(event.target.files[0]);
  };

  // On file upload (click the upload button) 
  const onFileUpload = () => {
    setIsUploading(true)
    // Create an object of formData 
    const formData = new FormData();

    // Update the formData object 
    formData.append("name", title);
    formData.append("image", file);
    formData.append("description", description);
    formData.append("uploader", props.username);
    // Details of the uploaded file 
    console.log(file);

    // Request made to the backend api 
    // Send formData object 
    axios.post(`${url}/upload`, formData).then((response) => { props.updateUpload(!props.upload); setIsUploading(false); handleClose(); });
  };


  return (
    <div>
      <Tooltip title="Uplaod Image" component={motion.div} drag={props.drag} >
        <Fab onClick={() => { if (!props.drag) { handleClickOpen() } }}>
          <AddPhotoAlternateTwoToneIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <TextField variant="standard" margin="normal" fullWidth label="Title"
            onChange={e => { setTitle(e.target.value); }}
            value={title}>
          </TextField>
          <DialogContentText>Upload Image</DialogContentText>
          <input style={{ backgroundColor: 'gray' }} type="file" onChange={onFileChange} />
          <TextField variant="standard" margin="normal" fullWidth label="Description"
            onChange={e => { setDesciption(e.target.value); }}
            value={description}>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onFileUpload}>
            {
              isUploading ?
                <CircularProgress />
                :
                "Upload!"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

export default UploadImageWidget

