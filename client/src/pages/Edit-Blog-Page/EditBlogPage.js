import React, { useState, useEffect, useRef,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BlogBody from './BlogBody';
import Tags from './Tags';
const axios = require("axios")
import {  Grid, TextField, Skeleton, Paper, Tooltip, Fab } from '@mui/material';
import ToolsAccordion from './ToolsAccordion';
import PanToolIcon from '@mui/icons-material/PanTool';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import UploadImageWidget from './UploadImageWidget';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SaveBlogWidget from './SaveBlogWidget';
import { UsernameContext } from '../../UsernameConetxt';
function EditBlogPage() {
    let { blogId } = useParams();
    const { username, setUsername } = useContext(UsernameContext)
    let navigate = useNavigate();
    const [blog, setBlog] = useState();
    const [drag, setDrag] = useState(false)
    const [add, setAdd] = useState(false)
    const [workspace, setWorkspace] = useState([]);
    const [upload, setUploaded] = useState(true)
    const window = useRef()
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
                    <ToolsAccordion updateBlog={updateBlog} drag={false} setUploaded={setUploaded} updateWorkspace={setWorkspace} add={add}  upload={upload}  />
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
                        <Skeleton variant="rectangular" height={48} />
                        <br></br>
                        <Skeleton variant="rectangular" height={56} />
                        <br></br>
                        <Skeleton variant="rectangular" height={600} />
                    </Grid>

            }

            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} ref={window} >
                <Paper elevation={12} sx={{ height: "100%" }}>
                    <Tooltip title="Add">
                        <Fab onClick={() => {setAdd(!add);setDrag(false)}}>
                            {add ?
                                <ClearIcon /> :
                                <AddIcon />
                            }
                        </Fab>
                    </Tooltip>
                    <Tooltip title="Drag">
                        <Fab onClick={() => {setDrag(!drag);setAdd(false)}}>
                            {drag ?
                                <DoNotTouchIcon /> :
                                <PanToolIcon />
                            }
                        </Fab>
                    </Tooltip>
                    {workspace.map((widget, key) => {
                        if (widget.name == "Upload Image")
                            return (<UploadImageWidget drag={drag}  key={key} updateWorkspace={setWorkspace} updateUpload={setUploaded} upload={upload} window={window} add={add} />)
                        if (widget.name == "Save Blog")
                            return (<SaveBlogWidget drag={drag} key={key} updateWorkspace={setWorkspace} updateBlog={setBlog}  window={window} add={add} />)
                    })}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default EditBlogPage