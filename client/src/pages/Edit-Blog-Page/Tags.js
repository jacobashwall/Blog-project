import React, { useState, useEffect } from 'react'
import { Fab, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

function Tags(props) {
    const [tags, setTags] = useState(props.tags);

    const addTag = () => {
        setTags(current => [...current, ""]);
    };

    const updateTagTitle = (givenKey, givenTagTitle) => {
        setTags(current =>
            current.map((obj, key) => {
                if (key === givenKey) {
                    return givenTagTitle;
                }

                return obj;
            }),
        );
    };

    //since react setSatte uses queues and doesnt update instantly,we are forced to use useEffect, so the component would render anytime the state changes
    useEffect(() => {
        updateTags()
    }, [tags])

    const removeTag = (tagKey) => {
        setTags(current =>
            current.filter((obj, key) => {
                return key !== tagKey;
            }),
        );
    };

    function updateTags() {
        props.updateBlog(curr => ({ ...curr, tags: tags.filter((tag) => { return tag != "" }) }))
    }

    return (
        <div>
            {
                tags.map((tag, key) => {
                    return (
                        <div key={key}>
                            <TextField variant="filled" size="small" label="Tag"
                                onChange={e => { updateTagTitle(key, e.target.value); }}
                                value={tag}
                                disabled={key == 0}>
                            </TextField>
                            <Fab color="secondary" onClick={() => { removeTag(key) }} disabled={key == 0}><ClearIcon /></Fab>
                        </div>
                    )
                })
            }
            <Fab onClick={addTag}><AddIcon /></Fab>
        </div>
    )
}

export default Tags