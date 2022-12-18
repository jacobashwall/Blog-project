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
        if (givenTagTitle[givenTagTitle.length - 1] != " ") {
            setTags(current =>
                current.map((obj, key) => {
                    if (key === givenKey) {
                        return givenTagTitle;
                    }

                    return obj;
                }),
            );
        }
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
        <div >
            {
                tags.map((tag, key) => {
                    if (key != 0)
                        return (
                            <div key={key} style={{ display: "inline-block" }} >
                                <TextField variant="filled" size="small" label="Tag"
                                    inputProps={{ maxLength: 12 }}
                                    onChange={e => { updateTagTitle(key, e.target.value.toUpperCase()); }}
                                    value={tag}>
                                </TextField>
                                <Fab color="secondary" onClick={() => { removeTag(key) }}><ClearIcon /></Fab>
                            </div>
                        )
                })
            }
            <Fab onClick={addTag}><AddIcon /></Fab>
        </div>
    )
}

export default Tags