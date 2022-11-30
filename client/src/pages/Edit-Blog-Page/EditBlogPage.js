import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBody from './BlogBody';
import Tags from './Tags';
const axios = require("axios")
import SaveIcon from '@mui/icons-material/Save';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import { Button, CircularProgress, FormControl, Grid, TextField, Skeleton, AppBar, Paper, Tooltip, Fab } from '@mui/material';
import { Container } from '@mui/system';
import ToolsAccordion from './ToolsAccordion';
import PanToolIcon from '@mui/icons-material/PanTool';
import { motion, useDragControls } from "framer-motion"
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import UploadImageWidget from './UploadImageWidget';

function EditBlogPage() {
    let { username, blogId } = useParams();
    let navigate = useNavigate();
    const [blog, setBlog] = useState();
    const [drag, setDrag] = useState(false)
    const [workspace, setWorkspace] = useState([]);
    const[upload,setUploaded]=useState(true)


    const url = SERVER_URL;
    useEffect(() => {
        getBlogById();
    }, [])

    const getBlogById = () => {
        axios.post(`${url}/get-blog-by-id`, { id: blogId })
            .then((response) => {
                setBlog(response.data)
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }
    const updateBlog = () => {
        console.log(blog);
        axios.post(`${url}/edit-blog-by-id`, { id: blogId, updatedBlog: blog })
            .then((response) => {
                console.log(response)
                let url = `../${username}/${blogId}/View`
                navigate(url)
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }

    //dont use setBlog({ header: givenHeader }) since you wont set the blog with it curen tvalue. makes other fields to be undefined for some time and mess with mui controlled text fields
    const updateHeader = (givenHeader) => {
        setBlog(curr => ({ ...curr, header: givenHeader }))
    }

    const updateSubheader = (givenSubheader) => {
        setBlog(curr => ({ ...curr, subheader: givenSubheader }))
    }

    return (
        <Grid container columnSpacing={4} direction='row' justifyContent="center" alignItems="stretch" sx={{ paddingTop: "0" }}>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} >
                <Paper elevation={20} sx={{ height: "100%" }}>
                    <ToolsAccordion updateBlog={updateBlog} username={username} drag={drag} updateWorkspace={setWorkspace} />
                </Paper>
            </Grid>
            {
                blog ?

                    <Grid sx={{ overflow: 'auto', maxHeight: "80vh", display: 'block' }} container item spacing={1} direction="column" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField variant="standard" label="Header" margin='dense'
                            onChange={e => { updateHeader(e.target.value); }}
                            value={blog.header}>
                        </TextField>
                        <br></br>
                        <TextField variant="outlined" label="Subheader" fullWidth margin='dense'
                            onChange={e => { updateSubheader(e.target.value); }}
                            value={blog.subheader}>
                        </TextField>
                        <Tags tags={blog.tags} updateBlog={setBlog} />
                        <BlogBody blogBody={blog.body} updateBlog={setBlog} author={blog.author} drag={drag} upload={upload} />
                    </Grid>
                    :
                    <Grid container item spacing={1} direction="column" xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Skeleton variant="rectangular"  height={48} />
                        <br></br>
                        <Skeleton variant="rectangular"  height={56} />
                        <br></br>
                        <Skeleton variant="rectangular"  height={600} />
                    </Grid>

            }

            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}  >
                <Paper elevation={12} sx={{ height: "100%" }}>
                    <Tooltip title="Drag">
                        <Fab onClick={() => setDrag(!drag)}>
                            {drag ?
                                <DoNotTouchIcon /> :
                                <PanToolIcon />
                            }
                        </Fab>
                    </Tooltip>
                    {workspace.map((widget,key) => {
                        if (widget.name == "Upload Image")
                            return (<UploadImageWidget drag={drag} username={username} key={key} updateUpload={setUploaded} upload={upload}/>)
                    })}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default EditBlogPage