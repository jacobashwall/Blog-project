import React, { useEffect, useState, useContext } from 'react';
const axios = require("axios")
import { TextField, Button, CircularProgress, Typography, Select, MenuItem, Card, CardActions, CardHeader, CardContent, ImageList, ImageListItem, ImageListItemBar, Skeleton, Grid } from '@mui/material'
import { UsernameContext } from '../../UsernameConetxt';
import ViewImage from './ViewImage';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Container } from '@mui/system';
function ImagesPage() {
  const [title, setTitle] = useState("")
  const [description, setDesciption] = useState("")
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [findImageId, setfindImageId] = useState("")
  const [images, setImages] = useState(null)
  const { username, setUsername } = useContext(UsernameContext)
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
    formData.append("uploader", username);
    // Details of the uploaded file 
    console.log(file);

    // Request made to the backend api 
    // Send formData object 
    axios.post(`${url}/upload`, formData).then((response) => { props.updateUpload(!props.upload); setIsUploading(false); handleClose(); });
  };


  useEffect(() => {
    getImages();
  }, [])

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item >
          <Skeleton sx={{height:"500px",width:"260px"}}></Skeleton>
        </Grid>
        <Grid item>
          <Skeleton  sx={{height:"500px",width:"260px"}}></Skeleton>
        </Grid>
        <Grid item>
          <Skeleton  sx={{height:"500px",width:"260px"}}></Skeleton>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
        <Typography>Upload Image</Typography>
        <br></br>
          <TextField variant="standard" margin="normal" label="Title"
            onChange={e => { setTitle(e.target.value); }}
            value={title}>
          </TextField>
          <br></br>
          <input style={{ backgroundColor: 'gray' }} type="file" onChange={onFileChange} />
          <br></br>
          <TextField variant="standard" margin="normal" label="Description"
            onChange={e => { setDesciption(e.target.value); }}
            value={description}>
          </TextField>
        </CardContent>
    
          <Button variant='contained' onClick={onFileUpload}>
            {
              isUploading ?
                <CircularProgress />
                :
                "Upload!"
            }
          </Button>
      
      </Card>

      <Card>
        <CardContent>
        <Typography>Find Image</Typography>
        <br></br>
          <Select
            value={findImageId}
            onChange={e => { setfindImageId(e.target.value) }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              images ?
                images.map((image, key) => {
                  return (
                    <MenuItem key={key + 1} value={image._id}>{image.name}</MenuItem>
                  )
                })
                :
                <MenuItem value="">
                  <em>No image is available!</em>
                </MenuItem>
            }
          </Select>
          <ViewImage imageId={findImageId} num={"find"} />
        </CardContent>
      </Card>

      {
        images ?
          <ImageList variant="masonry" cols={3} gap={8}>
            {
              images.map((image, key) => {
                return (
                  <ImageListItem key={image._id} >
                    <ViewImage key={key} imageId={image._id} num={key} />
                    <ImageListItemBar
                      title={image.name}
                      subtitle={image.desc}
                    />
                  </ImageListItem>
                )
              })
            }
          </ImageList>
          :
          <Grid container >
            <Grid container item spacing={1} justifyContent="space-between">
              <FormRow />
            </Grid>
            <Grid container item spacing={1} justifyContent="space-between">
              <FormRow />
            </Grid>
            <Grid container item spacing={1} justifyContent="space-between">
              <FormRow />
            </Grid>
          </Grid>
      }
    </Container>
  )
}



export default ImagesPage