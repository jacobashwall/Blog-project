import React, { useState, useEffect, useRef } from 'react'
const axios = require("axios")
import { TextField, FormControl, InputLabel, MenuItem, Select, Fab, Card, CardContent, CardHeader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ViewImage from './ViewImage';
import {motion} from 'framer-motion'

function BlogBody(props) {
    const [blogBody, setBlogBody] = useState(props.blogBody);
    const [images, setImages] = useState([])

    const url = SERVER_URL;
    const father =useRef()

    //since react setState uses queues and doesnt update instantly,we are forced to use useEffect, so the component would render anytime the state changes
    useEffect(() => {
        updateBlogBody()
    }, [blogBody])

    useEffect(() => {
        getImages();
    }, [props.upload])

    const getImages = () => {
        console.log(props.author)
        axios.post(`${url}/get-images-by-user`, { username: props.author })
            .then((response) => {
                setImages(response.data);
                console.log(images)
            })
            .catch((error) => {
                console.error(`ERROR: ${error}`);
            });
    }

    const addSection = () => {
        setBlogBody(current => [...current,
        {
            title: "",
            imageId: "",
            description: "",
            text: ""
        }]);
    };

    const updateSectionTitle = (givenKey, givenTitle) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, title: givenTitle };
                }

                return obj;
            }),
        );
    };

    const updateSectionImageId = (givenKey, givenId) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, imageId: givenId };
                }

                return obj;
            }),
        );
    };

    const updateSectionDescription = (givenKey, givenDescription) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, description: givenDescription };
                }

                return obj;
            }),
        );
    };

    const updateSectionText = (givenKey, givenText) => {
        setBlogBody(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return { ...obj, text: givenText };
                }

                return obj;
            }),
        );
    };


    const removeSection = (givenKey) => {
        setBlogBody(current =>
            current.filter((obj, key) => {
                return key !== givenKey;
            }),
        );
    };

    function updateBlogBody() {
        props.updateBlog(curr => ({ ...curr, body: blogBody }))
    }

    return (
        <div ref={father}>
            {
                blogBody.map((section, key) => {
                    return (
                        <Card key={key} component={motion.div} drag={props.drag} dragConstraints={father}>
                            <CardHeader
                            action={<Fab color="secondary" onClick={() => { removeSection(key) }} disabled={blogBody.length == 1} size="small"><ClearIcon /></Fab>}
                            title={ <TextField variant="standard" margin="normal" fullWidth label="Title"
                                onChange={e => { updateSectionTitle(key, e.target.value); }}
                                value={section.title}>
                            </TextField>}/>
                           <CardContent>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-filled-label">Image</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={section.imageId}
                                    onChange={e => { updateSectionImageId(key, e.target.value) }}>
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
                            </FormControl>
                            <br></br>
                            <ViewImage imageId={section.imageId} sectionKey={key} />
                            <br></br>
                            <TextField multiline maxRows={Infinity} variant="filled" size="small" label="Image Description"
                                onChange={e => { updateSectionDescription(key, e.target.value); }}
                                value={section.description}
                                minRows={3}>
                            </TextField>
                            <br></br>
                            <TextField multiline maxRows={Infinity} variant="outlined" margin="normal" fullWidth label="Text"
                                onChange={e => { updateSectionText(key, e.target.value); }}
                                value={section.text}
                                minRows={10}>
                            </TextField>
                            </CardContent>
                        </Card>
                    )
                })
            }
            <Fab onClick={addSection}><AddIcon /></Fab>
            <br></br>
        </div>
    )
}

export default BlogBody
